import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/travelLogic';
import { useDocumentTitleAndSEO } from '../lib/seo';

interface FaqItem {
  question: string;
  answer: string;
  category: 'General' | 'Northern Pakistan' | 'Umrah' | 'International' | 'Booking & Payments';
}

export const FaqPage: React.FC = () => {
  useDocumentTitleAndSEO({
    title: 'Frequently Asked Questions (FAQ)',
    description: 'Find answers about Pearl Travel & Tours itineraries, payment terms, Umrah packages, domestic travel in Northern Pakistan, and visa procedures.',
    canonicalPath: '/faq',
  });

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const faqs: FaqItem[] = [
    {
      category: 'General',
      question: 'How do I request a quotation or make a booking with Pearl Travel & Tours?',
      answer: 'You can submit your trip requirements via our website inquiry form or contact our travel desk directly on WhatsApp at +92 315 3171263. A travel specialist will evaluate your desired dates, vehicle needs, and hotel tiers to issue an itemized proposal.',
    },
    {
      category: 'Booking & Payments',
      question: 'Is my booking confirmed immediately upon submitting an online inquiry?',
      answer: 'No. The online inquiry records your preferred dates and requirements in our queue. A booking is formally confirmed only after our consultant verifies room allotment, issues an agreed itinerary invoice, and standard deposit arrangements are completed.',
    },
    {
      category: 'Northern Pakistan',
      question: 'What is the best time of the year to visit Hunza, Skardu, and Gilgit-Baltistan?',
      answer: 'The primary travel season is from May through October. Autumn (mid-October to early November) is world-renowned for golden apricot and poplar foliage. High-altitude passes like Babusar Top and Khunjerab Pass are typically accessible from June to October depending on snowfall.',
    },
    {
      category: 'Northern Pakistan',
      question: 'What types of vehicles are provided for Northern Pakistan tours?',
      answer: 'For couples and small families, we provide dedicated Toyota Prado 4x4 or Toyota Fortuner vehicles with seasoned mountain drivers. For larger family groups, we deploy luxury Toyota Grand Cabin high-roof vans equipped with AC, comfortable seating, and luggage roof carriers.',
    },
    {
      category: 'Umrah',
      question: 'How close are your partner hotels in Makkah and Madinah to the Haram?',
      answer: 'We prioritize convenience. In Makkah, we offer properties in the Abraj Al Bait (Clock Tower) and Ajyad district located between 50 to 250 meters walking distance. In Madinah, our partner hotels are situated in the Central Markaziyah area, right in front of the courtyards of Al-Masjid an-Nabawi.',
    },
    {
      category: 'Umrah',
      question: 'Do you assist with Saudi tourist and Umrah electronic visas for Pakistani citizens?',
      answer: 'Yes. We provide complete electronic visa processing including mandatory Saudi medical health insurance. Requirements include a valid passport (minimum 6 months validity) and biometric passport photos.',
    },
    {
      category: 'International',
      question: 'Do you arrange UAE and Türkiye visas for Pakistani passport holders?',
      answer: 'Yes. We provide UAE 30-day and 60-day tourist visa processing. For Türkiye, we assist with both instant e-Visa applications (for travelers holding valid US, UK, Schengen, or Ireland visas) and standard sticker visa appointments at Turkish visa drop boxes in Pakistan.',
    },
    {
      category: 'Booking & Payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept official agency bank transfers to our registered Pakistani corporate bank accounts, pay orders, and direct cash deposits at our verified Karachi office. Full official receipts and invoices are provided for every transaction.',
    },
  ];

  const categories = ['All', 'General', 'Northern Pakistan', 'Umrah', 'International', 'Booking & Payments'];

  const filteredFaqs = selectedCategory === 'All'
    ? faqs
    : faqs.filter(f => f.category === selectedCategory);

  const whatsappUrl = buildWhatsAppUrl('923153171263', 'Assalamu Alaikum, I have a specific question not covered in the FAQs.');

  return (
    <div className="bg-[#F5F6F8] min-h-screen pb-20">
      <Breadcrumbs items={[{ name: 'FAQ' }]} />

      <section className="bg-[#00264D] text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-[#F4B400] bg-white/10 px-3 py-1 rounded-full border border-white/20">
            Common Questions
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Frequently Asked <span className="text-[#F4B400]">Questions</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-200">
            Find clear, honest answers regarding our tours, booking procedures, and travel guidelines.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#003566] text-[#F4B400] shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-xs border border-gray-200/80 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[#00264D]">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-gray-100 text-[#003566] transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#003566] text-[#F4B400]' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#353B45] leading-relaxed border-t border-gray-50 bg-gray-50/50">
                    <p>{faq.answer}</p>
                    <span className="inline-block mt-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-white px-2 py-0.5 rounded border border-gray-200">
                      Topic: {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-12 bg-white rounded-3xl p-8 text-center border border-gray-200 shadow-xs space-y-4">
          <HelpCircle className="w-10 h-10 text-[#003566] mx-auto" />
          <h3 className="text-lg font-bold text-[#00264D]">Still have a question?</h3>
          <p className="text-xs text-gray-600 max-w-md mx-auto">
            Our friendly travel team is here to answer specific inquiries about customized groups, dates, or payment options.
          </p>
          <div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask us on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
