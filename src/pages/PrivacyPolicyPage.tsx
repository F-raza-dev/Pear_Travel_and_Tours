import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ShieldCheck, Lock, Mail, Phone } from 'lucide-react';
import { useDocumentTitleAndSEO } from '../lib/seo';

export const PrivacyPolicyPage: React.FC = () => {
  useDocumentTitleAndSEO({
    title: 'Privacy Policy',
    description: 'Privacy Policy of Pearl Travel & Tours — details on personal data collection, booking inquiries, secure storage, and customer rights.',
    canonicalPath: '/privacy-policy',
  });

  return (
    <div className="bg-[#F5F6F8] min-h-screen pb-20">
      <Breadcrumbs items={[{ name: 'Privacy Policy' }]} />

      <section className="bg-[#00264D] text-white py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-[#F4B400]">Legal & Data Protection</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Privacy Policy</h1>
          <p className="text-xs sm:text-sm text-gray-200">
            Last Updated: October 2026 • Pearl Travel & Tours (pearltravelandtours.com)
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xs border border-gray-200 space-y-8 text-[#353B45] text-sm leading-relaxed">
          
          <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 text-xs">
            <Lock className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              Pearl Travel & Tours is committed to protecting your personal information. We never sell, lease, or rent customer personal information to unauthorized third-party marketing companies.
            </span>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#00264D]">1. Information We Collect</h2>
            <p>
              When you submit a travel inquiry, request an Umrah or holiday quotation, or contact us through our website or WhatsApp, we collect the following information:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
              <li><strong>Contact Identifiers:</strong> Full name, email address, phone / WhatsApp number.</li>
              <li><strong>Travel Specifications:</strong> Desired destinations, dates of travel, passenger count (adults/children), room requirements, budget range, and special requests.</li>
              <li><strong>Passport / Visa Documentation:</strong> Only when requested for visa issuance or airline ticket ticketing with your explicit consent.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#00264D]">2. How We Use Your Information</h2>
            <p>Your details are used exclusively for legitimate travel agency operations:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
              <li>Preparing customized travel quotations and itinerary proposals.</li>
              <li>Booking hotels, vehicle transportation, domestic flights, and issuing Umrah visas upon confirmation.</li>
              <li>Providing updates regarding trip schedules, flight notices, and emergency support.</li>
              <li>Complying with applicable Pakistani travel laws and destination government regulations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#00264D]">3. Data Security & Storage</h2>
            <p>
              We implement industry-standard administrative, technical, and physical measures to safeguard submitted information against unauthorized access, loss, or disclosure. Inquiries are stored in encrypted environments, and administrative access is strictly restricted to authorized agency staff.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#00264D]">4. Sharing with Third Parties</h2>
            <p>
              We only share your information with verified travel partners (such as designated airlines, partner hotels in Makkah, Madinah, Dubai, or mountain lodge operators in Northern Pakistan) to the extent necessary to secure your bookings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#00264D]">5. Your Data Rights & Contact</h2>
            <p>
              You have the right to request a copy of your stored records, ask for corrections, or request deletion of your information from our inquiry registry. To exercise your rights, please reach out to:
            </p>
            <div className="bg-[#F5F6F8] p-4 rounded-2xl border border-gray-200 text-xs space-y-1 text-gray-700">
              <p><strong>Pearl Travel & Tours Privacy Desk (Govt. Licensed GL# 6190)</strong></p>
              <p>Email: <a href="mailto:info@pearltravelandtours.com" className="text-[#003566] underline font-medium">info@pearltravelandtours.com</a></p>
              <p>Phone: +92 315 3171263 / +92 312 3004810</p>
              <p>Address: Shop#3 Plot#4/284, Jelani House, Sarfaraz Incline, near Bin Tayyab Hospital, Chari Hyderabad, 71000, Sindh, Pakistan</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
