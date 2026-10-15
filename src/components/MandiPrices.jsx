import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { 
  TrendingUp, MapPin, CloudSun, ArrowUpRight, ArrowDownRight, 
  Search, ShieldCheck, Navigation, Bell, Database, Wifi, WifiOff,
  Filter, ChevronRight, ChevronLeft, RefreshCw, AlertTriangle, 
  Layers, ArrowUpDown, Compass, CheckCircle2, Sparkles, ExternalLink
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

export default function MandiPrices() {
  const { t } = useLanguage();
  
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedState, setSelectedState] = useState('All States & UTs');
  const [selectedCategory, setSelectedCategory] = useState('All Crops');
  const [profitabilityFilter, setProfitabilityFilter] = useState('all'); // all, above_msp, high_margin, under_msp
  const [sortBy, setSortBy] = useState('highest_price'); // highest_price, gain_over_msp, distance, daily_change
  
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
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser');
      return;
    }
    setIsLocating(true);
    setLocationStatus('Pinpointing your GPS coordinates...');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        setUserLocation(coords);
        setIsLocating(false);
        setLocationStatus('GPS active: Mandis sorted by nearest distance');
        setSortBy('distance');
      },
      () => {
        setIsLocating(false);
        setLocationStatus('Permission denied. Using default state distances');
      },
      { timeout: 8000 }
    );
  };

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
    estimateSize: () => 170,
    overscan: 4
  });

  const activeWeather = IMD_WEATHER_ALERTS[activeWeatherIdx];

  const handleOpenGoogleMaps = (market, district, state) => {
    const query = encodeURIComponent(`${market}, ${district}, ${state}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <section id="mandi" className="py-24 bg-[#061a14] relative overflow-hidden border-b border-emerald-900/50">
      
      {/* Background Glow Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* =========================================================================
            HEADER & TITLE
        ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-700/60 text-xs font-bold text-emerald-300 shadow-xl">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>28 Indian States &amp; UTs Mandi Radar</span>
            <span className="bg-gradient-to-r from-emerald-400 to-amber-400 text-black px-2 py-0.5 rounded-full font-mono text-[10px] font-extrabold uppercase">
              Agmarknet &amp; e-NAM
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Live <span className="gradient-text-agri">Mandi Prices &amp; MSP</span> Intelligence
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
            Real-time modal rates, official CACP Minimum Support Prices (MSP), and net profit spreads across all <strong>28 Indian States</strong> and key Union Territories. Offline-cached for rural 2G/3G connectivity.
          </p>

          {/* Sync & Connectivity Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-800 text-slate-300 font-mono text-[11px]">
              {isOfflineCached ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-300">Offline Cached Mode (2G/3G Ready)</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Live Sync Connected ({processedRecords.length} Mandis)</span>
                </>
              )}
            </div>

            <button
              onClick={loadData}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 text-[11px] font-medium transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-amber-400' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Refresh Rates'}</span>
            </button>

            {locationStatus && (
              <span className="text-[11px] font-mono text-amber-300 bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-800/50">
                {locationStatus}
              </span>
            )}
          </div>
        </div>

        {/* =========================================================================
            IMD HYPER-LOCAL WEATHER & TARPAULIN ADVISORY TICKER
        ========================================================================= */}
        <div className="bg-gradient-to-r from-[#032415] via-[#053820] to-[#032415] border-2 border-emerald-500/40 rounded-3xl p-5 shadow-2xl space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
              </span>
              <Bell className="w-4 h-4 text-amber-400" />
              <span>IMD Live Agri-Weather Advisory &amp; Tarpaulin Alerts</span>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>{activeWeatherIdx + 1} of {IMD_WEATHER_ALERTS.length}</span>
              <button
                onClick={() => setActiveWeatherIdx((prev) => (prev - 1 + IMD_WEATHER_ALERTS.length) % IMD_WEATHER_ALERTS.length)}
                className="p-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-slate-300 hover:text-white"
                title="Previous Advisory"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveWeatherIdx((prev) => (prev + 1) % IMD_WEATHER_ALERTS.length)}
                className="p-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-slate-300 hover:text-white"
                title="Next Advisory"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-1">
            <div className="flex items-start gap-3.5">
              <span className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shrink-0">
                <CloudSun className="w-6 h-6" />
              </span>
              <div className="space-y-1">
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{activeWeather.district}, {activeWeather.state}</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-500/40 font-mono text-[10px] uppercase font-bold">
                    {activeWeather.condition}
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {activeWeather.advisory}
                </p>
              </div>
            </div>

            <div className="shrink-0 font-mono text-xs text-emerald-300 bg-emerald-950/80 px-3.5 py-2 rounded-xl border border-emerald-800">
              {activeWeather.metrics}
            </div>
          </div>
        </div>

        {/* =========================================================================
            SEARCH, FILTER & STATE SELECTOR ROW
        ========================================================================= */}
        <div className="bg-[#042013] p-5 rounded-3xl border border-emerald-800/60 shadow-2xl space-y-4">
          
          {/* Top row: Search, State Selector, Locate Button */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            
            {/* Search Input */}
            <div className="relative md:col-span-5">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search commodity, variety, district, or APMC yard..."
                className="w-full bg-emerald-950/90 border border-emerald-700/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* State Dropdown (All 28 States + UTs) */}
            <div className="md:col-span-4">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-emerald-950/90 border border-emerald-700/60 rounded-xl px-3.5 py-2.5 text-xs text-emerald-300 font-semibold focus:outline-none focus:border-amber-400 transition-colors"
              >
                {INDIAN_STATES_AND_UTS.map((st) => (
                  <option key={st} value={st} className="bg-[#042013] text-white">
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort & Geolocation Controls */}
            <div className="md:col-span-3 flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-emerald-950/90 border border-emerald-700/60 rounded-xl px-3 py-2.5 text-xs text-amber-300 font-semibold focus:outline-none focus:border-amber-400 transition-colors"
              >
                <option value="highest_price" className="bg-[#042013] text-white">Highest Rate</option>
                <option value="gain_over_msp" className="bg-[#042013] text-white">Gain Above MSP</option>
                <option value="distance" className="bg-[#042013] text-white">Nearest Center</option>
                <option value="daily_change" className="bg-[#042013] text-white">Daily % Trend</option>
              </select>

              <button
                onClick={handleDetectLocation}
                disabled={isLocating}
                className="px-3 py-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 text-xs font-bold transition-all shrink-0 flex items-center gap-1.5"
                title="Sort mandis closest to your live location"
              >
                <Compass className={`w-4 h-4 text-amber-400 ${isLocating ? 'animate-spin' : ''}`} />
                <span className="hidden lg:inline">{isLocating ? 'Locating...' : 'GPS'}</span>
              </button>
            </div>

          </div>

          {/* Secondary filter pills: Crop Categories & Profitability */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-emerald-900/40">
            
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {CROP_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-500 text-black shadow-md'
                      : 'bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 text-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Profitability Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-medium hidden sm:inline">MSP Spread:</span>
              {[
                { id: 'all', label: 'All Margins' },
                { id: 'above_msp', label: 'Above MSP' },
                { id: 'high_margin', label: '> 20% Spread' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setProfitabilityFilter(p.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
                    profitabilityFilter === p.id
                      ? 'bg-amber-400 text-black font-extrabold'
                      : 'bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 text-slate-300'
                  }`}
                >
                  {p.label}
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
            <div className="col-span-4">Commodity &amp; Variety</div>
            <div className="col-span-3">Primary APMC Market</div>
            <div className="col-span-2">Modal Price (₹/qtl)</div>
            <div className="col-span-2">Govt MSP &amp; Net Spread</div>
            <div className="col-span-1 text-right">Distance</div>
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

                      {/* Distance & Directions */}
                      <div className="col-span-1 text-right">
                        <button
                          onClick={() => handleOpenGoogleMaps(item.market, item.district, item.state)}
                          className="px-2.5 py-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/60 rounded-lg text-emerald-300 text-[11px] font-semibold inline-flex items-center gap-1 transition-colors hover:border-emerald-500"
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
            className="max-h-[640px] overflow-auto space-y-3 scrollbar-thin scrollbar-thumb-emerald-800"
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
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        transform: `translateY(${virtualRow.start}px)`
                      }}
                      className="p-4 rounded-2xl bg-[#042013] border border-emerald-800/60 space-y-3 shadow-lg"
                    >
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

                      {/* Footer: Directions Button */}
                      <button
                        onClick={() => handleOpenGoogleMaps(item.market, item.district, item.state)}
                        className="w-full py-2 bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/60 rounded-xl text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5 text-amber-400" />
                        <span>Navigate to Mandi ({item.computedDistanceKm} km away)</span>
                      </button>

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
    </section>
  );
}
