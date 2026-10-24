import React, { useState } from 'react';
import { X, CheckCircle2, Send, Calendar, Users, Phone, Mail, User, AlertCircle } from 'lucide-react';
import { saveNewInquiry } from '../../lib/storage';
import { validateTravelDates } from '../../utils/travelLogic';
import { TravelServiceType } from '../../types/travel';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: TravelServiceType;
  defaultDestination?: string;
  itemReferenceId?: string;
  itemReferenceName?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'Domestic Tour',
  defaultDestination = '',
  itemReferenceId,
  itemReferenceName,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState<TravelServiceType>(defaultService);
  const [destination, setDestination] = useState(defaultDestination);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adultsCount, setAdultsCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(true);

  const [formError, setFormError] = useState<string | null>(null);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!customerName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please provide a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setFormError('Please provide a valid phone or WhatsApp number.');
      return;
    }
    if (!destination.trim()) {
      setFormError('Please specify your desired travel destination.');
      return;
    }

    const dateValidation = validateTravelDates(departureDate, returnDate || undefined);
    if (!dateValidation.valid) {
      setFormError(dateValidation.error || 'Invalid travel dates.');
      return;
    }

    if (!consentAccepted) {
      setFormError('Please acknowledge consent to receive a travel quotation.');
      return;
    }

    setIsSubmitting(true);
    try {
      const saved = saveNewInquiry({
        customerName: customerName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        serviceType,
        destination: destination.trim(),
        packageOrHotelId: itemReferenceId,
        packageOrHotelName: itemReferenceName,
        departureDate,
        returnDate: returnDate || undefined,
        adultsCount,
        childrenCount,
        additionalNotes: additionalNotes.trim(),
        consentAccepted,
        currency: 'PKR',
      });

      setSubmittedReference(saved.referenceNumber);
    } catch {
      setFormError('An unexpected error occurred while saving your inquiry. Please try again or WhatsApp us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmittedReference(null);
    setFormError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 animate-scaleUp"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-modal-title"
      >
        {/* Header */}
        <div className="bg-[#00264D] text-white p-5 flex items-center justify-between">
          <div>
            <h2 id="inquiry-modal-title" className="text-lg font-bold text-white flex items-center gap-2">
              <span>Travel Inquiry</span>
              {itemReferenceName && <span className="text-[#F4B400] text-sm font-normal">({itemReferenceName})</span>}
            </h2>
            <p className="text-xs text-gray-300 mt-0.5">
              Pearl Travel & Tours will prepare a tailored quotation for you.
            </p>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="text-gray-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submittedReference ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-[#00264D]">Inquiry Received!</h3>
              <p className="text-sm text-gray-600">
                Your travel request has been successfully recorded. Our travel consultant will contact you via WhatsApp / phone shortly.
              </p>
              <div className="bg-[#F5F6F8] p-3 rounded-xl border border-gray-200 inline-block text-left text-xs space-y-1">
                <div><span className="font-semibold text-gray-500">Inquiry Reference:</span> <span className="font-mono font-bold text-[#003566]">{submittedReference}</span></div>
                <div><span className="font-semibold text-gray-500">Destination:</span> {destination}</div>
                <div><span className="font-semibold text-gray-500">Departure:</span> {departureDate}</div>
              </div>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#003566] text-white font-semibold text-sm hover:bg-[#00264D] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Service & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Service Type</label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value as TravelServiceType)}
                    className="w-full text-xs rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-[#F4B400] focus:border-[#F4B400] outline-none"
                  >
                    <option value="Domestic Tour">Domestic Tour</option>
                    <option value="International Tour">International Tour</option>
                    <option value="Umrah Package">Umrah Package</option>
                    <option value="Hotel Booking">Hotel Booking</option>
                    <option value="Flight Assistance">Flight Assistance</option>
                    <option value="Customized Holiday">Customized Holiday</option>
                    <option value="Corporate / Group">Corporate / Group</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Destination *</label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Hunza, Dubai, Makkah"
                    className="w-full text-xs rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-[#F4B400] focus:border-[#F4B400] outline-none"
                  />
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Your Full Name *</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Faizan Raza"
                      className="w-full text-xs rounded-lg border border-gray-300 pl-8 pr-3 p-2.5 focus:ring-2 focus:ring-[#F4B400] focus:border-[#F4B400] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">WhatsApp / Phone *</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 315 1234567"
                      className="w-full text-xs rounded-lg border border-gray-300 pl-8 pr-3 p-2.5 focus:ring-2 focus:ring-[#F4B400] focus:border-[#F4B400] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-xs rounded-lg border border-gray-300 pl-8 pr-3 p-2.5 focus:ring-2 focus:ring-[#F4B400] focus:border-[#F4B400] outline-none"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Departure Date *</label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      required
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full text-xs rounded-lg border border-gray-300 pl-8 pr-3 p-2.5 focus:ring-2 focus:ring-[#F4B400] focus:border-[#F4B400] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Return Date (Optional)</label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full text-xs rounded-lg border border-gray-300 pl-8 pr-3 p-2.5 focus:ring-2 focus:ring-[#F4B400] focus:border-[#F4B400] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Travelers */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Adults (12+ yrs)</label>
                  <div className="relative">
                    <Users className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={adultsCount}
                      onChange={(e) => setAdultsCount(parseInt(e.target.value) || 1)}
                      className="w-full text-xs rounded-lg border border-gray-300 pl-8 pr-3 p-2.5 focus:ring-2 focus:ring-[#F4B400] focus:border-[#F4B400] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Children (Under 12)</label>
                  <input
                    type="number"
                    min={0}
                    max={20}
                    value={childrenCount}
                    onChange={(e) => setChildrenCount(parseInt(e.target.value) || 0)}
                    className="w-full text-xs rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-[#F4B400] focus:border-[#F4B400] outline-none"
                  />
                </div>
              </div>

              {/* Special requirements */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Special Requirements</label>
                <textarea
                  rows={2}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Preferences for hotels (3-star vs 5-star), vehicle type, room counts, or Umrah requirements..."
                  className="w-full text-xs rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-[#F4B400] focus:border-[#F4B400] outline-none resize-none"
                />
              </div>

              {/* Consent checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="consentCheckbox"
                  checked={consentAccepted}
                  onChange={(e) => setConsentAccepted(e.target.checked)}
                  className="mt-0.5 rounded text-[#003566] focus:ring-[#F4B400]"
                />
                <label htmlFor="consentCheckbox" className="text-[11px] text-gray-500 leading-tight">
                  I agree to receive a customized itinerary quote and communications regarding this travel request from Pearl Travel & Tours.
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-[#F4B400] text-[#00264D] font-bold text-sm shadow hover:bg-[#e0a300] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Sending Request...' : 'Submit Booking Inquiry'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
