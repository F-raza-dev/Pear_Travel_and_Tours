import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { buildWhatsAppUrl } from '../../utils/travelLogic';

interface WhatsAppButtonProps {
  customMessage?: string;
  itemName?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ customMessage, itemName }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const defaultMsg = itemName
    ? `Assalamu Alaikum Pearl Travel, I am interested in details and booking inquiry for "${itemName}". Please share available packages.`
    : customMessage || 'Assalamu Alaikum Pearl Travel, I would like to inquire about your travel and tour packages.';

  const whatsappUrl = buildWhatsAppUrl('923153171263', defaultMsg);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end flex-col gap-2">
      {/* Mini Tooltip preview on hover/touch */}
      {showTooltip && (
        <div className="bg-white text-gray-800 p-3 rounded-2xl shadow-xl border border-gray-200 max-w-xs text-xs mb-1 animate-fadeIn relative">
          <button 
            type="button" 
            onClick={() => setShowTooltip(false)}
            className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 p-1"
            aria-label="Close tooltip"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="font-semibold text-[#00264D] flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Chat with Pearl Travel
          </div>
          <p className="text-gray-600">
            Have questions about tour packages or Umrah? Chat with our travel expert directly on WhatsApp.
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Pearl Travel & Tours (+92 315 3171263)"
        onMouseEnter={() => setShowTooltip(true)}
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-2xl hover:bg-[#20ba59] transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
        
        {/* Pulsing beacon */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#F4B400] text-[9px] font-bold text-[#00264D] items-center justify-center">
            1
          </span>
        </span>
      </a>
    </div>
  );
};
