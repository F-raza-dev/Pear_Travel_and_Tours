import React from 'react';
import { Mail, Compass } from 'lucide-react';
import { teamMembersData } from '../../data/travelData';
import { buildWhatsAppUrl } from '../../utils/travelLogic';

export const TravelGuides: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-[#003566] bg-[#003566]/10 px-3 py-1 rounded-full">
            Our Specialists
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#00264D] mt-3">
            Meet Our Travel Guides
          </h2>
          <p className="text-base text-[#777F8A] mt-2">
            Experienced consultants and local expedition leaders dedicated to your safety and satisfaction.
          </p>
        </div>

        {/* 3 Circular / Oval Portrait Cards from Reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {teamMembersData.map((guide) => (
            <div
              key={guide.id}
              className="flex flex-col items-center text-center p-6 rounded-3xl bg-[#F5F6F8] hover:bg-white border border-gray-100 hover:border-gray-200 shadow-xs hover:shadow-xl transition-all duration-300 group"
            >
              {/* Circular / Oval Portrait with Gold Accent Ring */}
              <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full overflow-hidden mb-6 border-4 border-white group-hover:border-[#F4B400] shadow-md transition-all duration-300">
                <img
                  src={guide.image}
                  alt={guide.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Guide Info */}
              <h3 className="text-xl font-bold text-[#00264D]">
                {guide.name}
              </h3>
              
              <p className="text-xs font-semibold text-[#003566] mt-1 bg-white px-3 py-1 rounded-full border border-gray-200">
                {guide.role}
              </p>

              <span className="text-xs text-[#F4B400] font-bold mt-2">
                Specialty: {guide.specialty}
              </span>

              <p className="text-xs text-[#777F8A] mt-3 leading-relaxed max-w-xs">
                {guide.bio}
              </p>

              {/* Contact Button */}
              <div className="mt-5 pt-4 border-t border-gray-200 w-full flex items-center justify-center gap-3">
                <a
                  href={`mailto:${guide.email}`}
                  className="p-2 rounded-full bg-white text-gray-600 hover:text-[#003566] hover:bg-gray-100 transition-colors shadow-xs"
                  title={`Email ${guide.name}`}
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href={buildWhatsAppUrl('923153171263', `Assalamu Alaikum ${guide.name}, I would like advice on planning a trip.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-full bg-[#00264D] hover:bg-[#003566] text-[#F4B400] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Consult Guide</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
