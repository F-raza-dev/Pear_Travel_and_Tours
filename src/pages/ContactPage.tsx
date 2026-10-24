import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { 
  Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, AlertCircle, ShieldCheck, ExternalLink, Navigation 
} from 'lucide-react';
import { saveNewInquiry } from '../lib/storage';
import { buildWhatsAppUrl } from '../utils/travelLogic';
import { useDocumentTitleAndSEO } from '../lib/seo';

export const ContactPage: React.FC = () => {
  useDocumentTitleAndSEO({
    title: 'Contact Us & Office Location | GL# 6190',
    description: 'Visit Pearl Travel & Tours in Hyderabad or call +92 315 3171263. Licensed by Govt. of Pakistan Ministry of Tourism (GL# 6190). Shop#3 Plot#4/284, Jelani House, Sarfaraz Incline, near Bin Tayyab Hospital, Chari Hyderabad.',
    canonicalPath: '/contact',
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Travel Inquiry');
  const [message, setMessage] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter your phone or WhatsApp number.');
      return;
    }
    if (!message.trim()) {
      setErrorMsg('Please write your message or requirements.');
      return;
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      const saved = saveNewInquiry({
        customerName: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        serviceType: 'Domestic Tour',
        destination: subject,
        departureDate: today,
        adultsCount: 2,
        childrenCount: 0,
        additionalNotes: `Subject: ${subject}\nMessage: ${message.trim()}`,
        consentAccepted: true,
        currency: 'PKR',
      });
      setSubmittedRef(saved.referenceNumber);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch {
      setErrorMsg('Failed to record inquiry. Please reach out via WhatsApp directly.');
    }
  };

  const whatsappDirect = buildWhatsAppUrl('923153171263', 'Assalamu Alaikum Pearl Travel, I am contacting you from the website contact page.');
  const googleMapsUrl = 'https://share.google/wkuwHtPzcg2pbQCBZ';

  return (
    <div className="bg-[#F5F6F8] min-h-screen">
      <Breadcrumbs items={[{ name: 'Contact Us' }]} />

      {/* Hero Header */}
      <section className="bg-[#00264D] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#F4B400]/20 text-[#F4B400] text-xs font-bold px-3 py-1 rounded-full border border-[#F4B400]/30">
            <ShieldCheck className="w-4 h-4" />
            <span>Govt. Licensed Agency: GL# 6190</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Contact <span className="text-[#F4B400]">Pearl Travel & Tours</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto">
            Authorized by the Ministry of Tourism, Government of Pakistan. Visit our verified office in Hyderabad or get in touch for instant travel assistance.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Official Contact & License (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Government License Card */}
            <div className="bg-[#00264D] text-white rounded-3xl p-6 sm:p-7 shadow-md border border-[#F4B400]/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F4B400]">Official Registration</span>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold">Active License</span>
              </div>
              <h3 className="text-lg font-extrabold text-white">
                Government of Pakistan Ministry of Tourism
              </h3>
              <div className="text-2xl font-extrabold text-[#F4B400] font-mono tracking-wider">
                GL# 6190
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Registered under the Department of Tourist Services (DTS), authorized to organize domestic and international holiday tours, hotel allotments, and sacred pilgrimage services.
              </p>
            </div>

            {/* Quick Contact Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100 space-y-6">
              <h3 className="text-xl font-bold text-[#00264D] border-b border-gray-100 pb-3">
                Official Head Office & Contacts
              </h3>

              <div className="space-y-4">
                {/* Office Location with Google Map link */}
                <div className="flex items-start gap-4 p-3.5 bg-[#F5F6F8] rounded-2xl border border-gray-200">
                  <div className="w-10 h-10 rounded-xl bg-[#003566] text-[#F4B400] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-gray-500 uppercase block">Office Address</span>
                    <p className="text-xs sm:text-sm font-semibold text-[#00264D] leading-snug">
                      Shop#3 Plot#4/284, Jelani House, Sarfaraz Incline, near Bin Tayyab Hospital, Chari Hyderabad, 71000.
                    </p>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#003566] font-bold hover:text-[#F4B400] transition-colors pt-1"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#F4B400]" />
                      <span>Open Navigation Route on Google Maps</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#003566]/10 text-[#003566] flex items-center justify-center shrink-0 mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase block">Primary Contact</span>
                    <a href="tel:+923153171263" className="text-base font-bold text-[#00264D] hover:text-[#003566]">
                      +92 315 3171263
                    </a>
                    <p className="text-[11px] text-gray-400">Direct line & WhatsApp support desk</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center shrink-0 mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase block">Additional Official Lines</span>
                    <div className="flex flex-col gap-0.5 text-xs font-semibold text-[#00264D]">
                      <a href="tel:+923183229903" className="hover:underline">+92 318 3229903</a>
                      <a href="tel:+923000226016" className="hover:underline">+92 300 0226016</a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 pt-2 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-[#003566]/10 text-[#003566] flex items-center justify-center shrink-0 mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase block">Official Email</span>
                    <a href="mailto:info@pearltravelandtours.com" className="text-sm font-bold text-[#00264D] hover:underline">
                      info@pearltravelandtours.com
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4 pt-2 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-[#003566]/10 text-[#003566] flex items-center justify-center shrink-0 mt-1">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase block">Working Hours</span>
                    <p className="text-xs sm:text-sm text-[#353B45]">
                      Monday – Saturday: 9:30 AM – 7:00 PM (PKT)
                    </p>
                    <p className="text-[11px] text-gray-400">Sunday: Closed for walk-ins (WhatsApp accessible)</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-2">
                <a
                  href={whatsappDirect}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat on WhatsApp (+92 315 3171263)</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form & Interactive Map (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xs border border-gray-100 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#003566]">Direct Message</span>
                <h3 className="text-2xl font-bold text-[#00264D] mt-1">Send Us a Travel Inquiry</h3>
                <p className="text-xs text-[#777F8A] mt-1">
                  Fill in your details and travel preferences. Our consultants will respond promptly with official quotation.
                </p>
              </div>

              {submittedRef && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Inquiry Registered Successfully!</span>
                  </div>
                  <p>
                    Your message has been assigned reference code: <strong className="font-mono">{submittedRef}</strong>. A licensed consultant from Pearl Travel & Tours (GL# 6190) will reach out to you shortly.
                  </p>
                </div>
              )}

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Asad Siddiqui"
                      className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#F4B400] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 315 1234567"
                      className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#F4B400] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#F4B400] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Inquiry Topic</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#F4B400] outline-none bg-white cursor-pointer"
                    >
                      <option value="General Travel Inquiry">General Travel Inquiry</option>
                      <option value="Northern Pakistan Tours">Northern Pakistan Tours</option>
                      <option value="Dubai / International Holiday">Dubai / International Holiday</option>
                      <option value="Umrah Packages">Umrah Packages</option>
                      <option value="Hotel Reservation">Hotel Reservation</option>
                      <option value="B2B Travel Services">B2B Agent Services</option>
                      <option value="Corporate / Group Booking">Corporate / Group Booking</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Your Requirements / Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your target dates, passenger counts, hotel preferences, or any travel assistance questions..."
                    className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#F4B400] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#F4B400] hover:bg-[#e0a300] text-[#00264D] font-bold text-sm shadow transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            </div>

            {/* Interactive Google Maps Direction Embed Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-gray-100 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-[#00264D] flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#F4B400]" />
                    <span>Office Location Map & Directions</span>
                  </h4>
                  <p className="text-xs text-gray-500">
                    Hyderabad Head Office • Sarfaraz Incline, near Bin Tayyab Hospital
                  </p>
                </div>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-[#003566] hover:bg-[#00264D] text-[#F4B400] text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>

              {/* Map Canvas / Card linking to Google Maps */}
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 h-64 bg-slate-100 group">
                <iframe
                  title="Pearl Travel & Tours Office Location"
                  src="https://maps.google.com/maps?q=Shop%233+Plot%234%2F284%2C+Jelani+House%2C+Sarfaraz+Incline%2C+near+Bin+Tayyab+Hospital%2C+Chari+Hyderabad%2C+71000&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 bg-[#00264D] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5 hover:bg-[#003566] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#F4B400]" />
                  <span>Open in Google Maps App</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
