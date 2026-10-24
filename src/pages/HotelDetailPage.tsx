import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { hotelsData } from '../data/travelData';
import { Star, MapPin, Check, Building2, ArrowLeft, ShieldCheck, MessageCircle } from 'lucide-react';
import { InquiryModal } from '../components/common/InquiryModal';
import { buildWhatsAppUrl } from '../utils/travelLogic';
import { useDocumentTitleAndSEO } from '../lib/seo';

export const HotelDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const hotel = hotelsData.find((h) => h.slug === slug) || hotelsData[0];

  useDocumentTitleAndSEO({
    title: `${hotel.name} — ${hotel.city}, ${hotel.country}`,
    description: `Book ${hotel.name} with Pearl Travel & Tours. ${hotel.stars}-star verified stay in ${hotel.city}. Amenities: ${hotel.amenities.join(', ')}.`,
    canonicalPath: `/hotels/${hotel.slug}`,
    ogImage: hotel.image,
  });

  const whatsappMessage = `Assalamu Alaikum Pearl Travel, I would like to inquire about booking/availability for "${hotel.name}" in ${hotel.city}.`;
  const whatsappUrl = buildWhatsAppUrl('923153171263', whatsappMessage);

  return (
    <div className="bg-[#F5F6F8] min-h-screen pb-20">
      <Breadcrumbs
        items={[
          { name: 'Hotels', path: '/hotels' },
          { name: hotel.name },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Link */}
        <Link
          to="/hotels"
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#003566] mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Hotels</span>
        </Link>

        {/* Title & Star Rating */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="flex items-center gap-0.5">
                {[...Array(hotel.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F4B400] text-[#F4B400]" />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-500">{hotel.stars} Star Luxury Stay</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#00264D]">
              {hotel.name}
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#003566]" />
              <span>{hotel.address}</span>
            </div>
          </div>

          <div className="text-left md:text-right shrink-0">
            <span className="text-xs text-gray-400 font-semibold uppercase block">Verified Rate</span>
            <span className="text-2xl font-extrabold text-[#003566]">{hotel.priceDisplay}</span>
          </div>
        </div>

        {/* Photo & Booking Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Main Photo (8 Cols) */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden shadow-md h-[340px] sm:h-[420px] bg-black">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Quick Reserve Box (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-lg border border-gray-100 space-y-5">
              <h3 className="text-base font-bold text-[#00264D] border-b border-gray-100 pb-3">
                Check Room Availability
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500">City / Country</span>
                  <span className="font-bold text-[#00264D]">{hotel.city}, {hotel.country}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500">Star Rating</span>
                  <span className="font-bold text-[#00264D]">{hotel.stars} Star Certified</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500">Room Categories</span>
                  <span className="font-bold text-[#00264D] text-right">{hotel.roomTypes.length} Available</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setInquiryOpen(true)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#F4B400] hover:bg-[#e0a300] text-[#00264D] font-bold text-sm shadow transition-colors flex items-center justify-center gap-2"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Inquire for Best Rates</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Check via WhatsApp</span>
                </a>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pearl Travel Corporate Discounted Contract Rates</span>
              </div>
            </div>
          </div>

        </div>

        {/* Detailed Sections: Description, Amenities, Room Types */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100 space-y-3">
              <h2 className="text-xl font-bold text-[#00264D]">About {hotel.name}</h2>
              <p className="text-sm text-[#353B45] leading-relaxed">
                {hotel.description}
              </p>
            </div>

            {/* Verified Amenities */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100 space-y-4">
              <h3 className="text-lg font-bold text-[#00264D]">Verified Property Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {hotel.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-[#F5F6F8] text-xs font-semibold text-[#00264D]">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Categories */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100 space-y-4">
              <h3 className="text-lg font-bold text-[#00264D]">Popular Room Types</h3>
              <div className="space-y-2">
                {hotel.roomTypes.map((room, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-[#F5F6F8]">
                    <span className="text-xs sm:text-sm font-semibold text-[#00264D]">{room}</span>
                    <button
                      type="button"
                      onClick={() => setInquiryOpen(true)}
                      className="text-xs text-[#003566] font-bold hover:underline"
                    >
                      Inquire ›
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Trust Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-gray-100 space-y-3">
              <h4 className="text-sm font-bold text-[#00264D]">Reservation Guarantee</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Pearl Travel & Tours verifies all hotel vouchers directly with hotel management before your check-in date. We guarantee genuine room booking confirmations and prompt invoice receipts.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        defaultService="Hotel Booking"
        defaultDestination={`${hotel.city}, ${hotel.country}`}
        itemReferenceId={hotel.id}
        itemReferenceName={hotel.name}
      />
    </div>
  );
};
