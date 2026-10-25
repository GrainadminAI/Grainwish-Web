import React, { useState, lazy, Suspense } from 'react';
import { Sun, Radio, ShieldCheck, Eye, EyeOff, Activity, Wifi, Layers, Droplets } from 'lucide-react';

const ThreeFarmCanvas = lazy(() => import('./ThreeFarmCanvas'));

export default function WebsiteBackground() {
  const [showTechHUD, setShowTechHUD] = useState(true);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[#021109]">
      
      {/* Cinematic Gliding Wrapper: Creates slow forward camera glide above crops with subtle depth and parallax */}
      <div className="absolute inset-0 w-full h-full animate-camera-glide pointer-events-none">
        
        {/* Layer 1: Farm Video Background with living crops, gentle breeze, and natural movement */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/assets/grainwish-background.png"
          className="farm-video absolute inset-0 w-full h-full object-cover object-center opacity-75 filter brightness-105 contrast-115 saturate-125 transform-gpu transition-opacity duration-1000"
        >
          <source src="/assets/Sustainable_farm_sunset.mp4" type="video/mp4" />
          <source src="/assets/flow_farm_background.mp4" type="video/mp4" />
          <source src="/assets/real_crops_field.mp4" type="video/mp4" />
          <source src="/assets/real_wheat_field.webm" type="video/webm" />
        </video>

        {/* Layer 2: Exact Uploaded Starting Frame Image Blend (Lush Indian fields, golden sunrise, distant mountains) */}
        <img
          src="/assets/grainwish-background.png"
          alt="GrainWish AI Agricultural Landscape - Lush Indian Fields, Golden Sunrise, Drone, and Digital Globe"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-85 mix-blend-screen filter brightness-105 contrast-110 saturate-120 pointer-events-none"
        />

        {/* Layer 3: Drifting Precision Field Grid & Floating Ambient Agro-Particles */}
        <div className="farm-grid animate-grid-pulse" aria-hidden="true" />
        <div className="farm-particles" aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => (
            <span
              key={i}
              style={{
                "--i": i,
                "--x": `${(i * 37 + 7) % 100}%`,
                "--y": `${(i * 23 + 11) % 100}%`,
              }}
            />
          ))}
        </div>

        {/* Layer 4: Interactive 3D WebGL Canvas (Wind-Swaying Crops, Procedural Furrows, Volumetric Solar Rays & Sparkles) */}
        <div className="absolute inset-0 opacity-70 pointer-events-none">
          <Suspense fallback={null}>
            <ThreeFarmCanvas />
          </Suspense>
        </div>

        {/* Layer 5: High-Tech Photorealistic 3D Overlays (Digital Globe, Drone Laser Scan, Precision Sensor Rings, Golden Sunrise) */}
        {showTechHUD && (
          <div className="absolute inset-0 pointer-events-none">

            {/* Effect 1: Golden Sunrise Atmospheric Bloom on Right Horizon */}
            <div className="absolute top-[38%] right-[4%] pointer-events-none flex items-center justify-center">
              <div className="w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-gradient-to-r from-amber-400/40 via-yellow-300/30 to-amber-500/20 blur-3xl animate-sun-bloom" />
              <div className="absolute w-24 h-24 rounded-full bg-yellow-200/50 blur-xl animate-sun-bloom" />
            </div>

            {/* Effect 2: Rotating Digital Wireframe Globe Highlighting India in Sky */}
            <div className="absolute top-[4%] right-[14%] sm:right-[18%] w-56 sm:w-80 h-56 sm:h-80 pointer-events-none opacity-85">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Rotating Globe Outer Rings */}
                <div className="absolute inset-0 rounded-full border border-emerald-400/30 animate-globe-rotate" />
                <div className="absolute inset-4 rounded-full border border-dashed border-emerald-300/40 animate-globe-rotate" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
                
                {/* Globe Longitude & Latitude Wireframe Arcs */}
                <svg className="absolute inset-0 w-full h-full animate-globe-rotate opacity-75" viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="95" stroke="#80f0ac" strokeWidth="0.8" strokeOpacity="0.4" />
                  <ellipse cx="100" cy="100" rx="95" ry="45" stroke="#80f0ac" strokeWidth="0.7" strokeOpacity="0.35" />
                  <ellipse cx="100" cy="100" rx="95" ry="18" stroke="#80f0ac" strokeWidth="0.7" strokeOpacity="0.3" />
                  <ellipse cx="100" cy="100" rx="45" ry="95" stroke="#80f0ac" strokeWidth="0.7" strokeOpacity="0.35" />
                  <ellipse cx="100" cy="100" rx="18" ry="95" stroke="#80f0ac" strokeWidth="0.7" strokeOpacity="0.3" />
                  {/* Constellation Data Nodes */}
                  <circle cx="100" cy="85" r="2.5" fill="#ffe17a" className="animate-ping" />
                  <circle cx="120" cy="70" r="1.5" fill="#80f0ac" />
                  <circle cx="85" cy="115" r="1.5" fill="#80f0ac" />
                  <circle cx="130" cy="120" r="2" fill="#ffe17a" />
                  <circle cx="65" cy="90" r="1.5" fill="#80f0ac" />
                </svg>

                {/* India Map Holographic Highlight at Core */}
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-emerald-300 drop-shadow-[0_0_8px_#80f0ac]">
                    INDIA · 28 STATES
                  </span>
                  <span className="text-[8px] font-mono text-amber-300 opacity-90">
                    PRECISION AGRI-NET ACTIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Effect 3: Agricultural Drone Scanning Crops with Soft Green Laser Lines */}
            <div className="absolute top-[34%] right-[20%] sm:right-[24%] pointer-events-none animate-drone-float">
              <div className="relative flex flex-col items-center">
                
                {/* Soft Green Laser Scan Beams Cascading to Crops */}
                <div
                  className="w-32 sm:w-44 h-36 sm:h-52 bg-gradient-to-b from-emerald-400/50 via-emerald-300/20 to-transparent blur-[0.5px] pointer-events-none animate-laser-scan"
                  style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                />
                
                {/* Laser Scanning Line Sweeping Over Crops */}
                <div className="absolute bottom-2 w-36 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent blur-[1px] animate-pulse" />

                {/* Drone Body & Spinning Propellers */}
                <div className="absolute top-0 -translate-y-2 flex items-center justify-center">
                  <div className="relative w-11 sm:w-14 h-3.5 sm:h-4 bg-slate-900 border border-emerald-400/80 rounded-md shadow-lg shadow-emerald-500/40 flex items-center justify-between px-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  </div>
                  {/* Propellers blur */}
                  <div className="absolute -left-2.5 w-5 h-0.5 bg-emerald-300/80 rounded-full animate-spin" />
                  <div className="absolute -right-2.5 w-5 h-0.5 bg-emerald-300/80 rounded-full animate-spin" />
                </div>

                {/* Drone Telemetry Badge */}
                <div className="hidden lg:flex items-center gap-1 mt-1 px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-500/60 text-[9px] font-mono text-emerald-300 shadow-md">
                  <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
                  <span>AI DRONE #01 · 4K CANOPY SCAN</span>
                </div>
              </div>
            </div>

            {/* Effect 4: Green Crop-Health & Irrigation Sensor Rings Pulsing Above Farmland */}
            
            {/* Sensor 1: Crop Health (Leaf Icon) */}
            <div className="absolute top-[59%] right-[32%] sm:right-[34%] pointer-events-none flex items-center justify-center">
              <div className="absolute w-16 sm:w-20 h-16 sm:h-20 rounded-full border border-emerald-400/75 animate-scan-ring animate-sensor-ripple" />
              <div className="absolute w-16 sm:w-20 h-16 sm:h-20 rounded-full border border-emerald-300/45 animate-scan-ring animate-sensor-ripple" style={{ animationDelay: '1.2s' }} />
              <div className="relative w-7 h-7 rounded-full bg-emerald-950/90 border border-emerald-400 shadow-[0_0_12px_#80f0ac] flex items-center justify-center">
                <span className="text-[12px]">🌿</span>
              </div>
              <div className="absolute top-8 hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-black/75 border border-emerald-500/50 text-[8px] font-mono text-emerald-300 whitespace-nowrap shadow-md">
                CROP HEALTH: 98%
              </div>
            </div>

            {/* Sensor 2: Irrigation & Moisture (Droplet Icon) */}
            <div className="absolute top-[62%] right-[12%] sm:right-[14%] pointer-events-none flex items-center justify-center">
              <div className="absolute w-16 sm:w-20 h-16 sm:h-20 rounded-full border border-cyan-400/75 animate-sensor-ripple" style={{ animationDelay: '0.6s' }} />
              <div className="absolute w-16 sm:w-20 h-16 sm:h-20 rounded-full border border-cyan-300/45 animate-sensor-ripple" style={{ animationDelay: '1.8s' }} />
              <div className="relative w-7 h-7 rounded-full bg-[#022421]/90 border border-cyan-400 shadow-[0_0_12px_#38bdf8] flex items-center justify-center">
                <Droplets className="w-3.5 h-3.5 text-cyan-300" />
              </div>
              <div className="absolute top-8 hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-black/75 border border-cyan-500/50 text-[8px] font-mono text-cyan-300 whitespace-nowrap shadow-md">
                IRRIGATION: OPTIMAL
              </div>
            </div>

            {/* Sensor 3: Solar & Photosynthesis (Sun/Energy Icon) */}
            <div className="absolute top-[56%] right-[5%] sm:right-[6%] pointer-events-none flex items-center justify-center">
              <div className="absolute w-16 sm:w-20 h-16 sm:h-20 rounded-full border border-amber-400/75 animate-sensor-ripple" style={{ animationDelay: '1s' }} />
              <div className="relative w-7 h-7 rounded-full bg-[#241a02]/90 border border-amber-400 shadow-[0_0_12px_#fbbf24] flex items-center justify-center">
                <Sun className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
              </div>
              <div className="absolute top-8 hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-black/75 border border-amber-500/50 text-[8px] font-mono text-amber-300 whitespace-nowrap shadow-md">
                SUN FLUX: 1,180 W/m²
              </div>
            </div>

            {/* Sensor 4: Soil NPK & Micro-Climate Vector Link */}
            <div className="absolute top-[76%] right-[40%] sm:right-[42%] hidden md:flex items-center gap-1.5 pointer-events-none">
              <div className="relative flex items-center justify-center">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-sensor-pulse" />
                <span className="absolute w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/75 border border-emerald-500/50 backdrop-blur-md text-[8.5px] font-mono text-emerald-300 shadow-md">
                <Layers className="w-2.5 h-2.5 text-emerald-400" />
                <span>NPK [48:24:32] · SOIL pH 6.8</span>
              </div>
            </div>

            {/* Effect 5: Farmers Cooperative Harvest Badge */}
            <div className="absolute bottom-20 left-4 sm:left-12 hidden xl:flex items-center gap-2 p-1.5 px-3 rounded-xl bg-black/65 border border-emerald-500/40 backdrop-blur-md shadow-xl text-[10px] font-mono text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-bold">INDIAN FARMERS COOPERATIVE HARVEST</span>
              <span className="text-amber-300 font-bold">· CROP YIELD +38%</span>
            </div>

          </div>
        )}

      </div>

      {/* Layer 6: Premium Dark Left Gradient Overlay (Preserves 100% legibility of headlines on the left while showcasing bright farmland on the right) */}
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
