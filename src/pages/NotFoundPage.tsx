import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, MapPin, PhoneCall } from 'lucide-react';
import { useDocumentTitleAndSEO } from '../lib/seo';

export const NotFoundPage: React.FC = () => {
  useDocumentTitleAndSEO({
    title: '404 — Page Not Found',
    description: 'The travel page you are looking for does not exist. Explore our top destinations and holiday packages with Pearl Travel & Tours.',
    canonicalPath: '/404',
  });

  return (
    <div className="min-h-[70vh] bg-[#F5F6F8] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-gray-100 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#003566]/10 text-[#003566] flex items-center justify-center mx-auto">
          <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '12s' }} />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-extrabold text-[#00264D] tracking-tight">404</span>
          <h1 className="text-xl font-bold text-[#00264D]">Destination Not Found</h1>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            The road you are looking for might have moved, or the link has expired. Let’s get you back on your travel path!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2.5 pt-2">
          <Link
            to="/"
            className="w-full py-3 px-4 rounded-xl bg-[#F4B400] hover:bg-[#e0a300] text-[#00264D] font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/packages"
            className="w-full py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-[#00264D] font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#003566]" />
            <span>Browse Tour Packages</span>
          </Link>

          <Link
            to="/contact"
            className="w-full py-2.5 px-4 rounded-xl text-gray-500 hover:text-[#003566] text-xs font-semibold flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Contact Pearl Travel Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
