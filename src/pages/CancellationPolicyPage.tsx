import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AlertTriangle, Clock, RefreshCcw, Mail } from 'lucide-react';
import { useDocumentTitleAndSEO } from '../lib/seo';

export const CancellationPolicyPage: React.FC = () => {
  useDocumentTitleAndSEO({
    title: 'Cancellation & Refund Policy',
    description: 'Cancellation and refund policies for domestic tour packages, Umrah arrangements, and international flights with Pearl Travel & Tours.',
    canonicalPath: '/cancellation-policy',
  });

  return (
    <div className="bg-[#F5F6F8] min-h-screen pb-20">
      <Breadcrumbs items={[{ name: 'Cancellation Policy' }]} />

      <section className="bg-[#00264D] text-white py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-[#F4B400]">Transparent Policies</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Cancellation & Refund Policy</h1>
          <p className="text-xs sm:text-sm text-gray-200">
            Clear guidelines on modifications, cancellations, and refund claims.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xs border border-gray-200 space-y-8 text-[#353B45] text-sm leading-relaxed">
          
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Standard Notice:</strong>
              Cancellation charges depend on the specific tour category, departure notice, and third-party supplier rules (hotels, airlines, and visa authorities). Always verify with your booking consultant for your specific package voucher.
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#00264D]">1. Domestic Tour Package Cancellations (Northern Pakistan)</h2>
            <p>For custom private or family tours within Pakistan:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
              <li><strong>15 or more days before departure:</strong> 90% refund of package advance deposit (less nominal processing charge).</li>
              <li><strong>7 to 14 days before departure:</strong> 70% refund of package deposit.</li>
              <li><strong>3 to 6 days before departure:</strong> 40% refund of total package cost.</li>
              <li><strong>Less than 72 hours or No-show:</strong> Non-refundable due to vehicle reservation, driver commitment, and non-refundable lodge commitments.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#00264D]">2. Umrah Packages & Visas</h2>
            <p>
              Once a Saudi electronic visa is generated and stamped, the visa fees and mandatory insurance charges are non-refundable as per Saudi Ministry of Hajj & Umrah policies. Hotel accommodations in Makkah and Madinah follow strict hotel penalty periods during peak Umrah and Ramadan seasons.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#00264D]">3. Airline Tickets</h2>
            <p>
              Cancellation and date change fees for domestic (PIA, Serene, Airblue) or international airlines are governed strictly by the airline's published fare rules (e.g. promo, economy saver, business). Pearl Travel & Tours charges only a standard processing fee for handling ticket reissuances or refund refunds.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#00264D]">4. Unforeseen Weather or Road Blockages</h2>
            <p>
              In the event that an alpine road in Gilgit-Baltistan is blocked due to sudden heavy snowfall, landslide, or local security advisory, our operations team will assist in rerouting to an alternative safe destination or adjusting dates. Any additional hotel charges incurred during unexpected weather delays will be communicated transparently.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#00264D]">5. How to Submit a Cancellation or Refund Claim</h2>
            <p>
              All cancellation requests must be made in writing from the registered email address or WhatsApp number used during booking.
            </p>
            <div className="bg-[#F5F6F8] p-4 rounded-2xl border border-gray-200 text-xs space-y-1">
              <p><strong>Refund Claims Desk (Govt. License GL# 6190):</strong></p>
              <p>Email: <a href="mailto:info@pearltravelandtours.com" className="text-[#003566] underline font-medium">info@pearltravelandtours.com</a></p>
              <p>Direct Phone / WhatsApp: +92 315 3171263 / +92 312 3004810</p>
              <p>Refund Processing Timeline: 5 to 7 business days via original payment channel.</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
