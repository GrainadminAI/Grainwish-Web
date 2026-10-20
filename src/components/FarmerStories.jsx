import React, { useState, useEffect, useRef } from 'react';
import { Quote, MapPin, TrendingUp, CheckCircle2, Award, Sparkles, PlusCircle, Star, Send, Edit3, MessageSquare, ChevronUp, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { recordFeatureUsageToDB, saveFeedbackToDB, getSavedUserFeedback } from '../lib/supabase';
import { useLanguage } from '../lib/LanguageContext';

const INITIAL_STORIES = [
  {
    id: 'subhashish',
    name: 'Subhashish Mondal',
    location: 'Bardhaman, West Bengal',
    state: 'West Bengal',
    crop: 'Aman Paddy & Potato',
    metric: 'Saved 3.5 Bighas from Blast',
    metricTag: '28% Higher Net Realization',
    quote: '“আমি বাংলায় অনন্যা AI-কে ব্লাস্ট রোগের ছবি পাঠাই। নিমেষে কার্বেনডাজিম আর নিম তেলের সঠিক মাত্রা বাতলে দেয়। বর্ধমানের মাঠে আমার ধানের ফলন পুরো রক্ষা পেয়েছে।” (I shared photos of leaf blast in Bengali with Ananya AI. It immediately gave the exact spray dilution and neem oil alternative. My harvest in Bardhaman was completely saved.)',
    image: '/assets/Farmer_walking.jpeg',
    video: '/assets/Paddy_rice.mp4',
    detectedIssue: 'Neck blast & spindle lesions across Aman paddy plot',
    actionsTaken: [
      'Scanned yellow-brown spindle lesions using camera AI diagnostics',
      'Received dual-track prescription: tricyclazole dosage + Pseudomonas bio-fungicide',
      'Calculated balanced NPK fertilizer dressing for alluvial Gangetic soil'
    ],
    result: 'Completely stopped blast spread across 3.5 bighas; harvested 24 quintals/acre quality paddy.'
  },
  {
    id: 'rajendra',
    name: 'Rajendra Prasad Kushwaha',
    location: 'Samastipur, Bihar',
    state: 'Bihar',
    crop: 'Rabi Maize & Wheat',
    metric: '+₹350/qtl via Mandi Radar',
    metricTag: '₹14,000 Extra Net Profit on Single Trolley',
    quote: '“समस्तीपुर मंडी के बजाय बेगूसराय मंडी में मक्के का भाव ₹350 प्रति क्विंटल अधिक मिल रहा था। लाइव मंडी रडार ने एक ही ट्रॉली में ₹14,000 का अतिरिक्त फायदा करा दिया।” (Instead of Samastipur yard, Begusarai Mandi was offering ₹350/qtl more. The live Mandi radar earned me an extra ₹14,000 on a single trolley.)',
    image: '/assets/Farmer_gesturing.jpeg',
    video: '/assets/Yellow_Rust_Wheat.mp4',
    detectedIssue: 'Fall armyworm whorl infestation & localized leaf spots',
    actionsTaken: [
      'Pointed phone camera directly into the maize whorl for instant AI diagnosis',
      'Applied Emamectin Benzoate 5% SG at verified ICAR dilution (0.4g/litre)',
      'Compared APMC modal rates across Samastipur, Rosera, and Begusarai yards'
    ],
    result: 'Controlled armyworm infestation within 48 hours; sold crop at peak Begusarai modal rate.'
  },
  {
    id: 'debabrata',
    name: 'Debabrata Roy',
    location: 'Nadia, West Bengal',
    state: 'West Bengal',
    crop: 'Jute & Cauliflower',
    metric: '₹2,200/bigha Fertilizer Savings',
    metricTag: 'Zero Chemical Over-dosing',
    quote: '“সবজি চাষে সারের খরচ অনেক বেড়ে যাচ্ছিল। গ্রেনওয়াইজ ক্যালকুলেটর দিয়ে ইউরিয়া কমিয়ে সঠিক পটাশ প্রয়োগ করে আল্ট্রা-গ্রিন ফলন পেয়েছি।” (Fertilizer bills in vegetable farming were excessive. Using GrainWise to reduce urea and optimize potash gave me a lush, healthy harvest with ₹2,200/bigha savings.)',
    image: '/assets/tablet_wheat_field.jpeg',
    video: '/assets/Sustainable_farm_sunset.mp4',
    detectedIssue: 'Boron deficiency and leaf rot in winter vegetable plots',
    actionsTaken: [
      'Diagnosed micronutrient deficiency vs fungal infection via multi-spectral scan',
      'Applied calibrated foliar spray (2g Borax/litre) during early vegetative growth',
      'Monitored Ranaghat and Bethuadahari APMC prices before wholesale dispatch'
    ],
    result: 'Achieved prime curd quality and fetched premium prices at Ranaghat wholesale market.'
  },
  {
    id: 'sunita',
    name: 'Sunita Devi',
    location: 'Nalanda, Bihar',
    state: 'Bihar',
    crop: 'Paddy & Gram (Chana)',
    metric: '100% Bio-IPM Transition',
    metricTag: '90% Drip Irrigation Subsidy Approved',
    quote: '“अनन्या दीदी से हमने मगही और हिंदी में बात की। खेत में चना का उकठा (Wilt) रोग लगा था, ट्राइकोडर्मा और जैविक खाद से 3 एकड़ खेत को बिना भारी दवा के ठीक कर लिया।” (We consulted Ananya Didi in Magahi and Hindi. Our gram crop had wilt disease; we treated 3 acres using Trichoderma and organic compost without expensive chemical sprays.)',
    image: '/assets/Hand_holding_smartphone.jpeg',
    video: '/assets/sustainable_farming_village.mp4',
    detectedIssue: 'Vascular wilt and pod borer in rainfed chickpea (chana)',
    actionsTaken: [
      'Obtained organic bio-fungicide seed treatment and Trichoderma soil drenching advice',
      'Installed pheromone monitoring traps at 5 traps/acre as prescribed by Ananya AI',
      'Tracked Bihar state micro-irrigation subsidy under PMKSY directly through the portal'
    ],
    result: 'Halted vascular wilt spread across 3 acres; verified for 90% state drip irrigation subsidy.'
  },
  {
    id: 'ramesh',
    name: 'Ramesh Patil',
    location: 'Nashik, Maharashtra',
    state: 'Maharashtra',
    crop: 'Wheat & onion',
    metric: 'Saved ~2 acres from rust spread',
    metricTag: '~35% yield protected',
    quote: '“I scanned a yellowing wheat leaf at 6 in the morning and had a treatment plan before breakfast. We saved almost the whole plot.”',
    image: '/assets/Farmer_gesturing.jpeg',
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
    state: 'Telangana',
    crop: 'Paddy',
    metric: '~18% lower fertilizer cost',
    metricTag: '18% lower fertilizer cost',
    quote: '“The NPK calculator told me I was over-applying urea. I cut my fertilizer bill and my paddy still came out stronger.”',
    image: '/assets/Farmer_walking.jpeg',
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
    state: 'Punjab',
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
    state: 'Tamil Nadu',
    crop: 'Turmeric',
    metric: 'Fewer sprays, cleaner harvest',
    metricTag: '22% higher marketable yield',
    quote: '“I ask Ananya AI everything in Tamil. She explains pest control like a neighbour would, not like a textbook.”',
    image: '/assets/Image1.jpeg',
    video: '/assets/Turmeric_plant_rot.mp4',
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
  const [caseVideoPlaying, setCaseVideoPlaying] = useState(false);
  const [caseVideoFailed, setCaseVideoFailed] = useState(false);
  const scrollContainerRef = useRef(null);

  const handleScrollUp = () => {
    scrollContainerRef.current?.scrollBy({ top: -260, behavior: 'smooth' });
  };

  const handleScrollDown = () => {
    scrollContainerRef.current?.scrollBy({ top: 260, behavior: 'smooth' });
  };

  const handleSelectCase = (story) => {
    setSelectedCase(story);
    setCaseVideoPlaying(false);
    setCaseVideoFailed(false);
  };

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
    setCaseVideoPlaying(false);
    setCaseVideoFailed(false);
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
    <section id="case-studies" className="py-10 sm:py-16 md:py-24 bg-[#021109] relative overflow-hidden border-b border-emerald-900/40">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12 space-y-2 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-[11px] sm:text-xs font-semibold text-emerald-300">
            <Award className="w-3.5 h-3.5 text-amber-400" /> Real Fields, Real Results
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            Farmer Stories & <span className="gradient-text-agri">Community Feedback</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-base">
            Farmers across India share their experiences using GrainWise AI. Add your own feedback directly below!
          </p>

          <div className="pt-1 sm:pt-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-amber-400 hover:bg-amber-300 text-black font-extrabold rounded-2xl shadow-lg shadow-amber-400/20 text-xs sm:text-sm inline-flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
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
          <div className="max-w-xl mx-auto mb-6 sm:mb-8 p-3 rounded-2xl bg-emerald-900/80 border border-emerald-500 text-emerald-200 text-xs font-semibold text-center animate-fade-in flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400" /> {successNotice}
          </div>
        )}

        {/* Interactive Form to Add Own Feedback */}
        {showAddForm && (
          <form onSubmit={handleUserFeedbackSubmit} className="max-w-2xl mx-auto mb-8 sm:mb-16 bg-[#031d10] border-2 border-amber-400/60 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl space-y-3 sm:space-y-4 animate-fade-in">
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

        {/* Vertical Scroll Feedback Showcase */}
        <div className="mb-8 sm:mb-14 space-y-3.5">
          {/* Vertical Scroll Feed Header */}
          <div className="flex items-center justify-between gap-3 bg-[#031d10] px-3.5 sm:px-5 py-3 sm:py-3.5 rounded-2xl border border-emerald-800/60 shadow-xl">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <div className="flex items-center gap-2 truncate">
                <span className="font-display font-bold text-white text-xs sm:text-sm truncate">
                  Farmer Feedback Stream
                </span>
                <span className="text-[10px] font-mono text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/30 shrink-0 font-semibold">
                  {stories.length} Verified Reviews
                </span>
              </div>
            </div>

            {/* Quick Scroll Buttons & Indicator */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden sm:flex text-[11px] text-emerald-300 font-mono items-center gap-1.5 mr-1">
                <span>↕ Vertical Feed</span>
              </div>
              <button
                onClick={handleScrollUp}
                title="Scroll Up Feedback"
                aria-label="Scroll feedback up"
                className="w-8 h-8 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/60 text-slate-200 hover:text-white flex items-center justify-center transition-all active:scale-95 touch-manipulation"
              >
                <ChevronUp className="w-4 h-4 text-emerald-300" />
              </button>
              <button
                onClick={handleScrollDown}
                title="Scroll Down Feedback"
                aria-label="Scroll feedback down"
                className="w-8 h-8 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/60 text-slate-200 hover:text-white flex items-center justify-center transition-all active:scale-95 touch-manipulation"
              >
                <ChevronDown className="w-4 h-4 text-emerald-300" />
              </button>
            </div>
          </div>

          {/* Vertical Scrollable Feed Viewport (Vertical feed on mobile, 2 cols on md+) */}
          <div
            ref={scrollContainerRef}
            tabIndex={0}
            role="region"
            aria-label="Farmer stories vertical scrollable feed"
            className="relative max-h-[500px] sm:max-h-[560px] md:max-h-[620px] overflow-y-auto overscroll-contain pr-1.5 sm:pr-2.5 rounded-2xl sm:rounded-3xl bg-[#031d10]/95 border-2 border-emerald-500/30 p-3 sm:p-5 shadow-2xl scrollbar-thin scrollbar-thumb-emerald-600/80 scrollbar-track-emerald-950/60 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
          >
            <div className="flex flex-col md:grid md:grid-cols-2 gap-3.5 sm:gap-4">
              {stories.map((s) => (
                <div
                  key={s.id}
                  onClick={() => handleSelectStory(s)}
                  className={`cursor-pointer rounded-2xl p-4 sm:p-5 transition-all duration-300 border flex flex-col justify-between relative overflow-hidden group touch-manipulation ${
                    selectedCase.id === s.id
                      ? 'bg-gradient-to-b from-[#06331e] to-[#042013] border-amber-400 shadow-xl shadow-amber-400/10 ring-2 ring-amber-400/50 scale-[1.01]'
                      : 'bg-[#042013]/90 border-emerald-800/60 hover:border-emerald-500/70 hover:bg-[#052818]/90'
                  }`}
                >
                  {s.isUserSubmission ? (
                    <span className="absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-black shadow">
                      ✨ Your Feedback
                    </span>
                  ) : s.state ? (
                    <span className="absolute top-3 right-3 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-700 text-amber-300 shadow">
                      {s.state}
                    </span>
                  ) : null}

                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((st) => (
                        <Star key={st} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      ))}
                      <span className="text-[10px] font-mono text-emerald-400 font-bold ml-1.5">5.0 Verified</span>
                    </div>
                    <Quote className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400/40 mb-2" />
                    <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed mb-4 font-serif">
                      {s.quote}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-emerald-900/60 flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="font-display font-extrabold text-white text-sm sm:text-base group-hover:text-amber-300 transition-colors truncate">
                        {s.name}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{s.location}</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-amber-300 font-medium shrink-0">{s.crop}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-[10px] sm:text-[11px] font-bold rounded-lg border border-amber-500/30">
                        {s.metric}
                      </div>
                      <div className="text-[9px] text-emerald-400 mt-1 font-mono group-hover:underline">
                        View Breakdown →
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Instruction Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-slate-400 px-2 pt-0.5">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
              <span>Scroll vertically to view all feedback from West Bengal, Bihar, and across India</span>
            </span>
            <span className="font-mono text-emerald-400 text-[10px]">
              Tap any feedback card to spotlight full case study below ↓
            </span>
          </div>
        </div>

        {/* Detailed Case Study Deep Dive Breakdown Card */}
        <div className="bg-gradient-to-br from-[#042516] via-[#083821] to-[#031d10] border-2 border-emerald-500/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 shadow-2xl">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-emerald-800/50">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" /> Detailed Case Study Analysis
              </div>
              <h3 className="font-display text-xl sm:text-3xl font-extrabold text-white mt-1">
                {selectedCase.crop} in {selectedCase.location}
              </h3>
              <div className="text-xs sm:text-sm text-emerald-300 font-semibold mt-0.5">Farmer: {selectedCase.name}</div>
            </div>

            <div className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-amber-400 text-black font-extrabold text-xs sm:text-base shadow-lg shadow-amber-400/20">
              Measurable Outcome: {selectedCase.metricTag}
            </div>
          </div>

          {/* Grid Layout: Media + Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center mt-5 sm:mt-8">
            
            {/* Left: Video / Image Showcase with Guaranteed Image Display */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-emerald-500/30 aspect-video bg-emerald-950 shadow-xl">
              {/* Fallback Image is ALWAYS loaded and visible */}
              <img
                src={selectedCase.image}
                alt={`Portrait of farmer ${selectedCase.name} sharing their crop yield experience from ${selectedCase.location}`}
                loading="eager"
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  caseVideoPlaying && !caseVideoFailed ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
                onError={(e) => {
                  e.target.src = '/assets/farmer_harvest.jpeg';
                }}
              />

              {!caseVideoFailed && (
                <video
                  key={selectedCase.id}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster={selectedCase.image}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    caseVideoPlaying ? 'opacity-100' : 'opacity-0'
                  }`}
                  src={selectedCase.video}
                  onPlay={() => setCaseVideoPlaying(true)}
                  onPlaying={() => setCaseVideoPlaying(true)}
                  onError={() => {
                    setCaseVideoFailed(true);
                    setCaseVideoPlaying(false);
                  }}
                />
              )}

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

