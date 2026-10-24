import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FileText, ShieldAlert, CheckCircle } from 'lucide-react';
import { useDocumentTitleAndSEO } from '../lib/seo';

export const TermsPage: React.FC = () => {
  useDocumentTitleAndSEO({
    title: 'Terms & Conditions',
    description: 'Terms and Conditions of Pearl Travel & Tours governing inquiries, quotation proposals, booking agreements, and travel agency responsibilities.',
    canonicalPath: '/terms',
  });

  return (
    <div className="bg-[#F5F6F8] min-h-screen pb-20">
      <Breadcrumbs items={[{ name: 'Terms & Conditions' }]} />

      <section className="bg-[#00264D] text-white py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-[#F4B400]">Agency Agreement</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Terms & Conditions</h1>
          <p className="text-xs sm:text-sm text-gray-200">
            Please read these terms carefully before engaging our travel and tour services.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xs border border-gray-200 space-y-8 text-[#353B45] text-sm leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#00264D]">1. Nature of Online Inquiries</h2>
            <p>
              Submission of an inquiry via <code>pearltravelandtours.com</code> represents an initial request for quotation and trip feasibility analysis. It does NOT constitute a confirmed booking, contract of carriage, or guaranteed hotel reservation until an agreed itinerary voucher has been signed and confirmed by both parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#00264D]">2. Pricing & Quotations</h2>
            <p>
              All prices quoted on the website or via preliminary quotation are indicative estimates based on current hotel tariffs, fuel rates, and airline taxes in Pakistani Rupees (PKR) or specified foreign currencies. Final package prices are locked upon receipt of the mutually agreed booking advance payment.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#00264D]">3. Visas and Travel Documents</h2>
            <p>
              While Pearl Travel & Tours assists with visa applications (including Saudi Umrah visas, UAE tourist visas, and Türkiye e-Visas), the decision to grant or refuse a visa rests exclusively with the sovereign government immigration authorities of the respective country. We are not liable for consular delays or visa refusals.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#00264D]">4. Itinerary Adjustments & Force Majeure</h2>
            <p>
              Due to natural conditions in high-altitude zones such as Gilgit-Baltistan (landslides, heavy snowfall, Karakoram Highway closures) or airline schedule modifications, Pearl Travel & Tours reserves the right to alter the route or sequence of sightseeing in the interest of traveler safety.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#00264D]">5. Traveler Responsibilities</h2>
            <p>
              Travelers must ensure their passports have at least 6 months validity from the scheduled return date. Travelers are responsible for their personal belongings, luggage, and compliance with local laws and religious customs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#00264D]">6. Governing Law & Accreditation</h2>
            <p>
              Pearl Travel & Tours is a registered and licensed travel agency authorized by the Government of Pakistan Ministry of Tourism / Department of Tourist Services under License <strong>GL# 6190</strong>. These terms are governed by the laws of the Islamic Republic of Pakistan. Any matters arising in connection with our tour services shall be subject to the jurisdiction of the competent courts of Hyderabad, Sindh, Pakistan.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};
