import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { 
  Calendar, Users, MapPin, Phone, Mail, User, ShieldCheck, 
  CheckCircle2, AlertCircle, Compass, Bed, DollarSign 
} from 'lucide-react';
import { saveNewInquiry } from '../lib/storage';
import { validateTravelDates } from '../utils/travelLogic';
import { TravelServiceType } from '../types/travel';
import { useDocumentTitleAndSEO } from '../lib/seo';

export const BookingPage: React.FC = () => {
  useDocumentTitleAndSEO({
    title: 'Book / Inquire Travel Package',
    description: 'Submit your travel requirements to Pearl Travel & Tours for domestic packages, international holidays, Umrah, or hotel reservations.',
    canonicalPath: '/booking',
  });

  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState<TravelServiceType>('Domestic Tour');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adultsCount, setAdultsCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [roomsCount, setRoomsCount] = useState(1);
  const [budgetRange, setBudgetRange] = useState('');
  const [currency, setCurrency] = useState('PKR');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(true);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedInquiry, setSubmittedInquiry] = useState<{
    reference: string;
    destination: string;
    service: string;
    departure: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!customerName.trim()) {
      setErrorMsg('Full name is required.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Valid email address is required.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Phone or WhatsApp number is required.');
      return;
    }
    if (!destination.trim()) {
      setErrorMsg('Please specify destination or package name.');
      return;
    }

    const dateVal = validateTravelDates(departureDate, returnDate || undefined);
    if (!dateVal.valid) {
      setErrorMsg(dateVal.error || 'Invalid travel dates.');
      return;
    }

    if (!consentAccepted) {
      setErrorMsg('Please accept the quotation consent to proceed.');
      return;
    }

    setSubmitting(true);
    try {
      const saved = saveNewInquiry({
        customerName: customerName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        serviceType,
        destination: destination.trim(),
        departureDate,
        returnDate: returnDate || undefined,
        adultsCount,
        childrenCount,
        roomsCount,
        budgetRange: budgetRange.trim() || undefined,
        currency,
        additionalNotes: additionalNotes.trim() || undefined,
        consentAccepted,
      });

      setSubmittedInquiry({
        reference: saved.referenceNumber,
        destination: saved.destination,
        service: saved.serviceType,
        departure: saved.departureDate,
      });
    } catch {
      setErrorMsg('Could not record your inquiry. Please try again or WhatsApp us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const startNew = () => {
    setSubmittedInquiry(null);
    setCustomerName('');
    setEmail('');
    setPhone('');
    setDestination('');
    setDepartureDate('');
    setReturnDate('');
    setAdditionalNotes('');
  };

  return (
    <div className="bg-[#F5F6F8] min-h-screen pb-20">
      <Breadcrumbs items={[{ name: 'Book / Inquire' }]} />

      {/* Header Banner */}
      <section className="bg-[#00264D] text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-[#F4B400] bg-white/10 px-3 py-1 rounded-full border border-white/20">
            Tailor-Made Quotations
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Travel <span className="text-[#F4B400]">Inquiry Portal</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-200">
            Tell us about your upcoming journey. We will review hotel availability, vehicle logistics, and itinerary details to prepare a verified proposal.
          </p>
        </div>
      </section>

      {/* Main Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100">
          
          {submittedInquiry ? (
            <div className="text-center py-10 space-y-5 animate-fadeIn">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Inquiry Received
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00264D] mt-3">
                  Thank You for Choosing Pearl Travel!
                </h2>
                <p className="text-sm text-gray-600 max-w-lg mx-auto mt-2">
                  Your travel request has been logged into our reservation queue. A travel consultant will review room allotments and transport options to send you a customized quotation.
                </p>
              </div>

              {/* Inquiry Details Box */}
              <div className="bg-[#F5F6F8] rounded-2xl p-6 max-w-md mx-auto border border-gray-200 text-left space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500 font-semibold">Reference Number:</span>
                  <span className="font-mono font-bold text-[#003566] text-base">{submittedInquiry.reference}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Service Requested:</span>
                  <span className="font-semibold text-gray-800">{submittedInquiry.service}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Destination:</span>
                  <span className="font-semibold text-gray-800">{submittedInquiry.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Target Departure:</span>
                  <span className="font-semibold text-gray-800">{submittedInquiry.departure}</span>
                </div>
              </div>

              {/* Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 max-w-lg mx-auto text-left flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Important Notice:</strong>
                  Submitting this inquiry does not constitute a confirmed flight, hotel, or tour booking. Official confirmations and receipts are issued once the itinerary quotation is approved and reservations are formalized with our agency.
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={startNew}
                  className="px-6 py-3 rounded-xl bg-[#003566] hover:bg-[#00264D] text-white font-semibold text-xs sm:text-sm transition-colors"
                >
                  Submit Another Inquiry
                </button>
                <a
                  href={`https://wa.me/923153171263?text=Assalamu%20Alaikum,%20I%20just%20submitted%20inquiry%20reference%20${submittedInquiry.reference}%20for%20${encodeURIComponent(submittedInquiry.destination)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
                >
                  Confirm Details via WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold text-[#00264D]">Travel Inquiry Form</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Complete the fields below to receive an accurate, transparent travel quotation.
                </p>
              </div>

              {errorMsg && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Personal Information */}
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#003566]">1. Contact Information</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Tariq Mehmood"
                        className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 pl-9 pr-3 py-3 focus:ring-2 focus:ring-[#F4B400] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tariq@example.com"
                        className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 pl-9 pr-3 py-3 focus:ring-2 focus:ring-[#F4B400] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">WhatsApp / Phone *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+92 315 1234567"
                        className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 pl-9 pr-3 py-3 focus:ring-2 focus:ring-[#F4B400] outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Service & Destination */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-bold uppercase tracking-wider text-[#003566]">2. Trip Parameters</span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Service Type *</label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value as TravelServiceType)}
                      className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#F4B400] outline-none bg-white cursor-pointer"
                    >
                      <option value="Domestic Tour">Domestic Tour (Hunza, Skardu, Swat, Naran)</option>
                      <option value="International Tour">International Tour (Dubai, Türkiye, Malaysia)</option>
                      <option value="Umrah Package">Umrah Package (Makkah & Madinah)</option>
                      <option value="Hotel Booking">Hotel & Resort Reservation</option>
                      <option value="Flight Assistance">Flight Booking Assistance</option>
                      <option value="Customized Holiday">Customized Family Holiday</option>
                      <option value="Corporate / Group">Corporate Retreat / Group Tour</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Desired Destination *</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        required
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="e.g. Hunza Valley, Dubai, Makkah, Istanbul"
                        className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 pl-9 pr-3 py-3 focus:ring-2 focus:ring-[#F4B400] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Preferred Departure Date *</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="date"
                        required
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 pl-9 pr-3 py-3 focus:ring-2 focus:ring-[#F4B400] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Estimated Return Date (Optional)</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 pl-9 pr-3 py-3 focus:ring-2 focus:ring-[#F4B400] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Traveler counts */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Adults (12+ years)</label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={adultsCount}
                        onChange={(e) => setAdultsCount(parseInt(e.target.value) || 1)}
                        className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 pl-9 pr-3 py-3 focus:ring-2 focus:ring-[#F4B400] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Children (Under 12)</label>
                    <input
                      type="number"
                      min={0}
                      max={50}
                      value={childrenCount}
                      onChange={(e) => setChildrenCount(parseInt(e.target.value) || 0)}
                      className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#F4B400] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Rooms (For Hotel stays)</label>
                    <div className="relative">
                      <Bed className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="number"
                        min={1}
                        max={50}
                        value={roomsCount}
                        onChange={(e) => setRoomsCount(parseInt(e.target.value) || 1)}
                        className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 pl-9 pr-3 py-3 focus:ring-2 focus:ring-[#F4B400] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Budget & Currency */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Estimated Budget (Optional)</label>
                    <div className="relative">
                      <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        placeholder="e.g. PKR 200,000 - 300,000"
                        className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 pl-9 pr-3 py-3 focus:ring-2 focus:ring-[#F4B400] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Currency</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#F4B400] outline-none bg-white cursor-pointer"
                    >
                      <option value="PKR">PKR (Pakistani Rupee)</option>
                      <option value="USD">USD (US Dollar)</option>
                      <option value="AED">AED (UAE Dirham)</option>
                      <option value="SAR">SAR (Saudi Riyal)</option>
                    </select>
                  </div>
                </div>

                {/* Additional requirements */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Additional Requirements & Notes</label>
                  <textarea
                    rows={3}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Specific hotel preference (3-star vs 5-star), vehicle type (Prado vs Cabin), infant baby seat, dietary or wheelchair assistance..."
                    className="w-full text-xs sm:text-sm rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#F4B400] outline-none resize-none"
                  />
                </div>
              </div>

              {/* Consent check */}
              <div className="pt-2">
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="bookingConsent"
                    checked={consentAccepted}
                    onChange={(e) => setConsentAccepted(e.target.checked)}
                    className="mt-1 rounded text-[#003566] focus:ring-[#F4B400]"
                  />
                  <label htmlFor="bookingConsent" className="text-xs text-gray-600 leading-relaxed">
                    I understand that this form submits a travel quotation request, and is not a finalized binding booking. I consent to Pearl Travel & Tours contacting me via WhatsApp, phone, or email with trip details.
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 px-6 rounded-2xl bg-[#F4B400] hover:bg-[#e0a300] text-[#00264D] font-bold text-base shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  <Compass className="w-5 h-5" />
                  <span>{submitting ? 'Registering Inquiry...' : 'Submit Travel Inquiry'}</span>
                </button>
              </div>
            </form>
          )}

        </div>
      </section>
    </div>
  );
};
