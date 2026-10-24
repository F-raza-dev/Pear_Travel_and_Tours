import React from 'react';
import { ShieldCheck, Award, FileCheck, CheckCircle2, MapPin, ExternalLink } from 'lucide-react';

export const GovtCertification: React.FC = () => {
  return (
    <section className="py-16 bg-[#00264D] text-white relative overflow-hidden border-y-4 border-[#F4B400]">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F4B400]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#003566]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Official License & Seal (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl relative space-y-5">
              
              {/* Badge Header */}
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#F4B400] text-[#00264D] flex items-center justify-center font-extrabold shadow-md">
                    <Award className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#F4B400] tracking-wider block">
                      Government of Pakistan
                    </span>
                    <h3 className="text-base font-extrabold text-white">
                      Ministry of Tourism
                    </h3>
                  </div>
                </div>

                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </span>
              </div>

              {/* License Number Showcase */}
              <div className="text-center py-4 bg-[#001D3D] rounded-2xl border border-[#F4B400]/40 shadow-inner">
                <span className="text-xs text-gray-300 font-medium uppercase tracking-wider block">
                  Official Travel Agency License Number
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#F4B400] tracking-widest mt-1 font-mono">
                  GL# 6190
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Department of Tourist Services (DTS) Authorized
                </p>
              </div>

              <p className="text-xs text-gray-200 leading-relaxed text-center sm:text-left">
                Pearl Travel & Tours is officially licensed and authorized by the Government of Pakistan Ministry of Tourism to manage and arrange domestic mountain expeditions, international holiday tours, and pilgrimage travel services.
              </p>

              {/* Office Location Route Link */}
              <a
                href="https://share.google/wkuwHtPzcg2pbQCBZ"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 bg-white/10 hover:bg-white/15 rounded-xl border border-white/10 text-xs text-gray-200 transition-colors group"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <MapPin className="w-4 h-4 text-[#F4B400] shrink-0" />
                  <span className="truncate text-gray-200 group-hover:text-white">
                    Shop#3 Plot#4/284, Jelani House, Sarfaraz Incline, Chari Hyderabad
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#F4B400] shrink-0 ml-2" />
              </a>

            </div>
          </div>

          {/* Right Column: Trust Details & Consumer Assurances (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4B400]/20 text-[#F4B400] text-xs font-bold uppercase tracking-wider border border-[#F4B400]/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Legitimacy & Consumer Protection</span>
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                Travel with Complete Trust Under <span className="text-[#F4B400]">GL# 6190</span>
              </h2>

              <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                When booking through Pearl Travel & Tours, you are protected by official Pakistani tourism standards. We provide legitimate travel contracts, verified hotel vouchers, and transparent bank-to-bank invoicing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#F4B400] font-bold text-sm">
                  <FileCheck className="w-4 h-4" />
                  <span>Licensed Tour Operations</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Authorized to arrange guided tours, family vacations, and mountain expeditions with certified drivers and inspected vehicles.
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#F4B400] font-bold text-sm">
                  <Award className="w-4 h-4" />
                  <span>Ministry of Tourism Certified</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Compliance with government consumer guidelines, safety standards, and transparent refund protocols.
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#F4B400] font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Direct Bank & Office Invoicing</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Official invoices issued through registered corporate bank accounts and verified physical offices in Hyderabad and Pakistan.
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#F4B400] font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>B2B Agent Authorizations</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Recognized partner agency providing wholesale group ticketing, transportation fleets, and hotel allotments to travel agents nationwide.
                </p>
              </div>

            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="https://share.google/wkuwHtPzcg2pbQCBZ"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#F4B400] hover:bg-[#e0a300] text-[#00264D] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                <span>Locate Verified Office on Google Maps</span>
              </a>

              <a
                href="tel:+923153171263"
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all"
              >
                Verify License with Operations Desk
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
