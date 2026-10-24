import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Compass, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { validateTravelDates } from '../../utils/travelLogic';

interface HeroSectionProps {
  onQuickInquire?: (params: { destination: string; serviceType: string }) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onQuickInquire }) => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [travelType, setTravelType] = useState('Domestic Tours');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [dateError, setDateError] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setDateError(null);

    if (departureDate) {
      const check = validateTravelDates(departureDate, returnDate || undefined);
      if (!check.valid) {
        setDateError(check.error || 'Invalid date range');
        return;
      }
    }

    if (onQuickInquire && destination) {
      onQuickInquire({ destination, serviceType: travelType });
      return;
    }

    // Navigate to packages with query params
    const params = new URLSearchParams();
    if (destination) params.set('q', destination);
    if (travelType) params.set('category', travelType);
    navigate(`/packages?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[640px] lg:min-h-[700px] flex items-center justify-center overflow-hidden bg-[#00264D]">
      {/* Background panoramic image with subtle dark overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=85')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#00264D]/90 via-[#00264D]/75 to-[#00264D]/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-white text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F4B400] text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore the World with Pearl</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Explore The <span className="text-[#F4B400] underline decoration-[#F4B400]/40 decoration-4 underline-offset-8">World</span> Today
            </h1>

            <p className="text-base sm:text-lg text-gray-200 max-w-2xl leading-relaxed">
              Discover unforgettable destinations, carefully selected stays, and travel experiences designed around you. From the majestic peaks of Northern Pakistan to luxurious Dubai retreats and sacred Umrah journeys.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={() => navigate('/booking')}
                className="px-8 py-3.5 rounded-full bg-[#F4B400] text-[#00264D] font-bold text-base shadow-lg hover:bg-[#e0a300] hover:shadow-xl transition-all duration-200 active:scale-95 flex items-center gap-2"
              >
                <span>Book Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/packages')}
                className="px-6 py-3.5 rounded-full bg-white/10 backdrop-blur-md text-white font-semibold text-base border border-white/30 hover:bg-white/20 transition-all duration-200"
              >
                Explore Packages
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-4 text-xs text-gray-300 text-left">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F4B400] shrink-0" />
                <span>Verified Travel Agency</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#F4B400] shrink-0" />
                <span>Tailored Itineraries</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F4B400] shrink-0" />
                <span>Transparent Pricing</span>
              </div>
            </div>
          </div>

          {/* Right Column: Compact Modern Travel Search Panel */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 text-[#353B45]">
              <div className="border-b border-gray-100 pb-4 mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#003566]">Plan Your Trip</span>
                <h3 className="text-xl font-bold text-[#00264D] mt-0.5">Find Your Journey</h3>
              </div>

              {dateError && (
                <div className="mb-4 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                  {dateError}
                </div>
              )}

              <form onSubmit={handleSearch} className="space-y-4">
                {/* Destination */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Destination</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="e.g. Hunza, Dubai, Istanbul, Makkah"
                      className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 pl-10 pr-4 py-3 focus:ring-2 focus:ring-[#F4B400] focus:border-[#F4B400] outline-none"
                    />
                  </div>
                </div>

                {/* Travel Type */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Travel Type</label>
                  <div className="relative">
                    <Compass className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <select
                      value={travelType}
                      onChange={(e) => setTravelType(e.target.value)}
                      className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 pl-10 pr-4 py-3 focus:ring-2 focus:ring-[#F4B400] focus:border-[#F4B400] outline-none bg-white cursor-pointer"
                    >
                      <option value="Domestic Tours">Domestic Tours (Northern Pakistan)</option>
                      <option value="International Tours">International Tours (Dubai, Turkey)</option>
                      <option value="Umrah">Umrah Pilgrimage</option>
                      <option value="Hotels">Hotels & Stays</option>
                      <option value="Flight Booking">Flight Assistance</option>
                    </select>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Departure</label>
                    <div className="relative">
                      <Calendar className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="w-full text-xs rounded-xl border border-gray-200 pl-8 pr-2 py-3 focus:ring-2 focus:ring-[#F4B400] focus:border-[#F4B400] outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Return</label>
                    <div className="relative">
                      <Calendar className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full text-xs rounded-xl border border-gray-200 pl-8 pr-2 py-3 focus:ring-2 focus:ring-[#F4B400] focus:border-[#F4B400] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Number of Travelers */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Number of Travelers</label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
                    className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-[#F4B400] focus:border-[#F4B400] outline-none bg-white cursor-pointer"
                  >
                    <option value={1}>1 Traveler (Solo)</option>
                    <option value={2}>2 Travelers (Couple)</option>
                    <option value={4}>3 - 4 Travelers (Small Family)</option>
                    <option value={6}>5 - 8 Travelers (Family Group)</option>
                    <option value={10}>10+ Travelers (Corporate / Large Group)</option>
                  </select>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#F4B400] hover:bg-[#e0a300] text-[#00264D] font-bold text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2 mt-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Find My Trip</span>
                </button>
              </form>

              <p className="text-[11px] text-gray-400 text-center mt-3">
                Transparent quotes • Fast inquiry turnaround • No hidden charges
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
