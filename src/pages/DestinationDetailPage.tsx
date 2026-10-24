import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { destinationsData, packagesData } from '../data/travelData';
import { MapPin, Calendar, Check, Compass, ArrowRight, ArrowLeft } from 'lucide-react';
import { InquiryModal } from '../components/common/InquiryModal';
import { useDocumentTitleAndSEO } from '../lib/seo';

export const DestinationDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const destination = destinationsData.find((d) => d.slug === slug) || destinationsData[0];

  useDocumentTitleAndSEO({
    title: `${destination.name} Travel Guide & Packages`,
    description: `Discover ${destination.name} with Pearl Travel & Tours. ${destination.tagline}. Best time to visit: ${destination.bestTimeToVisit}.`,
    canonicalPath: `/destinations/${destination.slug}`,
    ogImage: destination.image,
  });

  // Find packages matching this destination
  const relatedPackages = packagesData.filter(
    (p) => p.destinationId === destination.id || p.destinationName.toLowerCase().includes(destination.name.toLowerCase().split(',')[0])
  );

  return (
    <div className="bg-white min-h-screen">
      <Breadcrumbs
        items={[
          { name: 'Destinations', path: '/destinations' },
          { name: destination.name },
        ]}
      />

      {/* Destination Hero Banner */}
      <section className="relative h-[360px] sm:h-[460px] flex items-end overflow-hidden bg-[#00264D]">
        <img
          src={destination.image}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00264D] via-[#00264D]/60 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full text-white">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-white mb-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Destinations</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="bg-[#F4B400] text-[#00264D] text-xs font-bold px-3 py-1 rounded-full">
              {destination.region}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-200">
              <MapPin className="w-3.5 h-3.5 text-[#F4B400]" />
              <span>{destination.country}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            {destination.name}
          </h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mt-2 italic">
            “{destination.tagline}”
          </p>
        </div>
      </section>

      {/* Overview & Highlights */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Detailed Overview */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#00264D] mb-4">
                About Visiting {destination.name}
              </h2>
              <p className="text-[#353B45] leading-relaxed text-base">
                {destination.description}
              </p>
            </div>

            <div className="pt-4">
              <h3 className="text-xl font-bold text-[#00264D] mb-3">
                Key Attractions & Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F5F6F8] border border-gray-100">
                    <div className="w-7 h-7 rounded-full bg-[#003566] text-[#F4B400] flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-[#00264D]">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Packages */}
            <div className="pt-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#00264D]">
                    Available Packages for {destination.name}
                  </h3>
                  <p className="text-xs text-[#777F8A]">
                    Curated itineraries planned with comfortable stays and verified transportation.
                  </p>
                </div>
                <Link
                  to="/packages"
                  className="text-xs font-bold text-[#003566] hover:text-[#F4B400] flex items-center gap-1"
                >
                  <span>All packages</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {relatedPackages.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-lg border border-gray-100 transition-all group flex flex-col justify-between"
                    >
                      <div className="relative h-44">
                        <img
                          src={pkg.image}
                          alt={pkg.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[11px] px-2.5 py-0.5 rounded-md font-medium">
                          {pkg.durationDays} Days / {pkg.durationNights} Nights
                        </span>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-[#00264D] text-sm group-hover:text-[#003566]">
                            {pkg.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {pkg.shortDescription}
                          </p>
                        </div>
                        <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-xs font-bold text-[#003566]">{pkg.priceDisplay}</span>
                          <Link
                            to={`/packages/${pkg.slug}`}
                            className="px-3 py-1.5 rounded-lg bg-[#003566] hover:bg-[#00264D] text-white text-xs font-semibold"
                          >
                            View Itinerary
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#F5F6F8] p-6 rounded-2xl text-center border border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">
                    We also design customized group, family, or solo itineraries for {destination.name}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setInquiryOpen(true)}
                    className="px-6 py-2.5 rounded-full bg-[#F4B400] text-[#00264D] font-bold text-xs hover:bg-[#e0a300]"
                  >
                    Request Custom Quote for {destination.name}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right: Quick Facts Card & Inquiry Widget */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#F5F6F8] rounded-3xl p-6 border border-gray-200 space-y-4">
              <h3 className="text-base font-bold text-[#00264D] border-b border-gray-200 pb-3">
                Destination Fast Facts
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-[#003566] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-700 block">Best Time to Visit</span>
                    <span className="text-gray-500">{destination.bestTimeToVisit}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#003566] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-700 block">Region</span>
                    <span className="text-gray-500">{destination.region} ({destination.country})</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Compass className="w-4 h-4 text-[#003566] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-700 block">Travel Types Available</span>
                    <span className="text-gray-500">Guided Tours, Luxury Stays, Custom Family Trips</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setInquiryOpen(true)}
                  className="w-full py-3 px-4 rounded-xl bg-[#F4B400] text-[#00264D] font-bold text-sm hover:bg-[#e0a300] transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <Compass className="w-4 h-4" />
                  <span>Inquire About {destination.name}</span>
                </button>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="bg-[#00264D] text-white rounded-3xl p-6 border border-white/10 space-y-3 text-center">
              <h4 className="text-base font-bold text-white">Need Quick Advice?</h4>
              <p className="text-xs text-gray-300">
                Speak directly with our destination specialist on WhatsApp for hotel rates, visa assistance, and flight options.
              </p>
              <a
                href={`https://wa.me/923153171263?text=Assalamu%20Alaikum,%20I%20would%20like%20to%20inquire%20about%20traveling%20to%20${encodeURIComponent(destination.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs hover:bg-[#20ba59] transition-colors"
              >
                <span>WhatsApp Destination Desk</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        defaultDestination={destination.name}
      />
    </div>
  );
};
