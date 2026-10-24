import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, PhoneCall } from 'lucide-react';

export const CallToAction: React.FC = () => {
  return (
    <section className="relative py-20 bg-gradient-to-r from-[#00264D] via-[#003566] to-[#00264D] text-white overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#F4B400]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#003566]/40 blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs font-bold tracking-widest uppercase text-[#F4B400] bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
          Begin Your Adventure
        </span>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Your Next Journey Starts With <span className="text-[#F4B400]">Pearl.</span>
        </h2>

        <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Tell us where you want to go, and let our team help you plan your trip. Personalized quotes, transparent rates, and uncompromised comfort.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/packages"
            className="px-8 py-3.5 rounded-full bg-[#F4B400] text-[#00264D] font-bold text-base shadow-lg hover:bg-[#e0a300] hover:shadow-xl transition-all duration-200 active:scale-95 flex items-center gap-2"
          >
            <Compass className="w-5 h-5" />
            <span>Explore Packages</span>
          </Link>

          <Link
            to="/contact"
            className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/30 backdrop-blur-md transition-all duration-200 flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-[#F4B400]" />
            <span>Contact Our Team</span>
          </Link>
        </div>

        <p className="text-xs text-gray-400 pt-4">
          Direct WhatsApp Inquiries: <a href="tel:+923153171263" className="text-[#F4B400] hover:underline">+92 315 3171263</a> 
        </p>
      </div>
    </section>
  );
};
