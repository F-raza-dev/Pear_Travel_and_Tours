import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { destinationsData } from '../../data/travelData';

export const TopDestinations: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-[#003566] bg-[#003566]/10 px-3 py-1 rounded-full">
            Featured Locations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#00264D] mt-3">
            Our Top Destinations
          </h2>
          <p className="text-base text-[#777F8A] mt-2">
            Find inspiration for your next unforgettable journey.
          </p>
        </div>

        {/* 5 Destination Cards (Circular / Rounded Image treatment from reference) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {destinationsData.map((dest) => (
            <Link
              key={dest.id}
              to={`/destinations/${dest.slug}`}
              className="group flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-[#F4B400]"
            >
              {/* Circular image with hover zoom & golden ring */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 border-4 border-white group-hover:border-[#F4B400] mb-4">
                <img
                  src={dest.image}
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#00264D]/15 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-2 right-2 bg-white/90 p-1.5 rounded-full text-[#003566] opacity-0 group-hover:opacity-100 transition-opacity shadow">
                  <ArrowUpRight className="w-4 h-4 text-[#003566]" />
                </div>
              </div>

              {/* Destination Details */}
              <h3 className="text-base sm:text-lg font-bold text-[#00264D] group-hover:text-[#003566] transition-colors">
                {dest.name}
              </h3>
              <p className="text-xs text-[#777F8A] mt-1 line-clamp-2 max-w-[180px]">
                {dest.tagline}
              </p>
              
              <span className="mt-3 text-xs font-semibold text-[#003566] group-hover:text-[#F4B400] flex items-center gap-1 transition-colors">
                View Destination ›
              </span>
            </Link>
          ))}
        </div>

        {/* All destinations footer link */}
        <div className="text-center mt-12">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-[#003566] text-[#003566] font-semibold text-sm hover:bg-[#003566] hover:text-white transition-all duration-200"
          >
            Explore All Destinations
          </Link>
        </div>

      </div>
    </section>
  );
};
