import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { 
  Briefcase, Plane, Bus, ShieldCheck, Building2, Compass, Users, CheckCircle2, 
  Send, Phone, Mail, MapPin, AlertCircle, Sparkles, MessageCircle 
} from 'lucide-react';
import { b2bServicesData } from '../data/travelData';
import { saveNewInquiry } from '../lib/storage';
import { buildWhatsAppUrl } from '../utils/travelLogic';
import { useDocumentTitleAndSEO } from '../lib/seo';

export const B2BPage: React.FC = () => {
  useDocumentTitleAndSEO({
    title: 'B2B Travel Partner & Agent Services | GL# 6190',
    description: 'Wholesale B2B services for travel agents: group ticketing, private transportation, Umrah visa processing, guaranteed hotel allotments, and group tours.',
    canonicalPath: '/b2b',
  });

  const [agentName, setAgentName] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceNeeded, setServiceNeeded] = useState('Hotel Allotments');
  const [passengerVolume, setPassengerVolume] = useState('20 - 50 Pax');
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(true);

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!agentName.trim() || !agencyName.trim()) {
      setErrorMsg('Please provide your name and travel agency / business name.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter your WhatsApp or phone number for B2B communication.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid business email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const saved = saveNewInquiry({
        customerName: agentName.trim(),
        agencyName: agencyName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        serviceType: 'B2B Agent Services',
        destination: `${serviceNeeded} (${city || 'Pakistan'})`,
        departureDate: today,
        adultsCount: 20,
        childrenCount: 0,
        additionalNotes: `Agency: ${agencyName}\nCity: ${city}\nService: ${serviceNeeded}\nVolume: ${passengerVolume}\nRequirements: ${notes.trim()}`,
        consentAccepted: consent,
        currency: 'PKR',
      });

      setSubmittedRef(saved.referenceNumber);
    } catch {
      setErrorMsg('Failed to record B2B request. Please contact our agent desk via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappB2B = buildWhatsAppUrl('923153171263', 'Assalamu Alaikum Pearl Travel, I am a travel agent/corporate partner inquiring about B2B services and net rates.');

  return (
    <div className="bg-[#F5F6F8] min-h-screen pb-20">
      <Breadcrumbs items={[{ name: 'B2B Services' }]} />

      {/* Hero Header */}
      <section className="bg-[#00264D] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F4B400]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#F4B400]/20 text-[#F4B400] text-xs font-bold px-3.5 py-1 rounded-full border border-[#F4B400]/30">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Dedicated B2B Consortium & Agency Portal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            B2B Travel Services for <span className="text-[#F4B400]">Agents & Corporate Partners</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto">
            Scale your travel business with wholesale net rates, direct hotel allocations, own transport fleet, and priority Umrah visa processing. Licensed by Ministry of Tourism (GL# 6190).
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-300">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
              <ShieldCheck className="w-4 h-4 text-[#F4B400]" />
              <span>Govt. License: GL# 6190</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
              <Building2 className="w-4 h-4 text-[#F4B400]" />
              <span>Wholesale Net Tariffs</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
              <Plane className="w-4 h-4 text-[#F4B400]" />
              <span>Consortium Group Blocks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core B2B Services Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#003566] bg-[#003566]/10 px-3 py-1 rounded-full">
            Wholesale Inventory
          </span>
          <h2 className="text-3xl font-extrabold text-[#00264D] mt-3">
            Our Core B2B Solutions
          </h2>
          <p className="text-sm text-[#777F8A] mt-1">
            Engineered to empower retail travel agents, tour leaders, and corporate mobility managers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {b2bServicesData.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={srv.image}
                  alt={srv.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <h3 className="absolute bottom-3 left-4 right-4 text-base font-bold text-white">
                  {srv.title}
                </h3>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-xs font-semibold text-[#003566] mb-2">{srv.shortDesc}</p>
                  <p className="text-xs text-[#777F8A] leading-relaxed mb-4">{srv.detailedDesc}</p>

                  <div className="space-y-1.5 pt-3 border-t border-gray-100">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Agent Advantages</span>
                    {srv.keyFeatures.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#353B45]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <a
                    href="#partner-form"
                    onClick={() => setServiceNeeded(srv.title)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#003566] hover:bg-[#00264D] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Request B2B Net Rates</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* B2B Partner Inquiry Form Section */}
      <section id="partner-form" className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-5 mb-6 gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#003566]">Agent Registration</span>
              <h2 className="text-2xl font-bold text-[#00264D] mt-0.5">Apply for B2B Partner Rates</h2>
              <p className="text-xs text-gray-500">
                Receive our monthly B2B hotel allotments sheet and wholesale transport tariffs.
              </p>
            </div>
            <a
              href={whatsappB2B}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow-xs hover:bg-[#20ba59] shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>B2B WhatsApp Desk</span>
            </a>
          </div>

          {submittedRef ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-[#00264D]">B2B Application Registered!</h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Thank you for reaching out. Your reference code is <strong className="font-mono text-[#003566]">{submittedRef}</strong>. Our agency relations manager will contact you on WhatsApp with wholesale rates.
              </p>
              <button
                type="button"
                onClick={() => setSubmittedRef(null)}
                className="px-6 py-2.5 rounded-xl bg-[#003566] text-white text-xs font-bold hover:bg-[#00264D]"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Agent / Contact Person Name *</label>
                  <input
                    type="text"
                    required
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder="e.g. Asif Raza"
                    className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#F4B400] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Agency / Company Name *</label>
                  <input
                    type="text"
                    required
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    placeholder="e.g. Al-Madina Travels Lahore"
                    className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#F4B400] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">City / Base Location *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Hyderabad, Karachi, Lahore"
                    className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#F4B400] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#F4B400] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Business Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="agent@agency.com"
                    className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#F4B400] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Primary B2B Service Needed</label>
                  <select
                    value={serviceNeeded}
                    onChange={(e) => setServiceNeeded(e.target.value)}
                    className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#F4B400] outline-none bg-white cursor-pointer"
                  >
                    <option value="Hotel Allotments">Hotel Allotments (Makkah/Madinah/Pakistan)</option>
                    <option value="Group Airline Ticketing">Group Airline Ticketing</option>
                    <option value="Ground Transportation Fleet">Ground Transportation Fleet</option>
                    <option value="Umrah Visa & Processing">Umrah Visa & Processing</option>
                    <option value="Guided Sacred Ziyarats">Guided Sacred Ziyarats</option>
                    <option value="Group Tours & Corporate Packages">Group Tours & Corporate Packages</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Expected Passenger Volume / Frequency</label>
                  <select
                    value={passengerVolume}
                    onChange={(e) => setPassengerVolume(e.target.value)}
                    className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#F4B400] outline-none bg-white cursor-pointer"
                  >
                    <option value="10 - 25 Pax Monthly">10 - 25 Pax Monthly</option>
                    <option value="25 - 50 Pax Monthly">25 - 50 Pax Monthly</option>
                    <option value="50 - 100 Pax Monthly">50 - 100 Pax Monthly</option>
                    <option value="100+ Pax (Large Group / Charter)">100+ Pax (Large Group / Charter)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Specific Requirements or Target Dates</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Need 10 rooms in Swissôtel Makkah for November, or 3 Grand Cabins for Hunza tour on 15th..."
                  className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#F4B400] outline-none resize-none"
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="b2bConsent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 rounded text-[#003566] focus:ring-[#F4B400]"
                />
                <label htmlFor="b2bConsent" className="text-xs text-gray-600">
                  I represent a legitimate travel agency, corporate client, or tour organizer seeking official B2B wholesale tariffs from Pearl Travel & Tours (GL# 6190).
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#F4B400] hover:bg-[#e0a300] text-[#00264D] font-bold text-sm shadow transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Submitting Application...' : 'Send B2B Partnership Inquiry'}</span>
              </button>
            </form>
          )}

        </div>
      </section>

      {/* Office & Verification Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-[#00264D] text-white rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#F4B400] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Government of Pakistan Licensed Entity</span>
            </div>
            <h4 className="text-lg font-bold">Pearl Travel & Tours — License GL# 6190</h4>
            <p className="text-xs text-gray-300">
              Registered Head Office: Shop#3 Plot#4/284, Jelani House, Sarfaraz Incline, near Bin Tayyab Hospital, Chari Hyderabad, 71000.
            </p>
          </div>

          <a
            href="https://share.google/wkuwHtPzcg2pbQCBZ"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-[#F4B400] hover:bg-[#e0a300] text-[#00264D] text-xs font-bold flex items-center gap-2 shrink-0 transition-all"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Open Office on Google Maps</span>
          </a>
        </div>
      </section>
    </div>
  );
};
