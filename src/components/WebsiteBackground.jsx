import React, { useState, lazy, Suspense } from 'react';
import { Sun, Radio, Disc3, ShieldCheck, Cpu, Eye, EyeOff, Activity, Wifi, Layers } from 'lucide-react';

const ThreeFarmCanvas = lazy(() => import('./ThreeFarmCanvas'));

export default function WebsiteBackground() {
  const [showTechHUD, setShowTechHUD] = useState(true);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[#021109]">
      
      {/* Layer 1: Farm Video Background with gently moving crops, sunlight, and Indian farmers */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/assets/grainwish-background.png"
        className="farm-video absolute inset-0 w-full h-full object-cover object-center opacity-70 filter brightness-105 contrast-115 saturate-125 transform-gpu transition-opacity duration-1000"
      >
        <source src="/assets/Sustainable_farm_sunset.mp4" type="video/mp4" />
        <source src="/assets/flow_farm_background.mp4" type="video/mp4" />
        <source src="/assets/real_crops_field.mp4" type="video/mp4" />
        <source src="/assets/real_wheat_field.webm" type="video/webm" />
      </video>

      {/* Layer 2: Photorealistic Generated Smart Field Background Blend */}
      <img
        src="/assets/grainwish-background.png"
        alt="GrainWish AI Agricultural Landscape with Indian Farmers, Moving Crops and Drone"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-35 mix-blend-screen filter brightness-110 contrast-120 saturate-125 pointer-events-none"
      />

      {/* Layer 3: Interactive 3D WebGL Canvas (Wind-Swaying Crops, Procedural Furrows, Volumetric Solar Rays & Sparkles) */}
      <div className="absolute inset-0 opacity-80 pointer-events-none">
        <Suspense fallback={null}>
          <ThreeFarmCanvas />
        </Suspense>
      </div>

      {/* Layer 4: AI Technology Effects (Field Grid, Crop-Scanning Rings, Glowing Sensor Points, Drone, Sun Energy) */}
      {showTechHUD && (
        <div className="absolute inset-0 pointer-events-none">

          {/* AI Effect 1: Connected Field-Grid Animation across farmland */}
          <div className="absolute bottom-0 left-0 right-0 h-[48%] overflow-hidden opacity-35 pointer-events-none">
            <svg
              className="w-full h-full animate-grid-pulse"
              viewBox="0 0 1200 500"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Perspective Furrow Grid Lines */}
              <defs>
                <linearGradient id="gridGradGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#6df0b1" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#ffe17a" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#80f0ac" stopOpacity="0" />
                  <stop offset="50%" stopColor="#ffe17a" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#80f0ac" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Horizontal Field Scanlines */}
              <line x1="0" y1="120" x2="1200" y2="120" stroke="url(#gridGradGreen)" strokeWidth="1" strokeDasharray="6 6" />
              <line x1="0" y1="200" x2="1200" y2="200" stroke="url(#gridGradGreen)" strokeWidth="1.2" strokeDasharray="8 6" />
              <line x1="0" y1="300" x2="1200" y2="300" stroke="url(#gridGradGreen)" strokeWidth="1.5" />
              <line x1="0" y1="420" x2="1200" y2="420" stroke="url(#gridGradGreen)" strokeWidth="2" />

              {/* Perspective Furrow Convergence Rays towards vanishing horizon */}
              <line x1="200" y1="500" x2="520" y2="80" stroke="url(#gridGradGreen)" strokeWidth="1.2" />
              <line x1="420" y1="500" x2="580" y2="80" stroke="url(#gridGradGreen)" strokeWidth="1.2" />
              <line x1="680" y1="500" x2="650" y2="80" stroke="url(#gridGradGreen)" strokeWidth="1.2" />
              <line x1="940" y1="500" x2="720" y2="80" stroke="url(#gridGradGreen)" strokeWidth="1.2" />
              <line x1="1160" y1="500" x2="800" y2="80" stroke="url(#gridGradGreen)" strokeWidth="1.2" />

              {/* Connected Telemetry Vector Links between field sectors */}
              <path
                d="M 680 340 L 820 270 L 980 320 L 1090 220"
                stroke="url(#beamGrad)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <circle cx="680" cy="340" r="4" fill="#80f0ac" />
              <circle cx="820" cy="270" r="4" fill="#ffe17a" />
              <circle cx="980" cy="320" r="4" fill="#80f0ac" />
              <circle cx="1090" cy="220" r="4" fill="#ffe17a" />
            </svg>
          </div>

          {/* AI Effect 2: Crop-Scanning Rings (Expanding sonar/radar pulses over the crops) */}
          <div className="absolute top-[42%] right-[18%] sm:right-[24%] pointer-events-none flex items-center justify-center">
            {/* Concentric Pulsing Rings */}
            <div className="absolute w-24 h-24 rounded-full border border-emerald-400/80 animate-scan-ring" />
            <div className="absolute w-24 h-24 rounded-full border border-amber-300/60 animate-scan-ring" style={{ animationDelay: '1.1s' }} />
            <div className="absolute w-24 h-24 rounded-full border border-cyan-400/50 animate-scan-ring" style={{ animationDelay: '2.2s' }} />
            
            {/* Core Reticle */}
            <div className="relative w-4 h-4 rounded-full bg-emerald-400/80 shadow-lg shadow-emerald-400/80 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </div>
            
            {/* Crop Canopy Scan Telemetry Tag */}
            <div className="absolute top-6 left-6 hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/75 border border-emerald-400/60 text-[9px] font-mono text-emerald-300 backdrop-blur-md shadow-md">
              <Activity className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
              <span>AI SCAN RADAR · CANOPY VIGOR 96%</span>
            </div>
          </div>

          {/* AI Effect 3: Subtle Glowing Sensor Points with Live Agronomic Telemetry */}
          {/* Sensor Node 1: Soil NPK & Moisture in Center-Right Field */}
          <div className="absolute top-[62%] right-[32%] hidden md:flex items-center gap-2 pointer-events-none">
            <div className="relative flex items-center justify-center">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-sensor-pulse" />
              <span className="absolute w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/70 border border-emerald-500/50 backdrop-blur-md text-[9px] font-mono text-emerald-300 shadow-md">
              <Layers className="w-2.5 h-2.5 text-emerald-400" />
              <span>SOIL IOT #4 · NPK [48:24:32] · MOISTURE 64%</span>
            </div>
          </div>

          {/* Sensor Node 2: Leaf Temperature & Micro-Climate */}
          <div className="absolute top-[75%] right-[14%] hidden lg:flex items-center gap-2 pointer-events-none">
            <div className="relative flex items-center justify-center">
              <span className="w-3.5 h-3.5 rounded-full bg-amber-400 animate-sensor-pulse" style={{ animationDelay: '0.9s' }} />
              <span className="absolute w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/70 border border-amber-400/50 backdrop-blur-md text-[9px] font-mono text-amber-300 shadow-md">
              <Wifi className="w-2.5 h-2.5 text-amber-400" />
              <span>LEAF SENSOR · 27.8°C · TRANSPIRATION NOMINAL</span>
            </div>
          </div>

          {/* AI Effect 4: Radiant Golden Sun Giving Energy to Crops */}
          <div className="absolute top-2 left-6 sm:top-6 sm:left-16 pointer-events-none flex flex-col items-start">
            {/* Volumetric Sun Flare Glow */}
            <div className="relative w-36 sm:w-56 h-36 sm:h-56 rounded-full bg-amber-400/25 blur-3xl animate-sun-pulse" />
            
            {/* Radiating Photon Energy Streams Cascading to Crops */}
            <div className="absolute top-10 left-12 w-64 h-72 pointer-events-none overflow-hidden opacity-75">
              <div className="w-1.5 h-16 bg-gradient-to-b from-amber-300 via-yellow-200 to-transparent rounded-full blur-[1px] animate-photon-stream ml-4" />
              <div className="w-1 h-20 bg-gradient-to-b from-amber-400 via-amber-200 to-transparent rounded-full blur-[1px] animate-photon-stream ml-14" style={{ animationDelay: '0.8s' }} />
              <div className="w-2 h-14 bg-gradient-to-b from-yellow-300 via-emerald-300 to-transparent rounded-full blur-[1px] animate-photon-stream ml-28" style={{ animationDelay: '1.4s' }} />
            </div>

            {/* Sun Energy Telemetry HUD Badge */}
            <div className="absolute top-2 sm:top-4 left-2 sm:left-4 hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-amber-400/50 backdrop-blur-md shadow-lg text-[10px] font-mono text-amber-300">
              <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow shrink-0" />
              <span className="font-bold">SOLAR ENERGY FLUX: 1,180 W/m²</span>
              <span className="text-emerald-400 font-bold">· PHOTOSYNTHESIS OPTIMAL</span>
            </div>
          </div>

          {/* AI Effect 5: High-Tech Agricultural Drone Scanning Crops */}
          <div className="absolute top-1/4 right-[15%] sm:right-[26%] pointer-events-none animate-drone-float">
            <div className="relative flex flex-col items-center">
              {/* Drone Scanning Laser Cone Beaming Down with Green-to-Gold Gradient */}
              <div
                className="w-28 sm:w-36 h-32 sm:h-44 bg-gradient-to-b from-emerald-400/40 via-amber-300/20 to-transparent blur-[1px] pointer-events-none"
                style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
              />
              
              {/* Drone Body & Rotating Propellers */}
              <div className="absolute top-0 -translate-y-2 flex items-center justify-center">
                <div className="relative w-10 sm:w-12 h-3 sm:h-3.5 bg-slate-900 border border-emerald-400/70 rounded-md shadow-lg shadow-emerald-500/30 flex items-center justify-between px-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="w-1 h-1 rounded-full bg-red-400" />
                </div>
                {/* Propeller Blades Spinning Blur */}
                <div className="absolute -left-2 w-4 h-0.5 bg-emerald-300/80 rounded-full animate-spin" />
                <div className="absolute -right-2 w-4 h-0.5 bg-emerald-300/80 rounded-full animate-spin" />
              </div>

              {/* Drone Telemetry HUD Label */}
              <div className="hidden lg:flex items-center gap-1 mt-1 px-2 py-0.5 rounded bg-emerald-950/85 border border-emerald-500/60 text-[9px] font-mono text-emerald-300 shadow-md">
                <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
                <span>AI DRONE #01 · 4K NDVI CANOPY SCAN</span>
              </div>
            </div>
          </div>

          {/* AI Effect 6: Autonomous Smart Tractor Moving Along Field Furrows */}
          <div className="absolute top-[48%] sm:top-[50%] right-[6%] sm:right-[12%] pointer-events-none animate-tractor-move">
            <div className="relative flex flex-col items-center">
              {/* Forward Furrow Guide Lasers */}
              <div className="w-24 sm:w-36 h-0.5 bg-gradient-to-r from-emerald-400/80 via-amber-400/60 to-transparent mb-1" />
              
              {/* Smart Tractor Telemetry Tag */}
              <div className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#031d10]/90 border border-amber-500/50 text-[9px] font-mono text-amber-300 shadow-md">
                <Disc3 className="w-2.5 h-2.5 text-amber-400 animate-spin" />
                <span>AUTO-STEER TRACTOR · RTK-GPS · FURROW ROW 18</span>
              </div>
            </div>
          </div>

          {/* AI Effect 7: High-Altitude ISRO AgriSat Orbiting Satellite */}
          <div className="absolute top-4 sm:top-8 right-6 sm:right-16 pointer-events-none animate-satellite-orbit">
            <div className="relative flex flex-col items-center">
              {/* Satellite Multispectral Field Scan Cone */}
              <div
                className="w-20 sm:w-28 h-44 sm:h-64 bg-gradient-to-b from-cyan-400/30 via-emerald-400/10 to-transparent pointer-events-none blur-[1px]"
                style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
              />
              
              {/* Satellite Body & Solar Arrays */}
              <div className="absolute top-0 -translate-y-2 flex items-center gap-0.5">
                <div className="w-3.5 sm:w-5 h-2 sm:h-2.5 bg-cyan-700 border border-cyan-300/80 rounded-xs shadow-sm shadow-cyan-400/50" />
                <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-slate-200 border border-white rounded-full flex items-center justify-center shadow-md">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
                </div>
                <div className="w-3.5 sm:w-5 h-2 sm:h-2.5 bg-cyan-700 border border-cyan-300/80 rounded-xs shadow-sm shadow-cyan-400/50" />
              </div>

              {/* Satellite Telemetry HUD Label */}
              <div className="hidden lg:flex items-center gap-1 mt-1 px-2 py-0.5 rounded bg-[#011422]/90 border border-cyan-400/60 text-[9px] font-mono text-cyan-300 shadow-md">
                <Cpu className="w-2.5 h-2.5 text-cyan-300 animate-pulse" />
                <span>ISRO AGRISAT · MULTISPECTRAL FIELD SCAN</span>
              </div>
            </div>
          </div>

          {/* AI Effect 8: 2 Indian Farmers Cooperative Harvest Badge */}
          <div className="absolute bottom-20 left-4 sm:left-12 hidden xl:flex items-center gap-2 p-1.5 px-3 rounded-xl bg-black/60 border border-emerald-500/40 backdrop-blur-md shadow-xl text-[10px] font-mono text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-bold">INDIAN FARMERS COOPERATIVE HARVEST</span>
            <span className="text-amber-300 font-bold">· CROP YIELD +38%</span>
          </div>

        </div>
      )}

      {/* Layer 5: Premium Dark Left Gradient Overlay (Ensures 100% legibility of headlines on the left while showcasing bright farmland on the right) */}
      <div className="farm-overlay pointer-events-none" />

      {/* Futuristic Green-and-Gold Ambient Glow Orb */}
      <div className="farm-glow" aria-hidden="true" />

      {/* Subtle Bottom Floating Interactive Toggle Button for Background HUD */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-auto">
        <button
          onClick={() => setShowTechHUD(prev => !prev)}
          className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#031d10]/85 hover:bg-emerald-950 border border-emerald-500/40 hover:border-emerald-400/80 text-[10px] font-mono text-emerald-300/90 hover:text-emerald-200 backdrop-blur-md shadow-lg transition-all"
          title="Toggle 3D Smart AgriTech Telemetry Overlays"
        >
          {showTechHUD ? (
            <>
              <Eye className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">3D VIDEO & TECH RADAR: ON</span>
              <span className="sm:hidden">3D RADAR</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3 h-3 text-slate-400" />
              <span className="hidden sm:inline">3D VIDEO: CINEMATIC</span>
              <span className="sm:hidden">CINEMATIC</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
