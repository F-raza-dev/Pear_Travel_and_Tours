import React from 'react';
import { Tag, CalendarCheck, Headset } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Tag className="w-8 h-8 text-[#003566]" />,
      title: 'Competitive Prices',
      description: 'Discover suitable travel options with transparent pricing, clear itinerary inclusions, and no hidden or invented fees.',
    },
    {
      icon: <CalendarCheck className="w-8 h-8 text-[#003566]" />,
      title: 'Easy Booking',
      description: 'Send your travel requirements through a simple, user-friendly inquiry process. Receive personalized quotations via WhatsApp & email.',
    },
    {
      icon: <Headset className="w-8 h-8 text-[#003566]" />,
      title: 'Dedicated Travel Support',
      description: 'Benefit from attentive, real-time trip coordination from before departure through your safe return home.',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-[#F5F6F8] hover:bg-white border border-transparent hover:border-gray-200 transition-all duration-300 shadow-xs hover:shadow-md group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white group-hover:bg-[#F4B400]/20 flex items-center justify-center shadow-xs transition-colors mb-5 border border-gray-100">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#00264D] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[#777F8A] leading-relaxed max-w-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
