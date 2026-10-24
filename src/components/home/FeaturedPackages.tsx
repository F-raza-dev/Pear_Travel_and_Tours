import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, ArrowRight, Compass } from 'lucide-react';
import { packagesData } from '../../data/travelData';
import { TourPackage } from '../../types/travel';
import { InquiryModal } from '../common/InquiryModal';

export const FeaturedPackages: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);

  return (
    <section className="py-20 bg-[#F5F6F8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#003566] bg-white px-3 py-1 rounded-full border border-gray-200">
              Curated Itineraries
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#00264D] mt-3">
              Find The Perfect Package
            </h2>
            <p className="text-base text-[#777F8A] mt-1">
              Explore memorable journeys, thoughtfully planned for every kind of traveler.
            </p>
          </div>
          <Link
            to="/packages"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#003566] hover:text-[#F4B400] transition-colors"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Tour Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packagesData.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
            >
              {/* Image & Category Tag */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Category Badge */}
                <span className="absolute top-3 left-3 bg-[#00264D]/80 backdrop-blur-md text-[#F4B400] text-[11px] font-bold px-3 py-1 rounded-full border border-white/10">
                  {pkg.category}
                </span>

                {/* Duration Badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-medium bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-[#F4B400]" />
                  <span>{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#777F8A] mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#003566]" />
                    <span>{pkg.destinationName}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#00264D] group-hover:text-[#003566] transition-colors leading-snug line-clamp-1">
                    {pkg.title}
                  </h3>

                  <p className="text-xs text-[#777F8A] mt-2 line-clamp-2 leading-relaxed">
                    {pkg.shortDescription}
                  </p>
                </div>

                {/* Price & Actions */}
                <div className="pt-3 border-t border-gray-100 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] text-gray-500 uppercase font-semibold">Starting from</span>
                    <span className="text-sm font-extrabold text-[#003566]">
                      {pkg.priceDisplay}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to={`/packages/${pkg.slug}`}
                      className="py-2.5 px-3 rounded-xl border border-gray-200 text-[#00264D] hover:bg-gray-50 font-semibold text-xs text-center transition-colors"
                    >
                      View Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className="py-2.5 px-3 rounded-xl bg-[#F4B400] hover:bg-[#e0a300] text-[#00264D] font-bold text-xs text-center transition-colors flex items-center justify-center gap-1"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Inquire Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Inquiry Modal */}
      {selectedPackage && (
        <InquiryModal
          isOpen={true}
          onClose={() => setSelectedPackage(null)}
          defaultService={
            selectedPackage.category === 'Umrah'
              ? 'Umrah Package'
              : selectedPackage.category === 'Northern Pakistan'
              ? 'Domestic Tour'
              : 'International Tour'
          }
          defaultDestination={selectedPackage.destinationName}
          itemReferenceId={selectedPackage.id}
          itemReferenceName={selectedPackage.title}
        />
      )}
    </section>
  );
};
