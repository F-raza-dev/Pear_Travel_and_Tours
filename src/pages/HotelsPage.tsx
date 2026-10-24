import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { hotelsData } from '../data/travelData';
import { Hotel } from '../types/travel';
import { Search, Star, MapPin, Check, Building2, Phone } from 'lucide-react';
import { InquiryModal } from '../components/common/InquiryModal';
import { useDocumentTitleAndSEO } from '../lib/seo';

export const HotelsPage: React.FC = () => {
  useDocumentTitleAndSEO({
    title: 'Hotels & Resort Reservations',
    description: 'Book luxury and executive hotels in Dubai, Makkah, Madinah, Islamabad, Lahore, and Karachi with Pearl Travel & Tours.',
    canonicalPath: '/hotels',
  });

  const [activeCity, setActiveCity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHotelForInquiry, setSelectedHotelForInquiry] = useState<Hotel | null>(null);

  const cities = ['All', 'Dubai', 'Makkah', 'Madinah', 'Islamabad', 'Lahore', 'Karachi'];

  const filteredHotels = hotelsData.filter((hotel) => {
    if (!hotel.published) return false;
    const matchCity = activeCity === 'All' || hotel.city.toLowerCase() === activeCity.toLowerCase();
    const matchSearch =
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCity && matchSearch;
  });

  return (
    <div className="bg-[#F5F6F8] min-h-screen">
      <Breadcrumbs items={[{ name: 'Hotels' }]} />

      {/* Header Banner */}
      <section className="bg-[#00264D] text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest uppercase text-[#F4B400] bg-white/10 px-3 py-1 rounded-full border border-white/20">
            Handpicked Stays
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Our <span className="text-[#F4B400]">Hotels</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto">
            Find comfortable stays for your next destination. Premium clock-tower towers in Makkah, five-star downtown Dubai resorts, and executive hotels across Pakistan.
          </p>

          {/* Search Input */}
          <div className="max-w-md mx-auto pt-2">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hotel name, city or area..."
                className="w-full bg-white text-[#353B45] text-sm rounded-full pl-11 pr-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-[#F4B400]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* City Filters & Hotel Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* City Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {cities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => setActiveCity(city)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeCity === city
                  ? 'bg-[#003566] text-[#F4B400] shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Results */}
        {filteredHotels.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl p-8 max-w-md mx-auto border border-gray-200 shadow-xs">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#00264D]">No hotels found</h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              We couldn't find any hotel matching your search filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCity('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-full bg-[#003566] text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
              >
                {/* Photo */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 px-2.5 py-1 rounded-full text-xs font-bold text-[#00264D] flex items-center gap-1 shadow">
                    <Star className="w-3.5 h-3.5 fill-[#F4B400] text-[#F4B400]" />
                    <span>{hotel.stars} Star</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#F4B400]" />
                    <span>{hotel.city}, {hotel.country}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#00264D] group-hover:text-[#003566] transition-colors leading-snug">
                      {hotel.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                      {hotel.address}
                    </p>
                    <p className="text-xs text-[#777F8A] mt-2 line-clamp-2 leading-relaxed">
                      {hotel.description}
                    </p>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {hotel.amenities.slice(0, 3).map((amenity, i) => (
                        <span key={i} className="inline-flex items-center gap-1 text-[11px] bg-[#F5F6F8] text-gray-700 px-2 py-0.5 rounded-md">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>{amenity}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 block font-semibold uppercase">Pricing</span>
                      <span className="text-sm font-extrabold text-[#003566]">{hotel.priceDisplay}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/hotels/${hotel.slug}`}
                        className="px-3 py-2 text-xs font-semibold text-gray-600 hover:text-[#003566]"
                      >
                        Details
                      </Link>
                      <button
                        type="button"
                        onClick={() => setSelectedHotelForInquiry(hotel)}
                        className="px-4 py-2 rounded-xl bg-[#F4B400] hover:bg-[#e0a300] text-[#00264D] font-bold text-xs transition-colors flex items-center gap-1.5"
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Inquire</span>
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
      {selectedHotelForInquiry && (
        <InquiryModal
          isOpen={true}
          onClose={() => setSelectedHotelForInquiry(null)}
          defaultService="Hotel Booking"
          defaultDestination={`${selectedHotelForInquiry.city}, ${selectedHotelForInquiry.country}`}
          itemReferenceId={selectedHotelForInquiry.id}
          itemReferenceName={selectedHotelForInquiry.name}
        />
      )}
    </div>
  );
};
