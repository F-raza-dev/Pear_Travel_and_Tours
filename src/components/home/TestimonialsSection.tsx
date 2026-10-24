import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { testimonialsData } from '../../data/travelData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#F5F6F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-[#003566] bg-white px-3 py-1 rounded-full border border-gray-200">
            Client Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#00264D] mt-3">
            What Our Clients Say
          </h2>
          <p className="text-base text-[#777F8A] mt-2">
            Read authentic feedback from travelers who explored Pakistan and beyond with us.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-8 shadow-xs hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F4B400] text-[#F4B400]" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-gray-200 group-hover:text-[#F4B400]/40 transition-colors" />
                </div>

                <p className="text-sm text-[#353B45] italic leading-relaxed mb-6">
                  “{item.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#00264D] flex items-center gap-1.5">
                    <span>{item.clientName}</span>
                    {item.verified && (
                      <span title="Verified Traveler">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {item.location} • <span className="text-[#003566] font-medium">{item.tourName}</span>
                  </p>
                </div>
                <span className="text-[11px] text-gray-400 shrink-0">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
