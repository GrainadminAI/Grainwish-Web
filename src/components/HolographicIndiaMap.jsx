import React, { useState, useEffect } from 'react';
import { Sparkles, Activity, ShieldCheck, MapPin, Radio, TrendingUp, Flame, ArrowUpRight, Filter, Info, Navigation } from 'lucide-react';
import { INDIA_MAP_LOCATIONS, INDIA_MAP_VIEWBOX, INDIA_BORDER_PATH } from '../lib/indiaMapData';
import { useLanguage } from '../lib/LanguageContext';
import { AGRI_HUBS, TELEMETRY_LINKS, findHubByLocation } from '../lib/agriHubsData';

// Re-export INDIA_BORDER_PATH, AGRI_HUBS, TELEMETRY_LINKS, and findHubByLocation for consumers & testing suites
// Includes key agricultural state hubs across India: Punjab, Maharashtra, Haryana, Rajasthan, Gujarat, Madhya Pradesh, Andhra & Telangana, Karnataka, West Bengal & Bihar, Assam & NE, Tamil Nadu & Kerala, J&K & Ladakh
export { INDIA_BORDER_PATH, AGRI_HUBS, TELEMETRY_LINKS, findHubByLocation };

export default function HolographicIndiaMap({ className = "" }) {
  const { t, detectedLocationInfo } = useLanguage();

  // Helper to find detected hub from storage or context
  const getDetectedHubFromStorage = () => {
    if (detectedLocationInfo?.region) {
      const match = findHubByLocation(detectedLocationInfo);
      if (match) return match;
    }
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('grainwise_detected_location');
        if (raw) {
          const parsed = JSON.parse(raw);
          const match = findHubByLocation(parsed);
          if (match) return match;
        }
      } catch {}
      try {
        const rawLoc = localStorage.getItem('grainwise_farm_location');
        if (rawLoc) {
          const match = findHubByLocation(rawLoc);
          if (match) return match;
        }
      } catch {}
    }
    return null;
  };

  const initialDetected = getDetectedHubFromStorage();
  const [userDetectedHub, setUserDetectedHub] = useState(initialDetected);
  const [activeHub, setActiveHub] = useState(initialDetected || AGRI_HUBS[0]);
  const [hoveredHub, setHoveredHub] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Reactively track detectedLocationInfo updates
  useEffect(() => {
    if (detectedLocationInfo) {
      const matched = findHubByLocation(detectedLocationInfo);
      if (matched) {
        setUserDetectedHub(matched);
        setActiveHub((prev) => {
          if (!prev || prev.id === 'punjab' || !userDetectedHub) {
            return matched;
          }
          return prev;
        });
      }
    }
  }, [detectedLocationInfo]);

  // Check on mount or storage events (e.g. if GPS finished detecting in another component)
  useEffect(() => {
    const checkStorage = () => {
      const detected = getDetectedHubFromStorage();
      if (detected) {
        setUserDetectedHub(detected);
        setActiveHub((prev) => (!prev || prev.id === 'punjab' ? detected : prev));
      }
    };
    checkStorage();

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', checkStorage);
      return () => window.removeEventListener('storage', checkStorage);
    }
  }, []);

  const displayHub = hoveredHub || activeHub;
  const isDisplayHubUserHome = userDetectedHub && displayHub.id === userDetectedHub.id;

  // Filter hubs according to selected demand category
  const filteredHubs = AGRI_HUBS.filter(hub => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'high-demand') return hub.demandScore >= 92;
    if (categoryFilter === 'grain') return hub.category === 'grain';
    if (categoryFilter === 'oilseed-cash') return hub.category === 'oilseed' || hub.category === 'cash';
    return true;
  });

  return (
    <div className={`relative flex flex-col items-center justify-center select-none w-full ${className}`}>
      
      {/* Outer Ambient Glow Aura */}
      <div className="absolute inset-0 bg-radial-gradient from-emerald-500/15 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Floating Telemetry & Demand Filter Header */}
      <div className="relative z-10 w-full flex flex-col items-center gap-1 mb-1 sm:mb-1.5 px-1">
        {/* Main Title Badge */}
        <div className="flex items-center justify-between w-full max-w-[360px] sm:max-w-[380px] px-2 py-0.5 rounded-full bg-emerald-950/85 border border-emerald-500/40 backdrop-blur-md shadow-lg shadow-emerald-950/60 text-[9px] sm:text-[10px]">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="flex h-1.5 w-1.5 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500" />
            </span>
            <span className="font-extrabold uppercase tracking-wider text-emerald-300 truncate flex items-center gap-1">
              <Radio className="w-2.5 h-2.5 text-amber-400 animate-pulse shrink-0" />
              <span>{t('map_demand_radar', 'India Crop & Demand Radar')}</span>
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[8px] sm:text-[8.5px] text-rose-300 font-bold bg-rose-950/70 px-1 py-0.2 rounded border border-rose-500/40 flex items-center gap-0.5">
              <Flame className="w-2 h-2 text-rose-400 animate-pulse" />
              {t('map_live_demand', 'Live Demand')}
            </span>
            <span className="text-[8px] sm:text-[8.5px] text-amber-400 font-mono font-bold bg-amber-950/60 px-1 py-0.2 rounded border border-amber-500/30">
              {t('map_28_states', '28 States')}
            </span>
          </div>
        </div>

        {/* Quick Filter Tabs: Demand & Crop Types */}
        <div className="flex items-center justify-center gap-1 w-full max-w-[360px] sm:max-w-[380px] overflow-x-auto py-0.5 scrollbar-none">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-1.5 py-0.5 rounded-full text-[8.5px] sm:text-[9px] font-semibold transition-all whitespace-nowrap ${
              categoryFilter === 'all'
                ? 'bg-emerald-500 text-black shadow-sm'
                : 'bg-emerald-950/60 text-slate-300 hover:text-white border border-emerald-800/40'
            }`}
          >
            {t('map_all_crops', 'All Crops')}
          </button>

          <button
            onClick={() => setCategoryFilter('high-demand')}
            className={`px-1.5 py-0.5 rounded-full text-[8.5px] sm:text-[9px] font-semibold transition-all flex items-center gap-0.5 whitespace-nowrap ${
              categoryFilter === 'high-demand'
                ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-black font-extrabold shadow-sm'
                : 'bg-rose-950/50 text-rose-300 hover:text-white border border-rose-800/40'
            }`}
          >
            <Flame className="w-2 h-2 text-amber-300" />
            🔥 {t('map_surge_demand', 'Surge Demand')}
          </button>

          <button
            onClick={() => setCategoryFilter('grain')}
            className={`px-1.5 py-0.5 rounded-full text-[8.5px] sm:text-[9px] font-semibold transition-all whitespace-nowrap ${
              categoryFilter === 'grain'
                ? 'bg-amber-400 text-black shadow-sm'
                : 'bg-emerald-950/60 text-slate-300 hover:text-white border border-emerald-800/40'
            }`}
          >
            🌾 {t('map_grains', 'Grains')}
          </button>

          <button
            onClick={() => setCategoryFilter('oilseed-cash')}
            className={`px-1.5 py-0.5 rounded-full text-[8.5px] sm:text-[9px] font-semibold transition-all whitespace-nowrap ${
              categoryFilter === 'oilseed-cash'
                ? 'bg-emerald-400 text-black shadow-sm'
                : 'bg-emerald-950/60 text-slate-300 hover:text-white border border-emerald-800/40'
            }`}
          >
            🌱 {t('map_oilseeds_cash', 'Oilseeds & Cash')}
          </button>
        </div>
      </div>

      {/* The Central Holographic Map Container (Auto-adjusts for compact, balanced display) */}
      <div className="relative w-full max-w-[270px] xs:max-w-[295px] sm:max-w-[325px] md:max-w-[350px] lg:max-w-[360px] aspect-[612/696] mx-auto filter drop-shadow-[0_0_25px_rgba(16,185,129,0.3)]">
        
        <svg
          viewBox={INDIA_MAP_VIEWBOX}
          className="w-full h-full overflow-hidden transition-transform duration-700 hover:scale-[1.01]"
        >
          <defs>
            {/* Holographic Scanline Grid Pattern */}
            <pattern id="agri-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="0.8" />
              <circle cx="20" cy="0" r="0.8" fill="rgba(245, 158, 11, 0.3)" />
            </pattern>

            {/* Glowing Map Fill Gradient */}
            <linearGradient id="india-fill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#083a24" stopOpacity="0.88" />
              <stop offset="50%" stopColor="#042617" stopOpacity="0.94" />
              <stop offset="100%" stopColor="#02160d" stopOpacity="0.96" />
            </linearGradient>

            {/* Glowing Border Gradient */}
            <linearGradient id="border-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="35%" stopColor="#10b981" />
              <stop offset="70%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>

            {/* Radar Sweep Arc Gradient */}
            <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(52, 211, 153, 0.35)" />
              <stop offset="60%" stopColor="rgba(16, 185, 129, 0.1)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            {/* Soft Shadow Filter for Nodes */}
            <filter id="glow-node" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Radar Scanner Concentric Range Rings */}
          <g opacity="0.25" className="pointer-events-none">
            <circle cx="260" cy="350" r="90" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="260" cy="350" r="170" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="260" cy="350" r="260" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="6 6" />
          </g>

          {/* Animated Sweeping Radar Beam */}
          <g transform="translate(260, 350)" className="pointer-events-none opacity-40">
            <circle r="240" fill="url(#radar-glow)" />
          </g>

          {/* Actual Geographic Indian States & Union Territories */}
          <g id="actual-indian-states" className="transition-all duration-300">
            {INDIA_MAP_LOCATIONS.map((loc) => {
              const isSelected = activeHub?.stateIds ? activeHub.stateIds.includes(loc.id) : activeHub?.stateId === loc.id;
              const isHovered = hoveredHub?.stateIds ? hoveredHub.stateIds.includes(loc.id) : hoveredHub?.stateId === loc.id;
              const isUserHome = userDetectedHub?.stateIds ? userDetectedHub.stateIds.includes(loc.id) : userDetectedHub?.stateId === loc.id;

              return (
                <path
                  key={loc.id}
                  id={`state-${loc.id}`}
                  d={loc.path}
                  fill={
                    isSelected
                      ? 'rgba(245, 158, 11, 0.45)'
                      : isHovered
                      ? 'rgba(52, 211, 153, 0.4)'
                      : isUserHome
                      ? 'rgba(16, 185, 129, 0.35)'
                      : 'url(#india-fill)'
                  }
                  stroke={
                    isSelected
                      ? '#fbbf24'
                      : isHovered
                      ? '#34d399'
                      : isUserHome
                      ? '#10b981'
                      : 'rgba(52, 211, 153, 0.35)'
                  }
                  strokeWidth={isSelected ? '1.8' : (isUserHome ? '1.4' : '0.8')}
                  strokeLinejoin="round"
                  className="transition-colors duration-300 cursor-pointer"
                  onClick={() => {
                    const hub = AGRI_HUBS.find(h => h.stateIds ? h.stateIds.includes(loc.id) : h.stateId === loc.id);
                    if (hub) setActiveHub(hub);
                  }}
                  onMouseEnter={() => {
                    const hub = AGRI_HUBS.find(h => h.stateIds ? h.stateIds.includes(loc.id) : h.stateId === loc.id);
                    if (hub) setHoveredHub(hub);
                  }}
                  onMouseLeave={() => setHoveredHub(null)}
                >
                  <title>{loc.name}{isUserHome ? ' (Your Region)' : ''}</title>
                </path>
              );
            })}
          </g>

          {/* Overlay Grid Pattern within India Boundary */}
          <path
            d={INDIA_BORDER_PATH}
            fill="url(#agri-grid)"
            className="pointer-events-none"
          />

          {/* Animated Laser Telemetry Links connecting Mandis */}
          <g className="pointer-events-none">
            {TELEMETRY_LINKS.map((link, idx) => {
              const fromHub = AGRI_HUBS.find(h => h.id === link.from);
              const toHub = AGRI_HUBS.find(h => h.id === link.to);
              if (!fromHub || !toHub) return null;

              return (
                <g key={`telemetry-${idx}`}>
                  {/* Subtle Background Arc */}
                  <line
                    x1={fromHub.x}
                    y1={fromHub.y}
                    x2={toHub.x}
                    y2={toHub.y}
                    stroke="rgba(16, 185, 129, 0.25)"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />
                  {/* Active High-Energy Pulse Line */}
                  <line
                    x1={fromHub.x}
                    y1={fromHub.y}
                    x2={toHub.x}
                    y2={toHub.y}
                    stroke={fromHub.id === displayHub.id || toHub.id === displayHub.id ? '#fbbf24' : '#10b981'}
                    strokeWidth={fromHub.id === displayHub.id || toHub.id === displayHub.id ? '2' : '1.2'}
                    strokeDasharray="6 14"
                    className="animate-pulse"
                    opacity={fromHub.id === displayHub.id || toHub.id === displayHub.id ? '0.9' : '0.45'}
                  />
                </g>
              );
            })}
          </g>

          {/* Interactive Agricultural Mandi Hub Markers */}
          {filteredHubs.map((hub) => {
            const isSelected = displayHub.id === hub.id;
            const isHighDemand = hub.demandScore >= 92;
            const isUserHome = userDetectedHub?.id === hub.id;

            return (
              <g
                key={hub.id}
                transform={`translate(${hub.x}, ${hub.y})`}
                onClick={() => setActiveHub(hub)}
                onMouseEnter={() => setHoveredHub(hub)}
                onMouseLeave={() => setHoveredHub(null)}
                className="cursor-pointer group/node"
              >
                {/* GPS Radar Beacon Wave for User's Detected Location Hub */}
                {isUserHome && (
                  <circle
                    r={isSelected ? "18" : "13"}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    className="animate-ping"
                    style={{ animationDuration: '1.8s' }}
                  />
                )}

                {/* Ping Radiation Wave for Selected / High-Demand Hubs */}
                {isSelected && !isUserHome && (
                  <circle
                    r="15"
                    fill="none"
                    stroke={hub.demandColor || "#fbbf24"}
                    strokeWidth="1.5"
                    className="animate-ping"
                    style={{ animationDuration: '2s' }}
                  />
                )}

                {isHighDemand && !isSelected && !isUserHome && (
                  <circle
                    r="11"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="1"
                    className="animate-ping"
                    style={{ animationDuration: '2.5s', animationDelay: '0.6s' }}
                  />
                )}

                {/* Outer Glow Halo */}
                <circle
                  r={isSelected ? "9" : (isUserHome ? "8" : "6")}
                  fill={isUserHome ? "#10b981" : (isHighDemand ? hub.demandColor : hub.color)}
                  opacity={isSelected || isUserHome ? "0.55" : "0.25"}
                  filter="url(#glow-node)"
                />

                {/* Inner Solid Hub Core */}
                <circle
                  r={isSelected ? "5.5" : (isUserHome ? "4.8" : "3.8")}
                  fill={isSelected ? "#ffffff" : (isUserHome ? "#10b981" : (isHighDemand ? hub.demandColor : hub.color))}
                  stroke="#021109"
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                />

                {/* State Name & Crop Badge on Map */}
                <g className="pointer-events-none">
                  {/* Background pill for text legibility */}
                  <rect
                    x="8"
                    y="-8"
                    width={isSelected ? "86" : (isUserHome ? "82" : "66")}
                    height={isSelected ? "19" : "15"}
                    rx="4"
                    fill="rgba(2, 17, 9, 0.88)"
                    stroke={isSelected ? '#fbbf24' : (isUserHome ? '#10b981' : 'rgba(16, 185, 129, 0.4)')}
                    strokeWidth={isSelected || isUserHome ? '1.2' : '0.6'}
                  />

                  {/* State Name */}
                  <text
                    x="12"
                    y="0"
                    fill={isSelected ? "#ffffff" : (isUserHome ? "#6ee7b7" : "#e2e8f0")}
                    fontSize={isSelected ? "9" : "8"}
                    fontWeight={isSelected || isUserHome ? "bold" : "600"}
                    fontFamily="sans-serif"
                    className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                  >
                    {isUserHome ? `📍 ${t(hub.nameKey, hub.name)}` : t(hub.nameKey, hub.name)}
                  </text>

                  {/* Crop Product & Demand Growth Micro Tag */}
                  <text
                    x="12"
                    y="7"
                    fill={isUserHome ? "#34d399" : (isHighDemand ? "#fca5a5" : "#fbbf24")}
                    fontSize="6.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {hub.cropShort} · {hub.demandGrowth}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Central Precision Crosshair (Geographic Center of India) */}
          <g transform="translate(260, 350)" className="pointer-events-none opacity-80">
            <circle r="12" fill="none" stroke="#fbbf24" strokeWidth="0.8" strokeDasharray="2 2" />
            <line x1="-15" y1="0" x2="15" y2="0" stroke="#fbbf24" strokeWidth="0.8" />
            <line x1="0" y1="-15" x2="0" y2="15" stroke="#fbbf24" strokeWidth="0.8" />
          </g>
        </svg>

      </div>

      {/* Real-Time Hub Telemetry Card: Positioned Cleanly Beneath the Map (Compact, High-Density HUD) */}
      <div className="w-full max-w-[360px] sm:max-w-[380px] mt-1.5 sm:mt-2 bg-gradient-to-r from-[#031d10]/98 via-[#06291a]/98 to-[#031d10]/98 backdrop-blur-xl border border-emerald-500/50 rounded-xl p-2 sm:p-2.5 shadow-2xl shadow-black/90 text-xs animate-slide-up">
        
        {/* Top Line: State + Demand Status in India + User Location Badge */}
        <div className="flex items-center justify-between gap-1.5 mb-1 pb-1 border-b border-emerald-800/40">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-emerald-950/90 border border-emerald-400/50 flex items-center justify-center shrink-0 shadow-sm text-xs">
              <span>{displayHub.cropIcon}</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="font-extrabold text-white text-xs sm:text-[13px] truncate">
                  {t(displayHub.nameKey, displayHub.name)}
                </span>
                <span className="text-[8px] sm:text-[8.5px] px-1 py-0.2 rounded font-semibold bg-emerald-900/60 text-emerald-300 border border-emerald-600/30 truncate max-w-[150px] sm:max-w-none">
                  {displayHub.sub}
                </span>
                {isDisplayHubUserHome ? (
                  <span className="text-[8px] sm:text-[8.5px] px-1.5 py-0.2 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/60 flex items-center gap-0.5 animate-pulse">
                    <MapPin className="w-2.5 h-2.5 text-amber-400" />
                    {t('map_your_region', 'Your Location')}
                  </span>
                ) : userDetectedHub ? (
                  <button
                    onClick={() => setActiveHub(userDetectedHub)}
                    className="text-[8px] sm:text-[8.5px] px-1.5 py-0.2 rounded font-bold bg-emerald-950/80 hover:bg-emerald-800 text-amber-300 border border-amber-400/40 flex items-center gap-0.5 transition-colors cursor-pointer"
                    title="Return to your auto-detected home region"
                  >
                    <MapPin className="w-2.5 h-2.5 text-amber-400" />
                    {t('map_my_region_btn', 'My Region')}
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          {/* Demand in India Badge */}
          <div className="flex items-center gap-1 shrink-0">
            <span className={`text-[8px] sm:text-[8.5px] px-1.5 py-0.5 rounded-full font-bold flex items-center gap-0.5 ${
              displayHub.demandScore >= 92 
                ? 'bg-rose-950/90 text-rose-300 border border-rose-500/50' 
                : 'bg-amber-950/90 text-amber-300 border border-amber-500/50'
            }`}>
              <Flame className="w-2.5 h-2.5 text-rose-400 animate-pulse" />
              <span>{displayHub.demand}</span>
              <span className="font-mono text-emerald-300">{displayHub.demandGrowth}</span>
            </span>
          </div>
        </div>

        {/* Middle Line: Major Crop Produced & Mandi Rate */}
        <div className="grid grid-cols-12 gap-1.5 items-center">
          {/* Crops Produced */}
          <div className="col-span-8 min-w-0">
            <div className="text-[8px] text-slate-400 uppercase font-semibold tracking-wider">
              {t('map_crops_produced', 'Crops Produced')}
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-amber-300 truncate">
              {displayHub.crop}
            </div>
            <div className="text-[9px] text-emerald-300/90 truncate flex items-center gap-1 mt-0.2">
              <TrendingUp className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
              <span className="truncate">{displayHub.demandReason}</span>
            </div>
          </div>

          {/* Mandi Rate vs MSP */}
          <div className="col-span-4 text-right shrink-0">
            <div className="text-[8px] text-slate-400 uppercase font-semibold tracking-wider">
              {t('map_mandi_rate', 'Mandi Rate')}
            </div>
            <div className="text-xs sm:text-[13px] font-extrabold text-emerald-300 font-mono">
              {displayHub.rate}
            </div>
            <div className="text-[8.5px] text-slate-400 font-mono">
              MSP: {displayHub.msp}
            </div>
          </div>
        </div>

        {/* Bottom Demand Intensity Progress Bar */}
        <div className="mt-1 pt-1 border-t border-emerald-900/40 flex items-center justify-between gap-2 text-[8.5px] text-slate-400 font-mono">
          <span className="flex items-center gap-1 text-slate-300">
            <span>{t('map_national_index', 'National Demand Index:')}</span>
            <strong className="text-amber-400 font-mono">{displayHub.demandScore}/100</strong>
          </span>
          <div className="w-20 sm:w-28 h-1 bg-emerald-950 rounded-full overflow-hidden border border-emerald-800/40">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                displayHub.demandScore >= 92 
                  ? 'bg-gradient-to-r from-amber-400 to-rose-500' 
                  : 'bg-gradient-to-r from-emerald-400 to-amber-400'
              }`}
              style={{ width: `${displayHub.demandScore}%` }}
            />
          </div>
        </div>

      </div>

      {/* Bottom Coordinates & Accuracy HUD - Compact Single-Line */}
      <div className="relative z-10 mt-1 flex flex-wrap items-center justify-center gap-1.5 text-[8px] sm:text-[8.5px] text-slate-300 font-mono px-1 text-center">
        <span className="flex items-center gap-0.5 text-emerald-300">
          <ShieldCheck className="w-2.5 h-2.5 text-emerald-400 shrink-0" /> {t('map_survey_official', 'Official Survey of India Map')}
        </span>
        <span className="text-slate-600 hidden xs:inline">•</span>
        <span className="text-slate-400 hidden md:inline">LAT 8.4°N – 37.6°N · LON 68.7°E – 97.4°E</span>
        <span className="text-slate-600 hidden md:inline">•</span>
        <span className="text-amber-400">{t('map_mainland_28_states', 'Mainland India · 28 States & UTs')}</span>
      </div>

    </div>
  );
}
