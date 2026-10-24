import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { 
  Mountain, Globe, Moon, Building2, Plane, Heart, Users, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { InquiryModal } from '../components/common/InquiryModal';
import { TravelServiceType } from '../types/travel';
import { useDocumentTitleAndSEO } from '../lib/seo';

export const ServicesPage: React.FC = () => {
  useDocumentTitleAndSEO({
    title: 'Our Travel & Tour Services',
    description: 'Explore full travel solutions by Pearl Travel & Tours: Northern Pakistan expeditions, Dubai & Türkiye holidays, Umrah pilgrimages, flight ticketing, and hotel reservations.',
    canonicalPath: '/services',
  });

  const [activeModalService, setActiveModalService] = useState<TravelServiceType | null>(null);

  const services = [
    {
      id: 'domestic',
      serviceType: 'Domestic Tour' as TravelServiceType,
      title: 'Domestic Tour Planning (Northern Pakistan)',
      subtitle: 'Hunza, Skardu, Swat, Fairy Meadows & Neelum Valley',
      icon: <Mountain className="w-8 h-8 text-[#003566]" />,
      description: 'Discover the breathtaking alpine landscapes of Pakistan with experienced local mountain drivers, luxury 4x4 Prado or Grand Cabin vehicles, and verified mountain hotel accommodations.',
      features: [
        'Dedicated 4x4 mountain vehicles with fuel and toll taxes included',
        'Handpicked valley hotels with heating, generator backup, and hot water',
        'Expert guidance on seasonal road conditions (Karakoram Highway / Babusar)',
        'Custom itineraries for families, couples, and photography expeditions',
      ],
      image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'international',
      serviceType: 'International Tour' as TravelServiceType,
      title: 'International Tour Planning',
      subtitle: 'Dubai, Türkiye, Malaysia, Thailand, Baku & Beyond',
      icon: <Globe className="w-8 h-8 text-[#003566]" />,
      description: 'Turn your overseas holiday dreams into reality. We manage your tourist visas, airport transfers, city tours, attraction passes (Burj Khalifa, Bosphorus Cruise), and premium central stays.',
      features: [
        'Fast visa processing assistance for UAE, Türkiye, Malaysia, and Azerbaijan',
        'Curated city tours with English/Urdu speaking guides',
        'Centrally located hotels near public transit and halal dining',
        'Emergency 24/7 travel coordination while abroad',
      ],
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'umrah',
      serviceType: 'Umrah Package' as TravelServiceType,
      title: 'Umrah Travel & Sacred Pilgrimages',
      subtitle: 'Makkah Mukarramah & Madinah Al-Munawwarah',
      icon: <Moon className="w-8 h-8 text-[#003566]" />,
      description: 'Perform your sacred Umrah with tranquility. We arrange authorized electronic tourist/Umrah visas, walk-in distance clock tower and Markaziyah hotels, and reliable private ground transfers.',
      features: [
        'Electronic Saudi Umrah tourist visas with medical health insurance',
        'Hotels within 100m to 300m walking distance to Masjid Al-Haram & Masjid an-Nabawi',
        'Private VIP AC coach and Haramain High-Speed Train bookings',
        'Comprehensive guided Ziyarat tours to sacred historical sites',
      ],
      image: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'hotels',
      serviceType: 'Hotel Booking' as TravelServiceType,
      title: 'Hotel & Resort Reservations',
      subtitle: 'Competitive corporate & leisure rates worldwide',
      icon: <Building2 className="w-8 h-8 text-[#003566]" />,
      description: 'Access wholesale discounted rates at premier 3-star, 4-star, and 5-star properties across major Pakistani cities and international hubs without hidden surcharge.',
      features: [
        'Direct partnerships in Karachi, Lahore, Islamabad, Dubai, Makkah, and Istanbul',
        'Verified room availability and breakfast inclusions',
        'Flexible cancellation policies on eligible corporate bookings',
        'Immediate electronic hotel vouchers for visa submission',
      ],
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'flights',
      serviceType: 'Flight Assistance' as TravelServiceType,
      title: 'Flight Booking Inquiries & Ticketing',
      subtitle: 'Domestic & International Airlines Support',
      icon: <Plane className="w-8 h-8 text-[#003566]" />,
      description: 'Let our flight ticketing team find optimal routes, baggage allowances, and convenient flight connections on Emirates, PIA, Saudia, Turkish Airlines, Serene Air, and Flydubai.',
      features: [
        'Best fare comparisons across multiple scheduled airlines',
        'Assistance with seat selection, extra baggage, and infant tickets',
        'Date change and ticket reissuance assistance',
        'Convenient flight itinerary quotations for visa applications',
      ],
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'custom',
      serviceType: 'Customized Holiday' as TravelServiceType,
      title: 'Customized Family Holidays & Corporate Trips',
      subtitle: 'Tailor-made itineraries designed exclusively for you',
      icon: <Users className="w-8 h-8 text-[#003566]" />,
      description: 'Every traveler is unique. Whether you are arranging an annual corporate team-building retreat, a romantic honeymoon, or a multi-generational family vacation, we build your trip from scratch.',
      features: [
        'Flexible pacing tailored around young children and seniors',
        'Private vehicles, personalized dining preferences, and special celebrations',
        'Group corporate discounts on conferences, transport, and banquet dinners',
        'Detailed day-by-day travel master dossier provided prior to departure',
      ],
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="bg-[#F5F6F8] min-h-screen">
      <Breadcrumbs items={[{ name: 'Our Services' }]} />

      {/* Header Banner */}
      <section className="bg-[#00264D] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest uppercase text-[#F4B400] bg-white/10 px-3 py-1 rounded-full border border-white/20">
            Complete Travel Solutions
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Our Travel <span className="text-[#F4B400]">Services</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto">
            From mountain valleys to international capitals and sacred shrines, Pearl Travel & Tours delivers seamless journeys with verified quality.
          </p>
        </div>
      </section>

      {/* Service Blocks */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {services.map((srv, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <div
              key={srv.id}
              className={`bg-white rounded-3xl overflow-hidden shadow-xs border border-gray-100 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 p-6 sm:p-10 ${
                isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Media */}
              <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : ''}`}>
                <div className="relative rounded-2xl overflow-hidden h-[300px] sm:h-[350px] shadow-md">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-xs text-[#F4B400] font-bold block">{srv.subtitle}</span>
                    <h3 className="text-lg font-bold">{srv.title}</h3>
                  </div>
                </div>
              </div>

              {/* Text & Points */}
              <div className={`lg:col-span-7 space-y-5 ${isEven ? 'lg:order-1' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#003566]/10 flex items-center justify-center shrink-0">
                    {srv.icon}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#00264D]">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-[#003566] font-semibold">{srv.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm text-[#353B45] leading-relaxed">
                  {srv.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {srv.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveModalService(srv.serviceType)}
                    className="px-6 py-3 rounded-xl bg-[#F4B400] hover:bg-[#e0a300] text-[#00264D] font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-2"
                  >
                    <span>Inquire About This Service</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Inquiry Modal */}
      {activeModalService && (
        <InquiryModal
          isOpen={true}
          onClose={() => setActiveModalService(null)}
          defaultService={activeModalService}
        />
      )}
    </div>
  );
};
