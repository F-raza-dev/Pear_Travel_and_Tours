import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, X, ShieldCheck } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('ptt_promo_dismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('ptt_promo_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-[#001D3D] via-[#00264D] to-[#003566] text-white border-b border-[#F4B400]/30 py-2.5 px-3 sm:px-6 relative text-xs sm:text-sm font-medium z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left: Highlight Pill & Text */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 overflow-hidden">
          <span className="inline-flex items-center gap-1 bg-[#F4B400] text-[#00264D] text-[10px] sm:text-xs font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 shadow-xs">
            <Sparkles className="w-3 h-3 fill-[#00264D]" />
            Limited-Time Offer
          </span>

          <p className="text-gray-100 text-xs sm:text-sm truncate">
            <span className="hidden md:inline text-[#F4B400] font-bold">Special Season Travel:</span> Save up to 15% on Autumn Northern Pakistan & Early Umrah Stays!
          </p>

          <span className="hidden xl:inline-flex items-center gap-1 text-[11px] bg-white/10 px-2 py-0.5 rounded-md text-gray-300 border border-white/15">
            <ShieldCheck className="w-3 h-3 text-[#F4B400]" />
            <span>Govt. Ministry of Tourism License GL# 6190</span>
          </span>
        </div>

        {/* Right: CTA & Dismiss */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            to="/packages"
            className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1 rounded-full bg-[#F4B400] hover:bg-[#e0a300] text-[#00264D] text-xs font-bold transition-all shadow-xs active:scale-95"
          >
            <span>View Offers</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Close promotional banner"
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
