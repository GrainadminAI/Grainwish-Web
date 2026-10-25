import React, { useState, lazy, Suspense } from 'react';
import { Sun, Radio, Disc3, ShieldCheck, Cpu, Eye, EyeOff } from 'lucide-react';

const ThreeFarmCanvas = lazy(() => import('./ThreeFarmCanvas'));

export default function WebsiteBackground() {
  const [showTechHUD, setShowTechHUD] = useState(true);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[#021109]">
      
      {/* Layer 1: 3D Real Video of Living Crops & Agricultural Field */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/assets/agri_smart_field_bg.jpg"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-65 filter brightness-105 contrast-115 saturate-125 transform-gpu transition-opacity duration-1000"
      >
        <source src="/assets/flow_farm_background.mp4" type="video/mp4" />
        <source src="/assets/real_crops_field.mp4" type="video/mp4" />
        <source src="/assets/Sustainable_farm_sunset.mp4" type="video/mp4" />
        <source src="/assets/real_wheat_field.webm" type="video/webm" />
      </video>

      {/* Layer 2: 3D Photorealistic Smart Field Poster Blend (2 Farmers Working Happily, Crops, Drone, Tractor, Satellite) */}
      <img
        src="/assets/agri_smart_field_bg.jpg"
        alt="3D Real Smart Agriculture Field with 2 Farmers, Crops, Flying Drone, Moving Tractor and Satellite"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-45 mix-blend-screen filter brightness-110 contrast-120 saturate-125 pointer-events-none"
      />

      {/* Layer 3: Interactive 3D WebGL Canvas (Wind-Swaying Crops, Procedural Furrows, Volumetric Solar Rays & Sparkles) */}
      <div className="absolute inset-0 opacity-80 pointer-events-none">
        <Suspense fallback={null}>
          <ThreeFarmCanvas />
        </Suspense>
      </div>

      {/* Layer 4: Interactive Smart Tech HUD Overlays (Sun Energy, Flying Drone, Moving Tractor, Orbiting Satellite) */}
      {showTechHUD && (
        <div className="absolute inset-0 pointer-events-none">
          
          {/* Feature 1: Radiant Golden Sun Giving Energy to the Fields */}
          <div className="absolute top-2 left-6 sm:top-6 sm:left-16 pointer-events-none flex flex-col items-start">
            {/* Volumetric Sun Flare Glow */}
            <div className="relative w-36 sm:w-56 h-36 sm:h-56 rounded-full bg-amber-400/20 blur-3xl animate-sun-pulse" />
            
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

          {/* Feature 2: High-Tech Flying Agricultural Drone Scanning Crops */}
          <div className="absolute top-1/4 right-[15%] sm:right-[26%] pointer-events-none animate-drone-float">
            <div className="relative flex flex-col items-center">
              {/* Drone Scanning Laser Cone Beaming Down */}
              <div className="w-28 sm:w-36 h-32 sm:h-44 bg-gradient-to-b from-emerald-400/35 via-cyan-400/15 to-transparent clip-path-cone blur-[1px] pointer-events-none"
                   style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
              
              {/* Drone Body & Rotating Propellers */}
              <div className="absolute top-0 -translate-y-2 flex items-center justify-center">
                <div className="relative w-10 sm:w-12 h-3 sm:h-3.5 bg-slate-900 border border-emerald-400/70 rounded-md shadow-lg shadow-emerald-500/30 flex items-center justify-between px-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span className="w-1 h-1 rounded-full bg-red-400" />
                </div>
                {/* Propeller Blades Spinning Blur */}
                <div className="absolute -left-2 w-4 h-0.5 bg-emerald-300/80 rounded-full animate-spin" />
                <div className="absolute -right-2 w-4 h-0.5 bg-emerald-300/80 rounded-full animate-spin" />
              </div>

              {/* Drone Telemetry HUD Label */}
              <div className="hidden lg:flex items-center gap-1 mt-1 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/60 text-[9px] font-mono text-emerald-300 shadow-md">
                <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
                <span>AI DRONE #01 · 4K NDVI CANOPY SCAN</span>
              </div>
            </div>
          </div>

          {/* Feature 3: Autonomous Smart Tractor Moving Along Field Furrows */}
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

          {/* Feature 4: High-Tech Satellite Checking the Field from Orbit */}
          <div className="absolute top-4 sm:top-8 right-6 sm:right-16 pointer-events-none animate-satellite-orbit">
            <div className="relative flex flex-col items-center">
              {/* Satellite High-Altitude Telemetry Scanning Cone */}
              <div className="w-20 sm:w-28 h-44 sm:h-64 bg-gradient-to-b from-cyan-400/30 via-emerald-400/10 to-transparent pointer-events-none blur-[1px]"
                   style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
              
              {/* Satellite Body & Solar Arrays */}
              <div className="absolute top-0 -translate-y-2 flex items-center gap-0.5">
                {/* Left Solar Panel */}
                <div className="w-3.5 sm:w-5 h-2 sm:h-2.5 bg-cyan-700 border border-cyan-300/80 rounded-xs shadow-sm shadow-cyan-400/50" />
                {/* Center Core */}
                <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-slate-200 border border-white rounded-full flex items-center justify-center shadow-md">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
                </div>
                {/* Right Solar Panel */}
                <div className="w-3.5 sm:w-5 h-2 sm:h-2.5 bg-cyan-700 border border-cyan-300/80 rounded-xs shadow-sm shadow-cyan-400/50" />
              </div>

              {/* Satellite Telemetry HUD Label */}
              <div className="hidden lg:flex items-center gap-1 mt-1 px-2 py-0.5 rounded bg-[#011422]/90 border border-cyan-400/60 text-[9px] font-mono text-cyan-300 shadow-md">
                <Cpu className="w-2.5 h-2.5 text-cyan-300 animate-pulse" />
                <span>ISRO AGRISAT · MULTISPECTRAL FIELD SCAN</span>
              </div>
            </div>
          </div>

          {/* Feature 5: 2 Farmers Working Happily Badge Indicator in Foreground */}
          <div className="absolute bottom-20 left-4 sm:left-12 hidden xl:flex items-center gap-2 p-1.5 px-3 rounded-xl bg-black/60 border border-emerald-500/40 backdrop-blur-md shadow-xl text-[10px] font-mono text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-bold">2 FARMERS COOPERATIVE HARVEST</span>
            <span className="text-amber-300 font-bold">· CROP YIELD +38%</span>
          </div>

        </div>
      )}

      {/* Layer 5: Cinematic Ambient Vignette & Contrast Balancers (Ensures 100% foreground legibility) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#021109]/75 via-[#02180d]/40 to-[#021109]/95 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#021109]/20 to-[#021109]/70 pointer-events-none" />

      {/* Subtle Floating Interactive Toggle Button for Background HUD (Pointer-events enabled on button only) */}
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
