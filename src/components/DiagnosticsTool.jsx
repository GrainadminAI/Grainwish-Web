import React, { useState } from 'react';
import { Camera, Sparkles, CheckCircle2, AlertTriangle, RefreshCw, Upload, ShieldAlert, Pill, Calendar, ArrowRight, Database } from 'lucide-react';
import { saveDiagnosticScanToDB, recordFeatureUsageToDB, isSupabaseConfigured } from '../lib/supabase';

const CROP_SAMPLES = [
  {
    id: 'wheat-rust',
    crop: 'Wheat',
    disease: 'Yellow Rust (Puccinia striiformis)',
    location: 'Nashik, Maharashtra',
    confidence: '98.7%',
    severity: 'High (Requires Immediate Isolation)',
    symptoms: 'Yellowish-orange pustules arranged in linear stripes on leaf surfaces.',
    causes: 'Cool temperature (10-15°C) with high humidity & morning dew.',
    treatment: 'Apply Propiconazole 25% EC @ 1ml/L water immediately. Repeat after 14 days if wet weather persists.',
    organicAlternative: 'Spray Neem oil extract (10,000 ppm) @ 3ml/L water as preventative measure.',
    yieldProtected: '~35% Estimated Loss Avoided',
    image: '/assets/hand_phone_crop.jpeg',
    videoUrl: 'https://labs.google/fx/api/og-video/shared/ec9838d9-3d0d-4966-b815-e8ecd4c41d3e',
    shareUrl: 'https://labs.google/fx/tools/flow/shared/video/ec9838d9-3d0d-4966-b815-e8ecd4c41d3e'
  },
  {
    id: 'paddy-spot',
    crop: 'Paddy / Rice',
    disease: 'Brown Spot & Nitrogen Burn',
    location: 'Warangal, Telangana',
    confidence: '97.4%',
    severity: 'Moderate (Soil Nutrient Imbalance)',
    symptoms: 'Circular to oval dark brown spots on leaves with yellow halos & scorched tip margins.',
    causes: 'Excessive Urea application combined with Potassium & Zinc deficiency.',
    treatment: 'Rebalance NPK ratio. Reduce urea dose by 30%, apply Potassium (MOP) @ 25kg/acre + Zinc Sulphate @ 10kg/acre.',
    organicAlternative: 'Incorporate bio-fertilizers (Azospirillum & PSB) into soil split-dosing.',
    yieldProtected: '18% Lower Fertilizer Cost',
    image: '/assets/tablet_wheat_field.jpeg',
    videoUrl: 'https://labs.google/fx/api/og-video/shared/a256b2ce-a1a6-4dd2-91b6-46aad4039a43',
    shareUrl: 'https://labs.google/fx/tools/flow/shared/video/a256b2ce-a1a6-4dd2-91b6-46aad4039a43'
  },
  {
    id: 'cotton-bollworm',
    crop: 'Cotton',
    disease: 'Pink Bollworm Early Infestation',
    location: 'Bathinda, Punjab',
    confidence: '99.1%',
    severity: 'Critical (Early Stage Window)',
    symptoms: 'Rosetted flowers and small pin-hole punctures in young cotton bolls.',
    causes: 'Late season high temperature & pest migration from neighboring fields.',
    treatment: 'Deploy Pheromone Traps (5 traps/acre). Spray Chlorantraniliprole 18.5% SC @ 60ml/acre.',
    organicAlternative: 'Release Trichogramma chilonis egg parasitoids @ 50,000/acre.',
    yieldProtected: '₹1,900 More per Quintal',
    image: '/assets/farmer_hologram.jpeg',
    videoUrl: 'https://labs.google/fx/api/og-video/shared/492a8d54-34c1-411f-886f-604ed1bacc5c',
    shareUrl: 'https://labs.google/fx/tools/flow/shared/video/492a8d54-34c1-411f-886f-604ed1bacc5c'
  },
  {
    id: 'turmeric-rot',
    crop: 'Turmeric',
    disease: 'Rhizome Rot & Leaf Blotch',
    location: 'Erode, Tamil Nadu',
    confidence: '96.9%',
    severity: 'Moderate to High',
    symptoms: 'Water-soaked lesions at collar region, leaf yellowing starting from bottom margins.',
    causes: 'Waterlogging during early monsoon & soil fungal infection.',
    treatment: 'Drench soil with Metalaxyl 8% + Mancozeb 64% WP @ 2g/L water around plant base.',
    organicAlternative: 'Apply Trichoderma viride enriched farmyard manure @ 2.5kg/plant.',
    yieldProtected: '22% Higher Marketable Yield',
    image: '/assets/farmer_harvest.jpeg',
    videoUrl: 'https://labs.google/fx/api/og-video/shared/a48ee33c-5793-40f1-834f-172962539955',
    shareUrl: 'https://labs.google/fx/tools/flow/shared/video/a48ee33c-5793-40f1-834f-172962539955'
  }
];

export default function DiagnosticsTool() {
  const [selectedCrop, setSelectedCrop] = useState(CROP_SAMPLES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(true);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleRunScan = (cropSample) => {
    const target = cropSample || selectedCrop;
    setSelectedCrop(target);
    setIsScanning(true);
    setScanComplete(false);
    setTimeout(async () => {
      setIsScanning(false);
      setScanComplete(true);
      await saveDiagnosticScanToDB(target);
      await recordFeatureUsageToDB({
        featureName: 'AI Diagnostics Tool',
        action: 'scan_crop',
        metadata: { crop: target.crop, disease: target.disease, confidence: target.confidence }
      });
    }, 2000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      handleRunScan({
        id: 'custom-scan',
        crop: 'Custom Uploaded Crop',
        disease: 'Early Leaf Rust Detection',
        location: 'Your Field Location',
        confidence: '99.2%',
        severity: 'Moderate (Early Stage)',
        symptoms: 'Custom scanned leaf shows initial necrotic spots on upper blade.',
        causes: 'Micro-fungal spore germination under humid conditions.',
        treatment: 'Apply targeted bio-fungicide spray & monitor soil moisture.',
        organicAlternative: 'Neem-based organic spray @ 5ml/L water.',
        yieldProtected: 'High Yield Preserved',
        image: url
      });
    }
  };

  return (
    <section id="diagnostics" className="py-24 bg-[#02180d] relative overflow-hidden border-b border-emerald-900/40">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-xs font-semibold text-emerald-300">
            <Camera className="w-3.5 h-3.5 text-amber-400" /> Interactive AI Diagnostic Scanner
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Camera-Based <span className="gradient-text-agri">AI Diagnostics</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Identify crop diseases instantly by pointing your phone at the affected leaf or stem. Try our live simulation below with sample crops or upload your own photo!
          </p>
        </div>

        {/* Sample Crop Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {CROP_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleRunScan(sample)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                selectedCrop.id === sample.id
                  ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-600/30 scale-105'
                  : 'bg-[#042114] border-emerald-800/60 text-slate-300 hover:border-emerald-600 hover:text-white'
              }`}
            >
              <span>{sample.crop}</span>
              <span className="text-[10px] opacity-75 font-normal">({sample.location.split(',')[0]})</span>
            </button>
          ))}

          <label className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 cursor-pointer transition-all flex items-center gap-2">
            <Upload className="w-3.5 h-3.5" /> Upload Custom Leaf Image
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {/* Scanner Work Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Phone & Scanner Frame */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md bg-[#031d10] border-2 border-emerald-500/40 rounded-3xl p-4 shadow-2xl overflow-hidden group">
              
              {/* Top Scanner HUD */}
              <div className="flex items-center justify-between px-3 py-2 bg-emerald-950/90 rounded-xl mb-3 border border-emerald-800/50 text-xs">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isScanning ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                  <span className="font-semibold text-emerald-200">
                    {isScanning ? 'AI Neural Network Analyzing...' : 'Scan Ready · Point Phone Camera'}
                  </span>
                </div>
                <span className="text-[10px] text-amber-400 font-mono">Grainwish.com</span>
              </div>

              {/* Viewfinder Image/Video Box */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-emerald-500/30 bg-black">
                {uploadedImage ? (
                  <img
                    src={uploadedImage}
                    alt={selectedCrop.crop}
                    className="w-full h-full object-cover"
                  />
                ) : selectedCrop.videoUrl ? (
                  <video
                    key={selectedCrop.id}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    src={selectedCrop.videoUrl}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextElementSibling) {
                        e.target.nextElementSibling.style.display = 'block';
                      }
                    }}
                  />
                ) : null}

                <img
                  src={selectedCrop.image}
                  alt={selectedCrop.crop}
                  className="w-full h-full object-cover"
                  style={{ display: !uploadedImage && selectedCrop.videoUrl ? 'none' : 'block' }}
                />

                {/* Interactive Scan Laser Line */}
                {isScanning && (
                  <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none">
                    <div className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_20px_#f59e0b] animate-scan" />
                  </div>
                )}

                {/* Bounding Box Box Overlay when Complete */}
                {scanComplete && !isScanning && (
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-dashed border-amber-400 rounded-xl animate-pulse flex flex-col justify-between p-2 pointer-events-none bg-amber-500/10">
                    <div className="text-[10px] font-bold bg-amber-400 text-black px-1.5 py-0.5 rounded w-max">
                      {selectedCrop.disease.split('(')[0]}
                    </div>
                    <div className="text-[10px] font-mono text-amber-300 self-end bg-black/80 px-1 rounded">
                      Match: {selectedCrop.confidence}
                    </div>
                  </div>
                )}

                {/* Re-Scan Action Overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <button
                    onClick={() => handleRunScan()}
                    disabled={isScanning}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                    {isScanning ? 'Analyzing Leaf...' : 'Re-Scan Leaf'}
                  </button>
                  {selectedCrop.shareUrl ? (
                    <a
                      href={selectedCrop.shareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-amber-300 hover:text-amber-200 bg-black/80 hover:bg-black/95 px-2.5 py-1 rounded-lg border border-amber-500/40 backdrop-blur transition-all flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-amber-400" /> Google Flow Video
                    </a>
                  ) : (
                    <span className="text-[10px] text-slate-300 bg-black/70 px-2 py-1 rounded backdrop-blur">
                      22 Languages AI Voice Ready
                    </span>
                  )}
                </div>

              </div>

              {/* Quick Status Bar */}
              <div className="mt-3 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-xs flex items-center justify-between">
                <span className="text-slate-400">Target Crop: <strong className="text-white">{selectedCrop.crop}</strong></span>
                <span className="text-amber-400 font-mono font-semibold">{selectedCrop.yieldProtected}</span>
              </div>

            </div>
          </div>

          {/* Right Column: Instant AI Diagnostic Report */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Main Result Header Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#052b19] to-[#041d11] border border-emerald-500/40 shadow-xl space-y-4">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="text-xs font-semibold uppercase text-amber-400 tracking-wider">AI Diagnosis Confirmed</div>
                    <div className="text-lg font-extrabold text-white">{selectedCrop.disease}</div>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-mono text-sm font-extrabold rounded-lg border border-emerald-500/40">
                  {selectedCrop.confidence}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-emerald-800/40">
                <div className="bg-emerald-950/50 p-2.5 rounded-lg border border-emerald-900/60">
                  <div className="text-slate-400 font-medium">Severity Status</div>
                  <div className="text-amber-300 font-semibold">{selectedCrop.severity}</div>
                </div>
                <div className="bg-emerald-950/50 p-2.5 rounded-lg border border-emerald-900/60">
                  <div className="text-slate-400 font-medium">Yield Impact</div>
                  <div className="text-emerald-300 font-semibold">{selectedCrop.yieldProtected}</div>
                </div>
              </div>

            </div>

            {/* Symptoms & Causes Breakdown */}
            <div className="p-5 rounded-2xl bg-[#042013] border border-emerald-800/50 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Symptoms & Environmental Trigger
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                <strong className="text-amber-300">Observed:</strong> {selectedCrop.symptoms}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong className="text-slate-300">Root Cause:</strong> {selectedCrop.causes}
              </p>
            </div>

            {/* AI Treatment Plan */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-[#052617] to-emerald-950 border border-emerald-500/30 space-y-3">
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                <Pill className="w-4 h-4 text-emerald-400" /> Recommended Action & Remedy
              </h4>
              
              <div className="p-3 bg-emerald-900/30 rounded-xl border border-emerald-700/40 text-xs text-slate-200">
                <strong className="text-emerald-400 block mb-1">Standard Treatment Plan:</strong>
                {selectedCrop.treatment}
              </div>

              <div className="p-3 bg-amber-950/30 rounded-xl border border-amber-800/40 text-xs text-slate-300">
                <strong className="text-amber-300 block mb-1">Organic / Bio Alternative:</strong>
                {selectedCrop.organicAlternative}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
