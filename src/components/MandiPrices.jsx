import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { 
  TrendingUp, MapPin, CloudSun, ArrowUpRight, ArrowDownRight, 
  Search, ShieldCheck, Navigation, Bell, Database, Wifi, WifiOff,
  Filter, ChevronRight, ChevronLeft, RefreshCw, AlertTriangle, 
  Layers, ArrowUpDown, Compass, CheckCircle2, Sparkles, ExternalLink,
  X, Copy, Check, Share2
} from 'lucide-react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { 
  INDIAN_STATES_AND_UTS, 
  CROP_CATEGORIES, 
  IMD_WEATHER_ALERTS, 
  COMPREHENSIVE_MANDI_RECORDS,
  calculateHaversineDistance,
  saveMandiRecordsToIndexedDB,
  loadMandiRecordsFromIndexedDB
} from '../lib/allStatesMandiData';
import { fetchMandiPricesFromDB, recordFeatureUsageToDB } from '../lib/supabase';
import { useLanguage } from '../lib/LanguageContext';
import { reverseGeocodeCoords, getNearestAreaFromCoords, isCoordinateString } from '../lib/locationLanguageDetector';

const POPULAR_AGRI_STATES = [
  'All States & UTs',
  'Punjab',
  'Uttar Pradesh',
  'Madhya Pradesh',
  'Maharashtra',
  'Gujarat',
  'Haryana',
  'Rajasthan',
  'Telangana'
];

export default function MandiPrices() {
  const { t } = useLanguage();
  
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedState, setSelectedState] = useState('All States & UTs');
  const [selectedCategory, setSelectedCategory] = useState('All Crops');
  const [profitabilityFilter, setProfitabilityFilter] = useState('all'); // all, above_msp, high_margin, under_msp
  const [sortBy, setSortBy] = useState('highest_price'); // highest_price, gain_over_msp, distance, daily_change
  
  // Copy Mandi Rate state
  const [copiedMandiId, setCopiedMandiId] = useState(null);

  // Data State
  const [mandiRecords, setMandiRecords] = useState(COMPREHENSIVE_MANDI_RECORDS);
  const [isOfflineCached, setIsOfflineCached] = useState(false);
  const [dbConnected, setDbConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // User Geolocation State
  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');

  // Weather Advisory Carousel
  const [activeWeatherIdx, setActiveWeatherIdx] = useState(0);

  const hasActiveFilters = Boolean(
    searchTerm.trim() ||
    selectedState !== 'All States & UTs' ||
    selectedCategory !== 'All Crops' ||
    profitabilityFilter !== 'all' ||
    sortBy !== 'highest_price'
  );

  const handleResetFilters = () => {
    setSearchTerm('');
    setDebouncedSearch('');
    setSelectedState('All States & UTs');
    setSelectedCategory('All Crops');
    setProfitabilityFilter('all');
    setSortBy('highest_price');
  };

  const handleCopyMandiRate = (item) => {
    const text = `🌾 Mandi Rate Update - ${item.commodity} (${item.variety})
📍 APMC Market: ${item.market}, ${item.district}, ${item.state}
💰 Modal Price: ₹${item.modalPrice}/qtl
🏛️ Govt MSP: ₹${item.msp}/qtl (Spread: ${item.modalPrice >= item.msp ? '+' : ''}₹${item.modalPrice - item.msp})
📈 24h Trend: ${item.isUp ? '+' : ''}${item.dailyChangePct}%
Source: GrainWish AI / Agmarknet`;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    }
    setCopiedMandiId(item.id || `${item.commodity}-${item.market}`);
    setTimeout(() => setCopiedMandiId(null), 2500);
  };

  // Debounce search term by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Rotate weather alerts automatically every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWeatherIdx((prev) => (prev + 1) % IMD_WEATHER_ALERTS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Synchronize active weather alert when user filters by a specific state
  useEffect(() => {
    if (selectedState && selectedState !== 'All States & UTs') {
      const matchIdx = IMD_WEATHER_ALERTS.findIndex(
        (a) => a.state.toLowerCase() === selectedState.toLowerCase()
      );
      if (matchIdx !== -1) {
        setActiveWeatherIdx(matchIdx);
      }
    }
  }, [selectedState]);

  // Offline-first data loading: IndexedDB first, then network sync
  const loadData = useCallback(async () => {
    setIsSyncing(true);
    
    // 1. Try loading cached data from IndexedDB instantly
    try {
      const cached = await loadMandiRecordsFromIndexedDB();
      if (cached && cached.length > 0) {
        setMandiRecords(cached);
        setIsOfflineCached(true);
      }
    } catch {
      // Fallback to in-memory dataset
    }

    // 2. Fetch fresh DB records if online
    try {
      const dbPrices = await fetchMandiPricesFromDB();
      if (dbPrices && dbPrices.length > 0) {
        // Merge Supabase prices with complete 28-state records
        const merged = COMPREHENSIVE_MANDI_RECORDS.map((rec) => {
          const found = dbPrices.find(p => 
            p.state?.toLowerCase() === rec.state?.toLowerCase() &&
            p.district?.toLowerCase() === rec.district?.toLowerCase()
          );
          if (found && found.price) {
            const parsedPrice = parseInt(found.price.replace(/[^\d]/g, ''), 10) || rec.modalPrice;
            return {
              ...rec,
              modalPrice: parsedPrice,
              msp: found.msp ? (parseInt(found.msp.replace(/[^\d]/g, ''), 10) || rec.msp) : rec.msp,
              market: found.market || rec.market
            };
          }
          return rec;
        });

        setMandiRecords(merged);
        setDbConnected(true);
        setIsOfflineCached(false);
        await saveMandiRecordsToIndexedDB(merged);
      } else {
        // Cache default dataset to IndexedDB for offline use
        await saveMandiRecordsToIndexedDB(COMPREHENSIVE_MANDI_RECORDS);
      }
    } catch {
      setIsOfflineCached(true);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Geolocation Handler
  const [showGPSPromptModal, setShowGPSPromptModal] = useState(false);
  const [gpsConsentGranted, setGpsConsentGranted] = useState(false);

  const triggerDetectLocation = () => {
    if (gpsConsentGranted || userLocation) {
      handleDetectLocation();
    } else {
      setShowGPSPromptModal(true);
    }
  };

  const handleConfirmLocationConsent = () => {
    setGpsConsentGranted(true);
    setShowGPSPromptModal(false);
    handleDetectLocation();
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser');
      return;
    }
    setIsLocating(true);
    setLocationStatus('Pinpointing your GPS coordinates...');

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        setUserLocation(coords);
        setIsLocating(false);
        setSortBy('distance');
        const geocoded = await reverseGeocodeCoords(pos.coords.latitude, pos.coords.longitude);
        const areaName = geocoded?.area || getNearestAreaFromCoords(pos.coords.latitude, pos.coords.longitude) || 'Nearest Mandis';
        setLocationStatus(`GPS active: ${areaName}`);
        try {
          localStorage.setItem('grainwise_detected_location', JSON.stringify({
            coords: { latitude: pos.coords.latitude, longitude: pos.coords.longitude },
            source: 'gps',
            region: areaName
          }));
        } catch {}
      },
      () => {
        setIsLocating(false);
        setLocationStatus('Permission denied. Using default state distances');
      },
      { timeout: 8000 }
    );
  };

  // Read any pre-cached location on initial load
  useEffect(() => {
    try {
      const raw = localStorage.getItem('grainwise_detected_location');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.coords && parsed.coords.latitude && parsed.coords.longitude) {
          setUserLocation({ lat: parsed.coords.latitude, lon: parsed.coords.longitude });
          const areaName = (parsed.region && !isCoordinateString(parsed.region))
            ? parsed.region
            : getNearestAreaFromCoords(parsed.coords.latitude, parsed.coords.longitude) || 'Nearest Mandis';
          setLocationStatus(`GPS active: ${areaName}`);
        }
      }
    } catch {}
  }, []);

  // Record Mandi search & filter analytics
  useEffect(() => {
    if (debouncedSearch.trim() || selectedState !== 'All States & UTs' || selectedCategory !== 'All Crops') {
      const timer = setTimeout(() => {
        recordFeatureUsageToDB({
          featureName: 'Mandi Prices Radar',
          action: 'filter_mandi_28_states',
          metadata: { search: debouncedSearch, state: selectedState, category: selectedCategory, profitabilityFilter }
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [debouncedSearch, selectedState, selectedCategory, profitabilityFilter]);

  // Multi-layer filter and sort calculation
  const processedRecords = useMemo(() => {
    const searchLower = debouncedSearch.toLowerCase().trim();

    const filtered = mandiRecords.filter((item) => {
      // 1. Text Search across commodity, variety, district, and APMC
      const matchesSearch = !searchLower || (
        item.commodity.toLowerCase().includes(searchLower) ||
        item.variety.toLowerCase().includes(searchLower) ||
        item.district.toLowerCase().includes(searchLower) ||
        item.state.toLowerCase().includes(searchLower) ||
        item.market.toLowerCase().includes(searchLower)
      );

      // 2. State filter
      const matchesState = selectedState === 'All States & UTs' || item.state === selectedState;

      // 3. Category filter
      const matchesCategory = selectedCategory === 'All Crops' || item.category === selectedCategory;

      // 4. Profitability filter
      const diff = item.modalPrice - item.msp;
      const marginPct = (diff / item.msp) * 100;
      let matchesProfitability = true;
      if (profitabilityFilter === 'above_msp') {
        matchesProfitability = diff > 0;
      } else if (profitabilityFilter === 'high_margin') {
        matchesProfitability = marginPct >= 20;
      } else if (profitabilityFilter === 'under_msp') {
        matchesProfitability = diff <= 0;
      }

      return matchesSearch && matchesState && matchesCategory && matchesProfitability;
    });

    // Compute dynamic distances if userLocation is available
    const withDistance = filtered.map((item) => {
      let distanceKm = item.defaultDistanceKm;
      if (userLocation) {
        const computed = calculateHaversineDistance(
          userLocation.lat,
          userLocation.lon,
          item.lat,
          item.lon
        );
        if (computed !== null) distanceKm = computed;
      }
      return { ...item, computedDistanceKm: distanceKm };
    });

    // Sorting
    return withDistance.sort((a, b) => {
      if (sortBy === 'highest_price') {
        return b.modalPrice - a.modalPrice;
      }
      if (sortBy === 'gain_over_msp') {
        const gainA = a.modalPrice - a.msp;
        const gainB = b.modalPrice - b.msp;
        return gainB - gainA;
      }
      if (sortBy === 'distance') {
        return a.computedDistanceKm - b.computedDistanceKm;
      }
      if (sortBy === 'daily_change') {
        return b.dailyChangePct - a.dailyChangePct;
      }
      return 0;
    });
  }, [mandiRecords, debouncedSearch, selectedState, selectedCategory, profitabilityFilter, sortBy, userLocation]);

  // Virtualizer for Desktop Table View
  const desktopParentRef = useRef(null);
  const desktopRowVirtualizer = useVirtualizer({
    count: processedRecords.length,
    getScrollElement: () => desktopParentRef.current,
    estimateSize: () => 76,
    overscan: 6
  });

  // Virtualizer for Mobile Card View
  const mobileParentRef = useRef(null);
  const mobileRowVirtualizer = useVirtualizer({
    count: processedRecords.length,
    getScrollElement: () => mobileParentRef.current,
    estimateSize: () => 230,
    overscan: 5
  });

  const activeWeather = IMD_WEATHER_ALERTS[activeWeatherIdx] || IMD_WEATHER_ALERTS[0];

  const handleOpenGoogleMaps = (market, district, state) => {
    const query = encodeURIComponent(`${market}, ${district}, ${state}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <section id="mandi" className="py-6 sm:py-10 md:py-12 bg-[#061a14]/85 backdrop-blur-[2px] relative overflow-hidden border-b border-emerald-900/50">
      
      {/* Background Glow Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 space-y-3 sm:space-y-4">
        
        {/* =========================================================================
            HEADER & TITLE - Compact High-Density Header
        ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-1 sm:space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-emerald-950/90 border border-emerald-700/60 text-[10px] sm:text-[11px] font-bold text-emerald-300 shadow-md">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('mandi_radar_badge', '28 Indian States & UTs Mandi Radar')}</span>
            <span className="bg-gradient-to-r from-emerald-400 to-amber-400 text-black px-1.5 py-0.2 rounded-full font-mono text-[8.5px] sm:text-[9px] font-extrabold uppercase">
              Agmarknet &amp; e-NAM
            </span>
          </div>

          <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
            {t('mandi_radar_title', 'Live Mandi Prices & MSP Intelligence')}
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-normal sm:leading-relaxed max-w-2xl mx-auto">
            {t('mandi_radar_sub', 'Real-time modal rates, official CACP Minimum Support Prices (MSP), and net profit spreads across all 28 Indian States and key Union Territories. Offline-cached for rural 2G/3G connectivity.')}
          </p>

          {/* Sync & Connectivity Badges - Compact */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-0.5 text-xs">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-emerald-950/80 border border-emerald-800 text-slate-300 font-mono text-[10.5px]">
              {isOfflineCached ? (
                <>
                  <WifiOff className="w-3 h-3 text-amber-400" />
                  <span className="text-amber-300">Offline Cached Mode (2G/3G Ready)</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-300">{t('mandi_sync_connected', 'Live Sync Connected')} ({processedRecords.length} Mandis)</span>
                </>
              )}
            </div>

            <button
              onClick={loadData}
              disabled={isSyncing}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 text-[10.5px] font-medium transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-amber-400' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : t('mandi_refresh_btn', 'Refresh Rates')}</span>
            </button>

            {locationStatus && (
              <span className="text-[10.5px] font-mono text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded-lg border border-amber-800/50 flex items-center gap-1">
                <Compass className="w-3 h-3 text-amber-400 shrink-0" />
                <span>{locationStatus}</span>
              </span>
            )}

            {userLocation && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-lg border border-emerald-700/60" title="Geodesic distance calculation happens on your local device. DPDP & GDPR compliant.">
                <MapPin className="w-2.5 h-2.5 text-amber-400" />
                <span>{userLocation.lat.toFixed(2)}°N, {userLocation.lon.toFixed(2)}°E</span>
                <span className="text-[9px] text-slate-400 border-l border-emerald-800 pl-1">DPDP &amp; GDPR On-Device</span>
              </span>
            )}
          </div>
        </div>

        {/* =========================================================================
            IMD HYPER-LOCAL WEATHER & TARPAULIN ADVISORY TICKER - 27 STATES PAN-INDIA
        ========================================================================= */}
        <div className="bg-gradient-to-r from-[#032415] via-[#053820] to-[#032415] border border-emerald-500/40 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 shadow-xl space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10.5px] sm:text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('mandi_weather_ticker', 'IMD Live Agri-Weather Advisory & Tarpaulin Alerts')}</span>
              <span className="px-2 py-0.2 rounded-full bg-amber-400/20 text-amber-300 border border-amber-500/40 text-[9px] sm:text-[10px] font-sans font-bold normal-case tracking-normal">
                27 States Pan-India
              </span>
            </div>

            {/* Quick State Dropdown & Carousel Navigation Controls */}
            <div className="flex items-center gap-1.5 text-xs">
              <div className="relative">
                <select
                  value={activeWeatherIdx}
                  onChange={(e) => setActiveWeatherIdx(Number(e.target.value))}
                  aria-label="Select state for IMD weather advisory"
                  className="bg-emerald-950/90 text-emerald-200 border border-emerald-700/80 rounded-md px-2 py-0.5 text-[11px] sm:text-xs font-medium focus:outline-none focus:border-amber-400 cursor-pointer shadow-inner"
                >
                  {IMD_WEATHER_ALERTS.map((alert, idx) => (
                    <option key={alert.state} value={idx} className="bg-[#032415] text-slate-200">
                      {idx + 1}. {alert.state}
                    </option>
                  ))}
                </select>
              </div>

              <span className="text-slate-400 text-[11px] font-mono px-0.5">
                {activeWeatherIdx + 1} / {IMD_WEATHER_ALERTS.length}
              </span>

              <button
                onClick={() => setActiveWeatherIdx((prev) => (prev - 1 + IMD_WEATHER_ALERTS.length) % IMD_WEATHER_ALERTS.length)}
                className="p-1 rounded-md bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-slate-300 hover:text-white transition-colors"
                title="Previous State Advisory"
                aria-label="Previous State Advisory"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button
                onClick={() => setActiveWeatherIdx((prev) => (prev + 1) % IMD_WEATHER_ALERTS.length)}
                className="p-1 rounded-md bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-slate-300 hover:text-white transition-colors"
                title="Next State Advisory"
                aria-label="Next State Advisory"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2.5 pt-0.5">
            <div className="flex items-start gap-2.5 flex-1 min-w-0">
              <span className={`p-2 rounded-xl border shrink-0 ${
                activeWeather.severity === 'warning' 
                  ? 'bg-red-500/20 text-red-400 border-red-500/40' 
                  : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
              }`}>
                <CloudSun className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
              <div className="space-y-1.5 min-w-0 flex-1">
                <div className="text-xs sm:text-sm font-bold text-white flex items-center flex-wrap gap-1.5">
                  <span className="text-emerald-300 font-semibold text-sm sm:text-base">{activeWeather.state}</span>
                  <span className="text-slate-400 font-normal text-xs">({activeWeather.district})</span>
                  <span className={`px-1.5 py-0.2 rounded-full font-mono text-[9px] uppercase font-bold border ${
                    activeWeather.severity === 'warning'
                      ? 'bg-red-500/20 text-red-300 border-red-500/40'
                      : 'bg-amber-400/20 text-amber-300 border-amber-500/40'
                  }`}>
                    {activeWeather.condition}
                  </span>
                </div>
                <div className="bg-black/35 border border-amber-500/30 rounded-lg px-2.5 py-1.5">
                  <div className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold text-[11px] sm:text-xs uppercase tracking-wide shrink-0">
                      🚨 Tarpaulin Advisory:
                    </span>
                    <p className="text-[11px] sm:text-xs text-slate-200 leading-relaxed font-medium">
                      {activeWeather.advisory}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-1.5 shrink-0 w-full lg:w-auto">
              <div className="font-mono text-[11px] sm:text-xs text-emerald-300 bg-emerald-950/90 px-2.5 py-1 rounded-lg border border-emerald-800 shadow-inner whitespace-nowrap">
                {activeWeather.metrics}
              </div>
              {selectedState !== activeWeather.state && (
                <button
                  onClick={() => setSelectedState(activeWeather.state)}
                  className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 underline decoration-dotted flex items-center gap-1 transition-colors"
                  title={`Filter Mandi table to ${activeWeather.state}`}
                >
                  <span>{t('mandi_filter_for', 'Filter Mandis for')} {activeWeather.state}</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================================
            SEARCH, FILTER & STATE SELECTOR ROW - Compact High-Density Deck
        ========================================================================= */}
        <div className="bg-[#042013] p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-emerald-800/60 shadow-xl space-y-2 sm:space-y-2.5">
          
          {/* Top row: Search, State Selector, Locate Button */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
            
            {/* Search Input */}
            <div className="relative md:col-span-5">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('mandi_search_placeholder', 'Search crop (e.g. Wheat, Rice, Cotton)...')}
                className="w-full bg-emerald-950/90 border border-emerald-700/60 rounded-lg pl-9 pr-3 py-1.5 sm:py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* State Dropdown (All 28 States + UTs) */}
            <div className="md:col-span-4">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-emerald-950/90 border border-emerald-700/60 rounded-lg px-3 py-1.5 sm:py-2 text-xs text-emerald-300 font-semibold focus:outline-none focus:border-amber-400 transition-colors"
              >
                {INDIAN_STATES_AND_UTS.map((st) => (
                  <option key={st} value={st} className="bg-[#042013] text-white">
                    {st === 'All States & UTs' ? t('mandi_all_states', 'All States & UTs') : st}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort & Geolocation Controls */}
            <div className="md:col-span-3 flex items-center gap-1.5">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-emerald-950/90 border border-emerald-700/60 rounded-lg px-2.5 py-1.5 sm:py-2 text-xs text-amber-300 font-semibold focus:outline-none focus:border-amber-400 transition-colors"
              >
                <option value="highest_price" className="bg-[#042013] text-white">{t('mandi_sort_highest', 'Highest Rate')}</option>
                <option value="gain_over_msp" className="bg-[#042013] text-white">{t('mandi_sort_msp_gain', 'Gain Above MSP')}</option>
                <option value="distance" className="bg-[#042013] text-white">{t('mandi_sort_nearest', 'Nearest Center')}</option>
                <option value="daily_change" className="bg-[#042013] text-white">{t('mandi_sort_trend', 'Daily % Trend')}</option>
              </select>

              <button
                onClick={triggerDetectLocation}
                disabled={isLocating}
                className={`px-2.5 py-1.5 sm:py-2 rounded-lg border text-xs font-bold transition-all shrink-0 flex items-center gap-1 active:scale-95 ${
                  userLocation
                    ? 'bg-emerald-900/90 border-emerald-400 text-emerald-200 shadow-sm'
                    : 'bg-emerald-950 hover:bg-emerald-900 border-emerald-700/60 text-emerald-300'
                }`}
                title="Sort mandis closest to your live location (DPDP & GDPR privacy compliant)"
              >
                <Compass className={`w-3.5 h-3.5 text-amber-400 ${isLocating ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">
                  {isLocating ? t('mandi_locating', 'Locating...') : userLocation ? t('mandi_gps_active', 'GPS Radar Active') : t('mandi_gps_radar', 'GPS Radar')}
                </span>
              </button>
            </div>

          </div>

          {/* Quick State Filter Chips Row */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-0.5 border-t border-emerald-900/40">
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3" /> {t('mandi_quick_filter', 'Quick:')}
            </span>
            <div className="flex items-center gap-1 shrink-0">
              {POPULAR_AGRI_STATES.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedState(st)}
                  className={`px-2 py-0.5 rounded-md text-[10.5px] font-semibold whitespace-nowrap transition-all active:scale-95 ${
                    selectedState === st
                      ? 'bg-amber-400 text-black font-extrabold shadow-sm'
                      : 'bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {st === 'All States & UTs' ? t('mandi_all_india', 'All India') : st}
                </button>
              ))}
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="ml-auto px-2 py-0.5 rounded-md bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-[10px] font-bold flex items-center gap-1 shrink-0 transition-colors active:scale-95"
                title="Reset all search filters"
              >
                <X className="w-3 h-3" />
                <span>{t('mandi_reset_filters', 'Reset Filters')}</span>
              </button>
            )}
          </div>

          {/* Secondary filter pills: Crop Categories & Profitability */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-emerald-900/40">
            
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1">
              {CROP_CATEGORIES.map((cat) => {
                const catKey = `mandi_cat_${cat.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all active:scale-95 ${
                      selectedCategory === cat
                        ? 'bg-emerald-500 text-black shadow-sm font-bold'
                        : 'bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 text-slate-300'
                    }`}
                  >
                    {t(catKey, cat)}
                  </button>
                );
              })}
            </div>

            {/* Profitability Filter */}
            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-slate-400 font-medium hidden sm:inline">{t('mandi_msp_spread_label', 'MSP Spread:')}</span>
              {[
                { id: 'all', label: 'All Margins', key: 'mandi_spread_all' },
                { id: 'above_msp', label: 'Above MSP', key: 'mandi_spread_above_msp' },
                { id: 'high_margin', label: '> 20% Spread', key: 'mandi_spread_gt20' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setProfitabilityFilter(p.id)}
                  className={`px-2 py-0.5 rounded-md text-[10.5px] font-mono transition-colors active:scale-95 ${
                    profitabilityFilter === p.id
                      ? 'bg-amber-400 text-black font-extrabold'
                      : 'bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 text-slate-300'
                  }`}
                >
                  {t(p.key, p.label)}
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* =========================================================================
            DATA PRESENTATION: DESKTOP VIRTUALIZED TABLE
        ========================================================================= */}
        <div className="hidden lg:block bg-[#042013] border border-emerald-800/60 rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Table Column Headers */}
          <div className="grid grid-cols-12 bg-[#03190f] text-slate-400 font-bold uppercase tracking-wider text-[11px] py-4 px-6 border-b border-emerald-900/60">
            <div className="col-span-4">{t('mandi_col_commodity', 'Commodity & Variety')}</div>
            <div className="col-span-3">{t('mandi_col_market', 'Primary APMC Market')}</div>
            <div className="col-span-2">{t('mandi_col_modal_price', 'Modal Price (₹/qtl)')}</div>
            <div className="col-span-2">{t('mandi_col_msp_spread', 'Govt MSP & Net Spread')}</div>
            <div className="col-span-1 text-right">{t('mandi_col_distance', 'Distance')}</div>
          </div>

          {/* Virtualized Container */}
          <div
            ref={desktopParentRef}
            className="max-h-[620px] overflow-auto divide-y divide-emerald-900/30 font-medium text-xs scrollbar-thin scrollbar-thumb-emerald-800 scrollbar-track-emerald-950"
          >
            {processedRecords.length === 0 ? (
              <div className="text-center py-16 space-y-2">
                <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
                <div className="text-white font-bold">No mandi rates match your filters</div>
                <div className="text-xs text-slate-400">Try broadening your search term or selecting All States.</div>
              </div>
            ) : (
              <div
                style={{
                  height: `${desktopRowVirtualizer.getTotalSize()}px`,
                  position: 'relative',
                  width: '100%'
                }}
              >
                {desktopRowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const item = processedRecords[virtualRow.index];
                  const diff = item.modalPrice - item.msp;
                  const diffPct = ((diff / item.msp) * 100).toFixed(1);
                  const isGain = diff >= 0;

                  return (
                    <div
                      key={item.id}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`
                      }}
                      className="grid grid-cols-12 items-center py-3.5 px-6 hover:bg-emerald-900/30 transition-colors border-b border-emerald-900/20"
                    >
                      {/* Commodity & Variety */}
                      <div className="col-span-4 pr-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{item.commodity}</span>
                          <span className="text-[10px] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 text-emerald-400 font-mono">
                            {item.category}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-300 font-mono truncate">
                          Variety: {item.variety}
                        </div>
                      </div>

                      {/* Market & Location */}
                      <div className="col-span-3 pr-2">
                        <div className="text-slate-200 font-semibold truncate">{item.market}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{item.district}, {item.state}</span>
                        </div>
                      </div>

                      {/* Modal Price & Trend */}
                      <div className="col-span-2">
                        <div className="font-extrabold text-amber-400 text-base font-mono">
                          ₹{item.modalPrice.toLocaleString('en-IN')} <span className="text-xs text-slate-400 font-sans">{item.unit}</span>
                        </div>
                        <div className={`text-[10px] font-bold flex items-center gap-1 ${item.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {item.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          <span>{item.isUp ? `+${item.dailyChangePct}%` : `${item.dailyChangePct}%`} Daily</span>
                        </div>
                      </div>

                      {/* MSP & Margin Spread */}
                      <div className="col-span-2">
                        <div className="text-[11px] text-slate-400 font-mono">
                          MSP: ₹{item.msp.toLocaleString('en-IN')}
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold border inline-flex items-center gap-1 mt-0.5 ${
                            isGain
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          }`}
                        >
                          {isGain ? `+₹${diff.toLocaleString('en-IN')} (+${diffPct}%)` : `-₹${Math.abs(diff).toLocaleString('en-IN')} (${diffPct}%)`}
                        </span>
                      </div>

                      {/* Distance & Directions & Quick Copy */}
                      <div className="col-span-1 text-right flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleCopyMandiRate(item)}
                          className="p-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 rounded-lg text-slate-300 hover:text-amber-400 transition-colors active:scale-95"
                          title="Copy rate details"
                        >
                          {copiedMandiId === (item.id || `${item.commodity}-${item.market}`) ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleOpenGoogleMaps(item.market, item.district, item.state)}
                          className="px-2 py-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/60 rounded-lg text-emerald-300 text-[11px] font-semibold inline-flex items-center gap-1 transition-colors hover:border-emerald-500 active:scale-95"
                          title="Open Mandi in Google Maps"
                        >
                          <Navigation className="w-3 h-3 text-amber-400" />
                          <span>{item.computedDistanceKm} km</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* =========================================================================
            DATA PRESENTATION: MOBILE VIRTUALIZED CARD LIST
        ========================================================================= */}
        <div className="block lg:hidden space-y-3">
          <div className="text-xs text-slate-400 font-mono flex items-center justify-between pb-1">
            <span>Showing {processedRecords.length} Mandi Centers</span>
            <span className="text-emerald-400">⚡ 60 FPS Virtualized</span>
          </div>

          <div
            ref={mobileParentRef}
            className="max-h-[480px] sm:max-h-[600px] overflow-auto scrollbar-thin scrollbar-thumb-emerald-800"
          >
            {processedRecords.length === 0 ? (
              <div className="text-center py-12 space-y-2 bg-[#042013] rounded-2xl p-6 border border-emerald-800/60">
                <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
                <div className="text-white font-bold">No mandi rates match your filters</div>
                <div className="text-xs text-slate-400">Try selecting All States.</div>
              </div>
            ) : (
              <div
                style={{
                  height: `${mobileRowVirtualizer.getTotalSize()}px`,
                  position: 'relative',
                  width: '100%'
                }}
              >
                {mobileRowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const item = processedRecords[virtualRow.index];
                  const diff = item.modalPrice - item.msp;
                  const diffPct = ((diff / item.msp) * 100).toFixed(1);
                  const isGain = diff >= 0;

                  return (
                    <div
                      key={item.id}
                      ref={mobileRowVirtualizer.measureElement}
                      data-index={virtualRow.index}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        transform: `translateY(${virtualRow.start}px)`
                      }}
                      className="pb-3"
                    >
                      <div className="p-4 rounded-2xl bg-[#042013] border border-emerald-800/60 space-y-3 shadow-lg">
                        {/* Card Header: Commodity + Category + Distance */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-bold text-white text-sm">{item.commodity}</div>
                            <div className="text-[11px] text-slate-300 font-mono">
                              Variety: {item.variety}
                            </div>
                          </div>
                          <span className="text-[10px] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 text-emerald-400 font-mono shrink-0">
                            {item.category}
                          </span>
                        </div>

                        {/* APMC Market & District */}
                        <div className="text-xs text-slate-300 space-y-0.5">
                          <div className="font-semibold text-slate-200">{item.market}</div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span>{item.district}, {item.state}</span>
                          </div>
                        </div>

                        {/* Price Grid */}
                        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-emerald-900/40">
                          <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/40">
                            <div className="text-[10px] text-slate-400">Today's Modal Rate</div>
                            <div className="font-extrabold text-amber-400 text-base font-mono">
                              ₹{item.modalPrice.toLocaleString('en-IN')}
                            </div>
                            <div className={`text-[10px] font-bold flex items-center gap-0.5 ${item.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {item.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                              <span>{item.isUp ? `+${item.dailyChangePct}%` : `${item.dailyChangePct}%`}</span>
                            </div>
                          </div>

                          <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/40">
                            <div className="text-[10px] text-slate-400">Govt MSP Rate</div>
                            <div className="font-bold text-slate-200 text-xs font-mono">
                              ₹{item.msp.toLocaleString('en-IN')}
                            </div>
                            <div className={`text-[10px] font-mono font-bold mt-1 ${isGain ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {isGain ? `+₹${diff} over MSP` : `-₹${Math.abs(diff)} vs MSP`}
                            </div>
                          </div>
                        </div>

                        {/* Footer: Directions & Share Rate Button */}
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => handleCopyMandiRate(item)}
                            className="px-3 py-2 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 rounded-xl text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors active:scale-95 shrink-0"
                            title="Share rate details"
                          >
                            {copiedMandiId === (item.id || `${item.commodity}-${item.market}`) ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400 font-bold">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-amber-400" />
                                <span>Copy Rate</span>
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => handleOpenGoogleMaps(item.market, item.district, item.state)}
                            className="flex-1 py-2 bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/60 rounded-xl text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 touch-manipulation cursor-pointer"
                          >
                            <Navigation className="w-3.5 h-3.5 text-amber-400" />
                            <span>Navigate ({item.computedDistanceKm} km)</span>
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* =========================================================================
            BOTTOM TRUST BANNER & MSP POLICY INFO
        ========================================================================= */}
        <div className="p-5 rounded-3xl bg-[#031d10]/80 border border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <div className="font-bold text-white flex items-center gap-1.5">
                <span>100% Verified Price Benchmarking via Agmarknet &amp; e-NAM</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-400 text-black font-mono text-[9px] font-extrabold uppercase">
                  Govt Official
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Minimum Support Prices (MSP) recommended by Commission for Agricultural Costs &amp; Prices (CACP), Ministry of Agriculture &amp; Farmers Welfare.
              </p>
            </div>
          </div>

          <a
            href="https://agmarknet.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 hover:text-white font-semibold text-xs transition-colors shrink-0"
          >
            <span>Agmarknet Portal</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </a>
        </div>

      </div>

      {/* Feature-Specific Contextual Prompt: Mandi & Weather GPS Location Modal */}
      {showGPSPromptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-gradient-to-b from-[#06331f] via-[#042114] to-[#02140c] border-2 border-emerald-500/60 rounded-3xl p-6 sm:p-7 shadow-2xl text-center space-y-4">
            
            <div className="w-16 h-16 rounded-2xl bg-amber-400 text-black mx-auto flex items-center justify-center shadow-lg shadow-amber-400/20">
              <Compass className="w-9 h-9" />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Feature-Specific Contextual Prompt</span>
              </div>
              <h3 className="text-xl font-display font-extrabold text-white">
                Mandi &amp; Weather GPS Access
              </h3>
            </div>

            {/* Mandatory Contextual Statement (Agronomic Advisories) */}
            <div className="p-3.5 rounded-2xl bg-black/70 border border-amber-500/40 text-amber-200 text-xs sm:text-sm font-semibold leading-relaxed">
              &ldquo;Location access is required to calculate localized Mandi distances, regional prices, and weather alerts for farm-level agronomic advisories.&rdquo;
            </div>

            <p className="text-xs text-slate-300 leading-relaxed text-left">
              GrainWish AI sorts 28-state APMC Mandi rates by proximity to your fields and displays localized IMD squall/tarpaulin alerts. Coordinates are processed client-side and never sold.
            </p>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowGPSPromptModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLocationConsent}
                className="flex-[1.5] py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-amber-400 hover:from-emerald-400 hover:to-amber-300 text-black text-xs font-black shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-black" />
                <span>Allow GPS Access</span>
              </button>
            </div>

            <div className="text-[10px] text-slate-400 font-mono">
              DPDP Act 2023 &amp; GDPR Compliant · Agronomic advisories only
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
