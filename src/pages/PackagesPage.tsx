import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { packagesData } from '../data/travelData';
import { TourPackage } from '../types/travel';
import { Search, MapPin, Clock, Filter, Compass, ArrowUpDown } from 'lucide-react';
import { InquiryModal } from '../components/common/InquiryModal';
import { useDocumentTitleAndSEO } from '../lib/seo';

export const PackagesPage: React.FC = () => {
  useDocumentTitleAndSEO({
    title: 'Tour Packages & Holiday Itineraries',
    description: 'Explore Northern Pakistan road trips, Dubai getaways, luxury Umrah packages, and international vacation packages with Pearl Travel & Tours.',
    canonicalPath: '/packages',
  });

  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'All';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'durationAsc' | 'durationDesc' | 'title'>('featured');
  const [selectedPackageForInquiry, setSelectedPackageForInquiry] = useState<TourPackage | null>(null);

  const categories = [
    'All',
    'Northern Pakistan',
    'Dubai Getaway',
    'Umrah',
    'International',
  ];

  const filteredPackages = useMemo(() => {
    let result = packagesData.filter((pkg) => {
      if (!pkg.published) return false;

      // Category matching
      if (selectedCategory !== 'All') {
        const catLow = selectedCategory.toLowerCase();
        if (catLow.includes('domestic') || catLow.includes('northern')) {
          if (pkg.category !== 'Northern Pakistan') return false;
        } else if (catLow.includes('dubai')) {
          if (pkg.category !== 'Dubai Getaway') return false;
        } else if (catLow.includes('umrah')) {
          if (pkg.category !== 'Umrah') return false;
        } else if (catLow.includes('international')) {
          if (pkg.category !== 'International' && pkg.category !== 'Dubai Getaway') return false;
        } else if (pkg.category.toLowerCase() !== catLow) {
          return false;
        }
      }

      // Query matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = pkg.title.toLowerCase().includes(q);
        const matchDest = pkg.destinationName.toLowerCase().includes(q);
        const matchDesc = pkg.shortDescription.toLowerCase().includes(q);
        const matchCountry = pkg.country.toLowerCase().includes(q);
        if (!matchTitle && !matchDest && !matchDesc && !matchCountry) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    if (sortBy === 'durationAsc') {
      result.sort((a, b) => a.durationDays - b.durationDays);
    } else if (sortBy === 'durationDesc') {
      result.sort((a, b) => b.durationDays - a.durationDays);
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="bg-[#F5F6F8] min-h-screen">
      <Breadcrumbs items={[{ name: 'Tour Packages' }]} />

      {/* Hero Header */}
      <section className="bg-[#00264D] text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest uppercase text-[#F4B400] bg-white/10 px-3 py-1 rounded-full border border-white/20">
            Handcrafted Travel Experiences
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Tour <span className="text-[#F4B400]">Packages</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto">
            Choose from guided mountain safaris, cultural journeys, sacred Umrah pilgrimages, and Dubai city breaks.
          </p>

          {/* Search Box */}
          <div className="max-w-md mx-auto pt-2">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search package by title, valley, or country..."
                className="w-full bg-white text-[#353B45] text-sm rounded-full pl-11 pr-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-[#F4B400]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Controls: Filter & Sort */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl shadow-xs border border-gray-100">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <span className="text-xs font-bold text-gray-400 uppercase mr-1 hidden sm:inline">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#003566] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2 text-xs text-gray-500 self-end md:self-auto shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#003566]" />
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-[#00264D] font-medium outline-none focus:ring-1 focus:ring-[#F4B400]"
            >
              <option value="featured">Featured First</option>
              <option value="durationAsc">Duration (Shortest first)</option>
              <option value="durationDesc">Duration (Longest first)</option>
              <option value="title">Alphabetical (A - Z)</option>
            </select>
          </div>
        </div>

        {/* Package Grid */}
        {filteredPackages.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl p-8 max-w-md mx-auto border border-gray-200 shadow-xs">
            <Filter className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#00264D]">No packages found</h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              We couldn't find any packages matching your filter criteria.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-full bg-[#003566] text-white text-xs font-semibold hover:bg-[#00264D]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <span className="absolute top-3 left-3 bg-[#00264D]/85 backdrop-blur-md text-[#F4B400] text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                    {pkg.category}
                  </span>

                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                    <Clock className="w-3.5 h-3.5 text-[#F4B400]" />
                    <span>{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#003566]" />
                      <span>{pkg.destinationName}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[#00264D] group-hover:text-[#003566] transition-colors leading-snug">
                      {pkg.title}
                    </h3>

                    <p className="text-xs text-[#777F8A] mt-2 line-clamp-3 leading-relaxed">
                      {pkg.shortDescription}
                    </p>
                  </div>

                  {/* Highlights pills */}
                  <div className="pt-2">
                    <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Stay / Inclusions</span>
                    <span className="inline-block text-[11px] bg-[#F5F6F8] text-gray-700 px-2.5 py-1 rounded-md">
                      {pkg.accommodationType}
                    </span>
                  </div>

                  {/* Price & Actions */}
                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[11px] text-gray-400 uppercase font-semibold">Starting Price</span>
                      <span className="text-sm font-extrabold text-[#003566]">
                        {pkg.priceDisplay}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to={`/packages/${pkg.slug}`}
                        className="py-2.5 px-3 rounded-xl border border-gray-300 hover:bg-gray-50 text-[#00264D] font-bold text-xs text-center transition-colors"
                      >
                        Full Details
                      </Link>
                      <button
                        type="button"
                        onClick={() => setSelectedPackageForInquiry(pkg)}
                        className="py-2.5 px-3 rounded-xl bg-[#F4B400] hover:bg-[#e0a300] text-[#00264D] font-bold text-xs text-center transition-colors flex items-center justify-center gap-1.5"
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
        )}

      </section>

      {/* Inquiry Modal */}
      {selectedPackageForInquiry && (
        <InquiryModal
          isOpen={true}
          onClose={() => setSelectedPackageForInquiry(null)}
          defaultService={
            selectedPackageForInquiry.category === 'Umrah'
              ? 'Umrah Package'
              : selectedPackageForInquiry.category === 'Northern Pakistan'
              ? 'Domestic Tour'
              : 'International Tour'
          }
          defaultDestination={selectedPackageForInquiry.destinationName}
          itemReferenceId={selectedPackageForInquiry.id}
          itemReferenceName={selectedPackageForInquiry.title}
        />
      )}
    </div>
  );
};
