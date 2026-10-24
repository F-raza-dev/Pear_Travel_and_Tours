import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { packagesData } from '../data/travelData';
import { 
  Clock, MapPin, Check, X, Calendar, ShieldCheck, 
  Compass, ArrowLeft, MessageCircle, AlertTriangle 
} from 'lucide-react';
import { InquiryModal } from '../components/common/InquiryModal';
import { buildWhatsAppUrl } from '../utils/travelLogic';
import { useDocumentTitleAndSEO } from '../lib/seo';

export const PackageDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const pkg = packagesData.find((p) => p.slug === slug) || packagesData[0];

  useDocumentTitleAndSEO({
    title: `${pkg.title} (${pkg.durationDays} Days)`,
    description: `${pkg.shortDescription} Includes verified stays, private transport, and guided itinerary.`,
    canonicalPath: `/packages/${pkg.slug}`,
    ogImage: pkg.image,
  });

  const whatsappMessage = `Assalamu Alaikum Pearl Travel, I am interested in inquiring about "${pkg.title}" (${pkg.durationDays} Days). Please share departure availability and customized pricing.`;
  const whatsappUrl = buildWhatsAppUrl('923153171263', whatsappMessage);

  return (
    <div className="bg-[#F5F6F8] min-h-screen pb-20">
      <Breadcrumbs
        items={[
          { name: 'Tour Packages', path: '/packages' },
          { name: pkg.title },
        ]}
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Link & Title Header */}
        <div className="mb-6">
          <Link
            to="/packages"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#003566] mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Packages</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="bg-[#00264D] text-[#F4B400] text-xs font-bold px-3 py-1 rounded-full">
              {pkg.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="w-3.5 h-3.5 text-[#003566]" />
              <span>{pkg.destinationName}, {pkg.country}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5 text-[#003566]" />
              <span>{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#00264D] leading-tight">
            {pkg.title}
          </h1>
        </div>

        {/* Media Gallery & Quick Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Gallery (8 Cols) */}
          <div className="lg:col-span-8 space-y-3">
            <div className="relative h-[340px] sm:h-[440px] rounded-3xl overflow-hidden shadow-md border border-gray-100 bg-black">
              <img
                src={pkg.galleryImages[activeImageIndex] || pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-full">
                Photo {activeImageIndex + 1} of {pkg.galleryImages.length || 1}
              </div>
            </div>

            {/* Thumbnail selector */}
            {pkg.galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {pkg.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-[#F4B400] ring-2 ring-[#F4B400]/40' : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Booking Sidebar (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white rounded-3xl p-6 sm:p-7 shadow-lg border border-gray-100 space-y-5">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-xs text-gray-400 uppercase font-bold block">Quotation / Starting At</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#003566] mt-0.5">
                  {pkg.priceDisplay}
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  *Final price depends on group size, hotel tier, and travel dates.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-bold text-[#00264D]">{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500">Destination</span>
                  <span className="font-bold text-[#00264D]">{pkg.destinationName}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500">Accommodation</span>
                  <span className="font-bold text-[#00264D] text-right">{pkg.accommodationType}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-500">Transport</span>
                  <span className="font-bold text-[#00264D]">Private AC Vehicle / Transfers</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setInquiryOpen(true)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#F4B400] hover:bg-[#e0a300] text-[#00264D] font-bold text-sm shadow transition-colors flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4" />
                  <span>Inquire About This Package</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp Inquiry</span>
                </a>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>No cancellation fees during inquiry stage</span>
              </div>
            </div>
          </div>

        </div>

        {/* Detailed Sections: Overview, Itinerary, Inclusions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100 space-y-3">
              <h2 className="text-xl font-bold text-[#00264D]">Trip Overview</h2>
              <p className="text-sm text-[#353B45] leading-relaxed">
                {pkg.overview}
              </p>
            </div>

            {/* Day by Day Itinerary */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#00264D]">Detailed Day-by-Day Itinerary</h2>
                <p className="text-xs text-[#777F8A] mt-1">
                  Thoughtfully paced for memorable sightseeing and restful evenings.
                </p>
              </div>

              <div className="space-y-6 border-l-2 border-[#003566]/20 pl-4 sm:pl-6 ml-2 sm:ml-4">
                {pkg.itinerary.map((day) => (
                  <div key={day.day} className="relative space-y-1.5">
                    {/* Circle marker */}
                    <div className="absolute -left-[27px] sm:-left-[35px] top-0.5 w-6 h-6 rounded-full bg-[#003566] text-[#F4B400] text-xs font-bold flex items-center justify-center shadow">
                      {day.day}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-[#003566] uppercase tracking-wide">
                        Day {day.day}
                      </span>
                      {day.stayLocation && (
                        <span className="text-[11px] bg-[#F5F6F8] text-gray-600 px-2.5 py-0.5 rounded-full font-medium">
                          Stay: {day.stayLocation}
                        </span>
                      )}
                      {day.mealsIncluded && (
                        <span className="text-[11px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                          Meals: {day.mealsIncluded}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-[#00264D]">
                      {day.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-[#353B45] leading-relaxed">
                      {day.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="bg-white rounded-3xl p-6 shadow-xs border border-gray-100 space-y-4">
                <h3 className="text-base font-bold text-[#00264D] flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>What’s Included</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-gray-600">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-white rounded-3xl p-6 shadow-xs border border-gray-100 space-y-4">
                <h3 className="text-base font-bold text-[#00264D] flex items-center gap-2">
                  <X className="w-5 h-5 text-red-500" />
                  <span>What’s Excluded</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-gray-600">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 space-y-2 text-xs text-amber-900">
              <h4 className="font-bold flex items-center gap-2 text-sm text-amber-950">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Important Travel Information</span>
              </h4>
              <ul className="space-y-1 list-disc pl-5">
                {pkg.importantNotes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
                <li>All dates and room categories are subject to confirmation at the time of final booking agreement.</li>
              </ul>
            </div>

          </div>

          {/* Right Column: Support & Trust */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-gray-100 space-y-3">
              <h4 className="text-sm font-bold text-[#00264D]">Why Travel with Pearl?</h4>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400]" />
                  <span>Dedicated tour manager on call 24/7</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400]" />
                  <span>Experienced local mountain & city drivers</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400]" />
                  <span>Customizable date departures for private families</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        defaultService={
          pkg.category === 'Umrah'
            ? 'Umrah Package'
            : pkg.category === 'Northern Pakistan'
            ? 'Domestic Tour'
            : 'International Tour'
        }
        defaultDestination={pkg.destinationName}
        itemReferenceId={pkg.id}
        itemReferenceName={pkg.title}
      />
    </div>
  );
};
