import React, { useState, useEffect } from 'react';
import { X, Smartphone, QrCode, Download, Check, ShieldCheck, Sparkles, Copy, MessageSquare, Star, Send, Clock, Edit3, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { recordAppDownloadToDB, recordFeatureUsageToDB, saveFeedbackToDB, getSavedUserFeedback } from '../lib/supabase';

export default function DownloadModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [showAndroidNotifyModal, setShowAndroidNotifyModal] = useState(false);
  const [androidEmailPhone, setAndroidEmailPhone] = useState('');
  const [androidNotified, setAndroidNotified] = useState(false);

  // Feedback State
  const [showFeedbackTab, setShowFeedbackTab] = useState(false);
  const [feedbackPhone, setFeedbackPhone] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackCategory, setFeedbackCategory] = useState('General');
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState('');
  const [isUpdatingFeedback, setIsUpdatingFeedback] = useState(false);
  const [feedbackSuccessMessage, setFeedbackSuccessMessage] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const existing = getSavedUserFeedback();
      if (existing) {
        setFeedbackPhone(existing.phone || '');
        setFeedbackEmail(existing.email || '');
        setFeedbackCategory(existing.category || 'General');
        setRating(existing.rating || 5);
        setComments(existing.comments || '');
        setIsUpdatingFeedback(true);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownloadTrigger = async (platform) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    await recordAppDownloadToDB(platform);
    await recordFeatureUsageToDB({
      featureName: 'App Downloads',
      action: 'click_download',
      metadata: { platform }
    });
    alert(`Thank you for installing GrainWise AI for ${platform}! Starting app package download...`);
  };

  const handleAndroidPreRegister = async (e) => {
    e.preventDefault();
    if (!androidEmailPhone.trim()) return;

    await recordFeatureUsageToDB({
      featureName: 'Android Launch Pre-Register',
      action: 'subscribe_android_launch',
      metadata: { contact: androidEmailPhone }
    });
    setAndroidNotified(true);
    confetti({ particleCount: 80, spread: 60 });
    setTimeout(() => {
      setShowAndroidNotifyModal(false);
      setAndroidNotified(false);
      setAndroidEmailPhone('');
    }, 2500);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!comments.trim()) return;

    setIsSubmittingFeedback(true);
    const feedbackPayload = {
      phone: feedbackPhone,
      email: feedbackEmail,
      category: feedbackCategory,
      rating,
      comments,
      isUpdate: isUpdatingFeedback
    };

    const res = await saveFeedbackToDB(feedbackPayload);
    setIsSubmittingFeedback(false);

    if (res.success) {
      confetti({ particleCount: 90, spread: 65, origin: { y: 0.7 } });
      setFeedbackSuccessMessage(
        isUpdatingFeedback
          ? 'Your feedback was successfully updated directly from your phone!'
          : 'Thank you! Your feedback has been sent directly from your phone.'
      );
      setIsUpdatingFeedback(true);
      setTimeout(() => setFeedbackSuccessMessage(''), 4500);
    }
  };

  const copyDomainLink = () => {
    navigator.clipboard.writeText('https://Grainwish.com');
    setCopied(true);
    recordFeatureUsageToDB({
      featureName: 'App Downloads',
      action: 'copy_domain_link',
      metadata: { link: 'https://Grainwish.com' }
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#06331f] via-[#042114] to-[#02140c] border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-emerald-950 text-slate-300 hover:text-white border border-emerald-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-black mx-auto flex items-center justify-center shadow-lg shadow-amber-400/20">
            <Smartphone className="w-8 h-8" />
          </div>

          <h3 className="font-display text-2xl font-extrabold text-white">
            Download GrainWise <span className="text-amber-400">AI</span>
          </h3>

          <p className="text-xs text-slate-300">
            <span className="text-amber-400 font-semibold">Application Phase is Coming Soon</span> · Android Pre-Register will get Free 14 days trial pack
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-[11px] font-mono text-emerald-300 border border-emerald-700/50">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Official Portal: Grainwish.com
          </div>
        </div>

        {/* Action Selector Pills (Download vs Phone Feedback) */}
        <div className="flex rounded-xl bg-emerald-950 p-1 border border-emerald-800/60">
          <button
            onClick={() => setShowFeedbackTab(false)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              !showFeedbackTab ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="w-3.5 h-3.5" /> App Downloads
          </button>

          <button
            onClick={() => setShowFeedbackTab(true)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              showFeedbackTab ? 'bg-amber-400 text-black shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" /> Update Phone Feedback
            {isUpdatingFeedback && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
          </button>
        </div>

        {/* TAB 1: DOWNLOADS & ANDROID COMING SOON */}
        {!showFeedbackTab && (
          <div className="space-y-5 animate-fade-in">
            {/* QR Code Container */}
            <div className="bg-[#03180f] p-4 rounded-2xl border border-emerald-800/60 flex items-center justify-between gap-4">
              <div className="w-24 h-24 bg-white p-2 rounded-xl shrink-0 flex items-center justify-center shadow-md">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M0,0 h30 v30 h-30 z M40,0 h20 v10 h-20 z M70,0 h30 v30 h-30 z M0,40 h10 v20 h-10 z M30,40 h40 v10 h-40 z M80,40 h20 v30 h-20 z M0,70 h30 v30 h-30 z M40,80 h30 v20 h-30 z M80,80 h20 v20 h-20 z" fill="#031d10" />
                </svg>
              </div>
              <div className="space-y-1 text-xs">
                <div className="font-bold text-amber-300 flex items-center gap-1">
                  <QrCode className="w-4 h-4 text-amber-400" /> Scan QR with Phone Camera
                </div>
                <div className="text-slate-300 text-[11px]">
                  Instantly open GrainWise AI on your smartphone device.
                </div>
                <button
                  onClick={copyDomainLink}
                  className="mt-2 text-[11px] font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 underline"
                >
                  {copied ? <Check className="w-3 h-3 text-amber-400" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Link Copied to Clipboard!' : 'Copy Link: grainwish.com'}
                </button>
              </div>
            </div>

            {/* Direct Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Android Phase Coming Soon Card */}
              <div className="relative p-3.5 rounded-2xl bg-gradient-to-br from-emerald-950 via-[#062c1b] to-black border border-amber-500/40 text-white shadow-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" /> Application Phase is Coming Soon
                  </span>
                </div>
                <div className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-400" /> Android App
                </div>
                <p className="text-[10px] text-amber-300 font-semibold">
                  Android Pre-Register will get Free 14 days trial pack!
                </p>
                <button
                  onClick={() => setShowAndroidNotifyModal(true)}
                  className="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs shadow transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Android Pre-Register (Free 14 Days Trial Pack)
                </button>
              </div>

              {/* iOS Ready Card */}
              <div className="p-3.5 rounded-2xl bg-emerald-700/80 hover:bg-emerald-600 border border-emerald-500 text-white shadow-lg space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 inline-block mb-1">
                    ✓ Available Now
                  </span>
                  <div className="font-bold text-sm text-white flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-amber-300" /> iOS App Store
                  </div>
                  <p className="text-[10px] text-emerald-100 mt-1">
                    Optimized for iPhone & iPad with offline AI scan mode.
                  </p>
                </div>
                <button
                  onClick={() => handleDownloadTrigger('iOS App Store')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs shadow transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-700" /> Download iOS App
                </button>
              </div>

            </div>

            {/* Android Notification Dialog */}
            {showAndroidNotifyModal && (
              <form onSubmit={handleAndroidPreRegister} className="bg-[#031d10] p-4 rounded-2xl border border-amber-400/50 space-y-3 animate-fade-in">
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Android Pre-Register — Free 14 Days Trial Pack
                </div>
                <p className="text-[11px] text-slate-300">
                  Application Phase is Coming Soon. Android Pre-Register will get Free 14 days trial pack! Enter your mobile number or email below to claim your trial pack upon launch.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Enter phone number or email"
                    value={androidEmailPhone}
                    onChange={(e) => setAndroidEmailPhone(e.target.value)}
                    className="flex-1 bg-black/60 border border-emerald-700/60 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-xl shadow shrink-0"
                  >
                    Claim 14 Days Trial
                  </button>
                </div>
                {androidNotified && (
                  <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Pre-Registered! You will get a Free 14 days trial pack on launch.
                  </div>
                )}
              </form>
            )}
          </div>
        )}

        {/* TAB 2: DIRECT PHONE FEEDBACK */}
        {showFeedbackTab && (
          <form onSubmit={handleFeedbackSubmit} className="space-y-4 animate-fade-in bg-[#031d10] p-4 rounded-2xl border border-emerald-800/60">
            <div className="flex items-center justify-between border-b border-emerald-900/60 pb-2">
              <div className="font-bold text-white text-xs flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                {isUpdatingFeedback ? 'Update Phone Feedback' : 'Submit Direct Mobile Feedback'}
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">
                {isUpdatingFeedback ? 'Edit Saved Feedback' : 'Direct Phone Sync'}
              </span>
            </div>

            {feedbackSuccessMessage && (
              <div className="p-2.5 rounded-xl bg-emerald-900/80 border border-emerald-500 text-emerald-200 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{feedbackSuccessMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  Mobile Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  value={feedbackPhone}
                  onChange={(e) => setFeedbackPhone(e.target.value)}
                  className="w-full bg-black/60 border border-emerald-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  Feedback Category
                </label>
                <select
                  value={feedbackCategory}
                  onChange={(e) => setFeedbackCategory(e.target.value)}
                  className="w-full bg-black/60 border border-emerald-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="General">🌾 General Suggestion</option>
                  <option value="AI Diagnostics">📷 Camera AI Diagnostics</option>
                  <option value="Mandi Prices">📈 Mandi Prices & MSP</option>
                  <option value="Ananya AI">🤖 Ananya Assistant</option>
                  <option value="App Download">📱 Mobile App & Android Release</option>
                </select>
              </div>
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">
                Your Rating
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-slate-600 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs text-amber-300 font-bold ml-2">{rating} / 5 Stars</span>
              </div>
            </div>

            {/* Comments Area */}
            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">
                Your Feedback / Experience
              </label>
              <textarea
                required
                rows={3}
                placeholder="Share your experience using GrainWise AI directly from your phone..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full bg-black/60 border border-emerald-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingFeedback}
              className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              {isSubmittingFeedback ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : isUpdatingFeedback ? (
                <>
                  <Edit3 className="w-4 h-4" /> Update Feedback from Phone
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Submit Feedback from Phone
                </>
              )}
            </button>
          </form>
        )}

        {/* Footer info */}
        <div className="text-center text-[10px] text-slate-400 pt-2 border-t border-emerald-900/40">
          22 Languages Supported · Low Bandwidth 2G/3G Optimized · 100% Free for Farmers
        </div>

      </div>
    </div>
  );
}
