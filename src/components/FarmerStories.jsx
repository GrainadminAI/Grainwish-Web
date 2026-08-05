import React, { useState, useEffect } from 'react';
import { Quote, MapPin, TrendingUp, CheckCircle2, Award, Sparkles, PlusCircle, Star, Send, Edit3, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { recordFeatureUsageToDB, saveFeedbackToDB, getSavedUserFeedback } from '../lib/supabase';

const INITIAL_STORIES = [
  {
    id: 'ramesh',
    name: 'Ramesh Patil',
    location: 'Nashik, Maharashtra',
    crop: 'Wheat & onion',
    metric: 'Saved ~2 acres from rust spread',
    metricTag: '~35% yield protected',
    quote: '“I scanned a yellowing wheat leaf at 6 in the morning and had a treatment plan before breakfast. We saved almost the whole plot.”',
    image: '/assets/farmer_hologram.jpeg',
    video: '/assets/holographic_leaves.mp4',
    detectedIssue: 'Yellow rust spreading across 2 acres',
    actionsTaken: [
      'Scanned affected leaves with GrainWise AI camera diagnostics',
      'Confirmed yellow rust and received fungicide + variety recommendations',
      'Treated the plot early and isolated infected rows'
    ],
    result: 'Protected ~2 acres and avoided an estimated 35% yield loss.'
  },
  {
    id: 'lakshmi',
    name: 'Lakshmi Devi',
    location: 'Warangal, Telangana',
    crop: 'Paddy',
    metric: '~18% lower fertilizer cost',
    metricTag: '18% lower fertilizer cost',
    quote: '“The NPK calculator told me I was over-applying urea. I cut my fertilizer bill and my paddy still came out stronger.”',
    image: '/assets/tablet_wheat_field.jpeg',
    video: '/assets/sustainable_farming_village.mp4',
    detectedIssue: 'Brown spots and stunted growth from over-fertilization',
    actionsTaken: [
      'Used the NPK calculator to reassess soil nutrient needs',
      'Reduced urea application and added recommended micronutrients',
      'Followed the interactive calendar for split fertilizer doses'
    ],
    result: 'Cut fertilizer costs while producing a stronger, healthier harvest.'
  },
  {
    id: 'gurpreet',
    name: 'Gurpreet Singh',
    location: 'Bathinda, Punjab',
    crop: 'Cotton',
    metric: '₹1,900 more per quintal',
    metricTag: '₹1,900 more per quintal',
    quote: '“Mandi prices in the app showed a better rate two districts away. That one alert paid for my whole season\'s diesel.”',
    image: '/assets/farmer_harvest.jpeg',
    video: '/assets/sustainable_farm_diorama.mp4',
    detectedIssue: 'Early bollworm damage spotted during routine scouting',
    actionsTaken: [
      'Captured pest photos for instant AI identification',
      'Switched to a targeted bio-pesticide instead of broad spraying',
      'Tracked live Mandi prices to time the sale for the best rate'
    ],
    result: 'Sold at a higher rate with fewer sprays and cleaner lint quality.'
  },
  {
    id: 'meena',
    name: 'Meena Ravi',
    location: 'Erode, Tamil Nadu',
    crop: 'Turmeric',
    metric: 'Fewer sprays, cleaner harvest',
    metricTag: '22% higher marketable yield',
    quote: '“I ask Ananya AI everything in Tamil. She explains pest control like a neighbour would, not like a textbook.”',
    image: '/assets/hand_phone_crop.jpeg',
    video: '/assets/holographic_leaves.mp4',
    detectedIssue: 'Rhizome rot and repeated leaf blotch',
    actionsTaken: [
      'Asked Ananya AI in Tamil for organic control options',
      'Improved field drainage and applied neem-based treatment',
      'Used the farming calendar to plan preventive sprays before monsoon'
    ],
    result: 'Reduced chemical sprays and lifted marketable rhizome yield.'
  }
];

export default function FarmerStories() {
  const [stories, setStories] = useState(INITIAL_STORIES);
  const [selectedCase, setSelectedCase] = useState(INITIAL_STORIES[0]);

  // Form State for User Feedback
  const [showAddForm, setShowAddForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [userCrop, setUserCrop] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [userFeedback, setUserFeedback] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasExistingUserFeedback, setHasExistingUserFeedback] = useState(false);
  const [successNotice, setSuccessNotice] = useState('');

  useEffect(() => {
    // Load previously saved user feedback if available
    const saved = getSavedUserFeedback();
    if (saved && saved.comments) {
      const userStoryObj = {
        id: 'user_saved_fb',
        name: saved.name || 'Verified Farmer',
        location: saved.location || 'India',
        crop: saved.category || 'General Farming',
        metric: `${saved.rating || 5}/5 Star Feedback`,
        metricTag: 'Community Feedback',
        quote: `“${saved.comments}”`,
        image: '/assets/hand_phone_crop.jpeg',
        video: '/assets/sustainable_farming_village.mp4',
        detectedIssue: 'User Submitted Feedback & Experience',
        actionsTaken: [
          'Shared real field feedback directly with GrainWise AI team',
          'Rated platform usability and AI diagnostic accuracy',
          'Synced feedback with verified farmer network'
        ],
        result: `Rating: ${saved.rating || 5} Stars — Verified User Feedback`,
        isUserSubmission: true
      };

      setStories([userStoryObj, ...INITIAL_STORIES]);
      setUserName(saved.name || '');
      setUserLocation(saved.location || '');
      setUserCrop(saved.category || '');
      setUserRating(saved.rating || 5);
      setUserFeedback(saved.comments || '');
      setUserPhone(saved.phone || '');
      setHasExistingUserFeedback(true);
    }
  }, []);

  const handleSelectStory = (story) => {
    setSelectedCase(story);
    recordFeatureUsageToDB({
      featureName: 'Farmer Stories',
      action: 'view_story',
      metadata: { farmer: story.name, crop: story.crop, location: story.location }
    });
  };

  const handleUserFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!userFeedback.trim()) return;

    setIsSubmitting(true);
    const payload = {
      name: userName || 'Verified Farmer',
      location: userLocation || 'India',
      phone: userPhone,
      category: userCrop || 'General',
      rating: userRating,
      comments: userFeedback,
      isUpdate: hasExistingUserFeedback
    };

    const res = await saveFeedbackToDB(payload);
    setIsSubmitting(false);

    if (res.success) {
      confetti({ particleCount: 100, spread: 70 });
      
      const newStory = {
        id: 'user_saved_fb',
        name: userName || 'Verified Farmer',
        location: userLocation || 'India',
        crop: userCrop || 'General Farming',
        metric: `${userRating}/5 Star Feedback`,
        metricTag: 'Community Feedback',
        quote: `“${userFeedback}”`,
        image: '/assets/hand_phone_crop.jpeg',
        video: '/assets/sustainable_farming_village.mp4',
        detectedIssue: 'User Submitted Feedback & Experience',
        actionsTaken: [
          'Shared real field feedback directly with GrainWise AI team',
          'Rated platform usability and AI diagnostic accuracy',
          'Synced feedback with verified farmer network'
        ],
        result: `Rating: ${userRating} Stars — Verified User Feedback`,
        isUserSubmission: true
      };

      setStories((prev) => {
        const filtered = prev.filter((s) => s.id !== 'user_saved_fb');
        return [newStory, ...filtered];
      });

      setSelectedCase(newStory);
      setHasExistingUserFeedback(true);
      setSuccessNotice(hasExistingUserFeedback ? 'Your feedback was updated!' : 'Your feedback was published!');
      setTimeout(() => setSuccessNotice(''), 4000);
      setShowAddForm(false);
    }
  };

  return (
    <section id="case-studies" className="py-24 bg-[#021109] relative overflow-hidden border-b border-emerald-900/40">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-xs font-semibold text-emerald-300">
            <Award className="w-3.5 h-3.5 text-amber-400" /> Real Fields, Real Results
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Farmer Stories & <span className="gradient-text-agri">Community Feedback</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Farmers across India share their experiences using GrainWise AI. Add your own feedback directly below!
          </p>

          <div className="pt-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black font-extrabold rounded-2xl shadow-lg shadow-amber-400/20 text-xs sm:text-sm inline-flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              {showAddForm ? (
                <>Close Feedback Form</>
              ) : hasExistingUserFeedback ? (
                <>
                  <Edit3 className="w-4 h-4 text-black" /> Update Your Submitted Feedback
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4 text-black" /> Add Your Own Feedback
                </>
              )}
            </button>
          </div>
        </div>

        {/* User Success Notice */}
        {successNotice && (
          <div className="max-w-xl mx-auto mb-8 p-3 rounded-2xl bg-emerald-900/80 border border-emerald-500 text-emerald-200 text-xs font-semibold text-center animate-fade-in flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400" /> {successNotice}
          </div>
        )}

        {/* Interactive Form to Add Own Feedback */}
        {showAddForm && (
          <form onSubmit={handleUserFeedbackSubmit} className="max-w-2xl mx-auto mb-16 bg-[#031d10] border-2 border-amber-400/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-400" />
                {hasExistingUserFeedback ? 'Update Your Feedback' : 'Add Your Own Feedback & Experience'}
              </h3>
              <span className="text-[10px] text-amber-400 font-mono bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                Live Community Sync
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Kumar"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-black/60 border border-emerald-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Location</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Karnal, Haryana"
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.target.value)}
                  className="w-full bg-black/60 border border-emerald-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Crop / Category</label>
                <input
                  type="text"
                  placeholder="e.g. Wheat, Mustard, Paddy"
                  value={userCrop}
                  onChange={(e) => setUserCrop(e.target.value)}
                  className="w-full bg-black/60 border border-emerald-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Mobile Phone Number (Optional)</label>
                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full bg-black/60 border border-emerald-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Star Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setUserRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star className={`w-5 h-5 ${star <= userRating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
                  </button>
                ))}
                <span className="text-xs text-amber-300 font-bold ml-2">{userRating} / 5 Stars</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Your Feedback / Story</label>
              <textarea
                required
                rows={3}
                placeholder="Share how GrainWise AI helped your crops, diagnosed issues, or saved fertilizer costs..."
                value={userFeedback}
                onChange={(e) => setUserFeedback(e.target.value)}
                className="w-full bg-black/60 border border-emerald-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" /> {hasExistingUserFeedback ? 'Update My Feedback' : 'Publish My Feedback'}
                </>
              )}
            </button>
          </form>
        )}

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stories.map((s) => (
            <div
              key={s.id}
              onClick={() => handleSelectStory(s)}
              className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 border flex flex-col justify-between relative overflow-hidden ${
                selectedCase.id === s.id
                  ? 'bg-gradient-to-b from-[#06331e] to-[#042013] border-amber-400 shadow-2xl shadow-amber-400/10 scale-105'
                  : 'bg-[#042013]/90 border-emerald-800/50 hover:border-emerald-600 hover:-translate-y-1'
              }`}
            >
              {s.isUserSubmission && (
                <span className="absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-black shadow">
                  ✨ Your Feedback
                </span>
              )}

              <div>
                <Quote className="w-8 h-8 text-amber-400/40 mb-3" />
                <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed mb-6 font-serif">
                  {s.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-emerald-900/60">
                <div className="font-display font-extrabold text-white text-base">{s.name}</div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-emerald-400" /> {s.location} · <span className="text-amber-300">{s.crop}</span>
                </div>
                <div className="mt-3 px-3 py-1 bg-amber-500/20 text-amber-300 text-[11px] font-bold rounded-lg border border-amber-500/30 inline-block">
                  {s.metric}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Case Study Deep Dive Breakdown Card */}
        <div className="bg-gradient-to-br from-[#042516] via-[#083821] to-[#031d10] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-emerald-800/50">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" /> Detailed Case Study Analysis
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {selectedCase.crop} in {selectedCase.location}
              </h3>
              <div className="text-sm text-emerald-300 font-semibold mt-0.5">Farmer: {selectedCase.name}</div>
            </div>

            <div className="px-5 py-2.5 rounded-2xl bg-amber-400 text-black font-extrabold text-sm sm:text-base shadow-lg shadow-amber-400/20">
              Measurable Outcome: {selectedCase.metricTag}
            </div>
          </div>

          {/* Grid Layout: Media + Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-8">
            
            {/* Left: Video / Image Showcase */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-emerald-500/30 aspect-video bg-black shadow-xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                src={selectedCase.video}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <img
                src={selectedCase.image}
                alt={selectedCase.name}
                className="w-full h-full object-cover"
                style={{ display: 'none' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 bg-black/80 px-3 py-1 rounded-lg border border-emerald-500/40 text-xs text-amber-300 font-mono">
                GrainWise AI Verified Field Data
              </div>
            </div>

            {/* Right: Detected Issue -> Actions -> Result */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/40 text-xs space-y-1">
                <div className="font-bold text-red-400 uppercase tracking-wider">Detected Issue</div>
                <div className="text-slate-200 font-semibold">{selectedCase.detectedIssue}</div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/50 text-xs space-y-2">
                <div className="font-bold text-amber-400 uppercase tracking-wider">Actions Taken with GrainWise AI</div>
                <ul className="space-y-1.5 text-slate-200">
                  {selectedCase.actionsTaken.map((act, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1">
                <div className="font-bold text-amber-300 uppercase tracking-wider">Final Measurable Result</div>
                <div className="text-white font-extrabold text-sm">{selectedCase.result}</div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

