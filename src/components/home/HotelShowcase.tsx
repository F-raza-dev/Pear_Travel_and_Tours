import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Check, Building2 } from 'lucide-react';
import { hotelsData } from '../../data/travelData';
import { Hotel } from '../../types/travel';
import { InquiryModal } from '../common/InquiryModal';

export const HotelShowcase: React.FC = () => {
  const [activeCity, setActiveCity] = useState('All');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const cities = ['All', 'Dubai', 'Makkah', 'Madinah', 'Islamabad', 'Lahore', 'Karachi'];

  const filteredHotels = activeCity === 'All'
    ? hotelsData
    : hotelsData.filter(h => h.city.toLowerCase() === activeCity.toLowerCase());

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-[#003566] bg-[#003566]/10 px-3 py-1 rounded-full">
            Premium Stays
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#00264D] mt-3">
            Our Hotels
          </h2>
          <p className="text-base text-[#777F8A] mt-2">
            Find comfortable stays for your next destination.
          </p>
        </div>

        {/* City Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {cities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => setActiveCity(city)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeCity === city
                  ? 'bg-[#00264D] text-[#F4B400] shadow-md'
                  : 'bg-[#F5F6F8] text-[#353B45] hover:bg-gray-200'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Hotel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col group"
            >
              {/* Hotel Photo */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold text-[#00264D] flex items-center gap-1 shadow">
                  <Star className="w-3.5 h-3.5 fill-[#F4B400] text-[#F4B400]" />
                  <span>{hotel.stars} Star</span>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#F4B400]" />
                  <span>{hotel.city}, {hotel.country}</span>
                </div>
              </div>

              {/* Hotel Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#00264D] group-hover:text-[#003566] transition-colors leading-snug">
                    {hotel.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                    {hotel.address}
                  </p>
                  <p className="text-xs text-[#777F8A] mt-2 line-clamp-2 leading-relaxed">
                    {hotel.description}
                  </p>

                  {/* Amenities Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {hotel.amenities.slice(0, 3).map((amenity, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-[11px] bg-[#F5F6F8] text-gray-700 px-2 py-0.5 rounded-md">
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>{amenity}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and Inquiry Action */}
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
                      onClick={() => setSelectedHotel(hotel)}
                      className="px-4 py-2 rounded-xl bg-[#F4B400] hover:bg-[#e0a300] text-[#00264D] font-bold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Inquire Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all hotels button */}
        <div className="text-center mt-12">
          <Link
            to="/hotels"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-[#003566] text-[#003566] font-semibold text-sm hover:bg-[#003566] hover:text-white transition-all duration-200"
          >
            Explore All Partner Stays
          </Link>
        </div>

      </div>

      {/* Inquiry Modal */}
      {selectedHotel && (
        <InquiryModal
          isOpen={true}
          onClose={() => setSelectedHotel(null)}
          defaultService="Hotel Booking"
          defaultDestination={`${selectedHotel.city}, ${selectedHotel.country}`}
          itemReferenceId={selectedHotel.id}
          itemReferenceName={selectedHotel.name}
        />
      )}
    </section>
  );
};
