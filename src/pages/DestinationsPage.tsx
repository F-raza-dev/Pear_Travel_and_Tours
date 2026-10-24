import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { destinationsData } from '../data/travelData';
import { Search, MapPin, Compass, ArrowRight } from 'lucide-react';
import { useDocumentTitleAndSEO } from '../lib/seo';

export const DestinationsPage: React.FC = () => {
  useDocumentTitleAndSEO({
    title: 'Top Destinations',
    description: 'Explore handpicked destinations including Northern Pakistan (Hunza, Skardu), Dubai, Istanbul, and the holy cities of Makkah and Madinah.',
    canonicalPath: '/destinations',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const regions = ['All', 'Pakistan', 'Middle East', 'Europe'];

  const filteredDestinations = destinationsData.filter((dest) => {
    const matchesRegion = selectedRegion === 'All' || dest.region === selectedRegion;
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen">
      <Breadcrumbs items={[{ name: 'Destinations' }]} />

      {/* Header Banner */}
      <section className="bg-[#00264D] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest uppercase text-[#F4B400] bg-white/10 px-3 py-1 rounded-full border border-white/20">
            Inspiring Places
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Explore <span className="text-[#F4B400]">Destinations</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto">
            From the soaring heights of the Karakoram to historic world crossroads and spiritual sanctuaries.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto pt-4">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, country or attraction..."
                className="w-full bg-white text-[#353B45] text-sm rounded-full pl-11 pr-4 py-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F4B400]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Region Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {regions.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => setSelectedRegion(region)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedRegion === region
                  ? 'bg-[#00264D] text-[#F4B400] shadow-md'
                  : 'bg-[#F5F6F8] text-[#353B45] hover:bg-gray-200'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-16 bg-[#F5F6F8] rounded-3xl p-8 max-w-md mx-auto border border-gray-200">
            <Compass className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#00264D]">No destinations found</h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              We couldn't find any location matching "{searchQuery}".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('All');
              }}
              className="px-4 py-2 rounded-full bg-[#003566] text-white text-xs font-semibold hover:bg-[#00264D]"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => (
              <div
                key={dest.id}
                className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  <span className="absolute top-4 left-4 bg-[#00264D]/80 backdrop-blur-md text-[#F4B400] text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                    {dest.region}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-gray-200 mb-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#F4B400]" />
                      <span>{dest.country}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white drop-shadow-sm">
                      {dest.name}
                    </h3>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-[#003566] italic mb-2">
                      “{dest.tagline}”
                    </p>
                    <p className="text-xs text-[#777F8A] leading-relaxed line-clamp-2">
                      {dest.description}
                    </p>

                    {/* Highlights bullet points */}
                    <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                        Highlights
                      </span>
                      {dest.highlights.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#353B45]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400]" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      Best season: <span className="font-semibold text-gray-600">{dest.bestTimeToVisit}</span>
                    </span>
                    <Link
                      to={`/destinations/${dest.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#003566] hover:text-[#F4B400] transition-colors"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
