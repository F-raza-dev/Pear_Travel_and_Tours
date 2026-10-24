import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { exoticPlacesData } from '../../data/travelData';

export const ExoticPlacesGallery: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activePlace = exoticPlacesData[selectedIndex];

  return (
    <section className="py-20 bg-[#00264D] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-[#F4B400] bg-white/10 px-3 py-1 rounded-full border border-white/20">
            Inspiring Journeys
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            Go To <span className="text-[#F4B400]">Exotic Places</span>
          </h2>
          <p className="text-base text-gray-300 mt-2">
            Experience hand-picked landscapes that ignite your wanderlust.
          </p>
        </div>

        {/* Featured Showcase Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Large Showcase Image (8 Cols) */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden shadow-2xl h-[420px] sm:h-[480px] group border border-white/10">
            <img
              src={activePlace.image}
              alt={activePlace.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            {/* Overlay Info */}
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 space-y-3">
              <span className="inline-block px-3 py-1 bg-[#F4B400] text-[#00264D] text-xs font-bold rounded-full">
                {activePlace.subtitle}
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                {activePlace.name}
              </h3>
              <p className="text-sm sm:text-base text-gray-200 max-w-xl leading-relaxed">
                {activePlace.description}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to={`/destinations/${activePlace.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#F4B400] text-[#00264D] font-bold text-xs sm:text-sm hover:bg-[#e0a300] transition-colors shadow"
                >
                  <Compass className="w-4 h-4" />
                  <span>View Destination</span>
                </Link>
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white hover:text-[#F4B400] transition-colors"
                >
                  <span>Request Custom Itinerary</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* 4 Smaller Thumbnails (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#F4B400] mb-1">
              Select Destination
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {exoticPlacesData.map((place, idx) => {
                const isCurrent = idx === selectedIndex;
                return (
                  <button
                    key={place.id}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    className={`flex items-center gap-3 p-2.5 rounded-2xl text-left transition-all duration-300 border ${
                      isCurrent
                        ? 'bg-white/20 border-[#F4B400] shadow-md ring-1 ring-[#F4B400]'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="overflow-hidden">
                      <h4 className={`text-sm font-bold truncate ${isCurrent ? 'text-[#F4B400]' : 'text-white'}`}>
                        {place.name}
                      </h4>
                      <p className="text-xs text-gray-400 line-clamp-1">
                        {place.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
