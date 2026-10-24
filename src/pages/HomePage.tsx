import React, { useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { GovtCertification } from '../components/home/GovtCertification';
import { TopDestinations } from '../components/home/TopDestinations';
import { FeaturedPackages } from '../components/home/FeaturedPackages';
import { HotelShowcase } from '../components/home/HotelShowcase';
import { ExoticPlacesGallery } from '../components/home/ExoticPlacesGallery';
import { AboutSnippet } from '../components/home/AboutSnippet';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { TravelGuides } from '../components/home/TravelGuides';
import { CallToAction } from '../components/home/CallToAction';
import { InquiryModal } from '../components/common/InquiryModal';
import { useDocumentTitleAndSEO } from '../lib/seo';
import { TravelServiceType } from '../types/travel';

export const HomePage: React.FC = () => {
  useDocumentTitleAndSEO({
    title: 'Pearl Travel & Tours — Govt. Licensed Agency GL# 6190 | Tours & Umrah',
    description: 'Pearl Travel & Tours is a Government of Pakistan Ministry of Tourism licensed travel agency (GL# 6190) based in Hyderabad offering Northern Pakistan tours, Umrah, Dubai getaways, and B2B services.',
    canonicalPath: '/',
  });

  const [quickInquiryParams, setQuickInquiryParams] = useState<{
    destination: string;
    serviceType: string;
  } | null>(null);

  const handleQuickInquire = (params: { destination: string; serviceType: string }) => {
    setQuickInquiryParams(params);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Section A: Hero banner and travel search */}
      <HeroSection onQuickInquire={handleQuickInquire} />

      {/* Section B: Why choose Pearl Travel & Tours? */}
      <WhyChooseUs />

      {/* Dedicated Government Licensing & Certification Section */}
      <GovtCertification />

      {/* Section C: Top destinations */}
      <TopDestinations />

      {/* Section D: Find the perfect package */}
      <FeaturedPackages />

      {/* Section E: Hotel listings */}
      <HotelShowcase />

      {/* Section F: Exotic places / destination showcase */}
      <ExoticPlacesGallery />

      {/* Section G: About our company */}
      <AboutSnippet />

      {/* Section H: Client testimonials */}
      <TestimonialsSection />

      {/* Section I: Meet our travel guides */}
      <TravelGuides />

      {/* Section J: Final call to action */}
      <CallToAction />

      {/* Quick Search Modal */}
      {quickInquiryParams && (
        <InquiryModal
          isOpen={true}
          onClose={() => setQuickInquiryParams(null)}
          defaultDestination={quickInquiryParams.destination}
          defaultService={quickInquiryParams.serviceType as TravelServiceType}
        />
      )}
    </div>
  );
};
