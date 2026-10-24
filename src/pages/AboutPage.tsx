import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ShieldCheck, HeartHandshake, Compass, Users, CheckCircle2, ArrowRight, Award, MapPin, ExternalLink } from 'lucide-react';
import { teamMembersData } from '../data/travelData';
import { useDocumentTitleAndSEO } from '../lib/seo';

export const AboutPage: React.FC = () => {
  useDocumentTitleAndSEO({
    title: 'About Us & Ministry of Tourism License GL# 6190',
    description: 'Learn about Pearl Travel & Tours — registered and licensed by the Government of Pakistan Ministry of Tourism (GL# 6190). Headquartered in Hyderabad, Pakistan.',
    canonicalPath: '/about',
  });

  return (
    <div className="bg-white min-h-screen">
      <Breadcrumbs items={[{ name: 'About Us' }]} />

      {/* Header Banner */}
      <section className="bg-[#00264D] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#F4B400]/20 text-[#F4B400] text-xs font-bold px-3 py-1 rounded-full border border-[#F4B400]/30">
            <Award className="w-3.5 h-3.5" />
            <span>Govt. License: GL# 6190</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            About <span className="text-[#F4B400]">Pearl Travel & Tours</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto">
            “Explore the World with Pearl.” Officially authorized and licensed by the Government of Pakistan Ministry of Tourism (Department of Tourist Services).
          </p>
        </div>
      </section>

      {/* Official Licensing & Trust Callout */}
      <section className="bg-[#001D3D] text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-[#F4B400]/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F4B400] text-[#00264D] flex items-center justify-center font-extrabold shadow-md shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs text-[#F4B400] font-bold uppercase tracking-wider block">
                Official Pakistani Accreditation
              </span>
              <h2 className="text-xl font-bold text-white">
                Licensed Tour Operator — License GL# 6190
              </h2>
              <p className="text-xs text-gray-300">
                Authorized by Ministry of Tourism (DTS) to operate domestic, international, and religious travel services.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://share.google/wkuwHtPzcg2pbQCBZ"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 flex items-center gap-2 transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-[#F4B400]" />
              <span>Hyderabad Office Map</span>
              <ExternalLink className="w-3 h-3 text-[#F4B400]" />
            </a>
            <Link
              to="/b2b"
              className="px-5 py-2.5 rounded-full bg-[#F4B400] hover:bg-[#e0a300] text-[#00264D] font-bold text-xs shadow transition-all"
            >
              B2B Partner Services
            </Link>
          </div>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00264D]">
              Making Travel Planning Clearer, Easier, and Inspiring
            </h2>
            <p className="text-[#353B45] text-base leading-relaxed">
              Pearl Travel & Tours helps travelers discover destinations, plan memorable holidays, explore tour packages, and submit travel requests through a convenient, customer-focused service. Our goal is to make travel planning clearer, easier, and more enjoyable.
            </p>
            <p className="text-[#777F8A] text-sm leading-relaxed">
              Headquartered at <strong>Shop#3 Plot#4/284, Jelani House, Sarfaraz Incline, near Bin Tayyab Hospital, Chari Hyderabad</strong>, with regional operational networks across Northern Pakistan and direct partners in Saudi Arabia and the UAE, we coordinate every logistical element with precision.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F4B400] shrink-0 mt-0.5" />
                <p className="text-sm text-[#353B45]">
                  <strong className="text-[#00264D]">Government Registered (GL# 6190):</strong> Completely authorized to arrange private family tours, corporate group conferences, and sacred Umrah journeys.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F4B400] shrink-0 mt-0.5" />
                <p className="text-sm text-[#353B45]">
                  <strong className="text-[#00264D]">Transparent Quotations:</strong> Full clarity on what is included and excluded. No hidden taxes, inflated fuel surcharges, or unverified promises.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F4B400] shrink-0 mt-0.5" />
                <p className="text-sm text-[#353B45]">
                  <strong className="text-[#00264D]">B2B & Retail Capabilities:</strong> We supply wholesale vehicle fleets, group ticketing blocks, and hotel allotments to travel agencies across Pakistan.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
              alt="Majestic Northern Pakistan landscape"
              className="rounded-3xl shadow-xl w-full h-[400px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-[#00264D] text-white p-6 rounded-2xl shadow-xl max-w-xs border border-white/10 hidden sm:block">
              <Compass className="w-8 h-8 text-[#F4B400] mb-2" />
              <p className="text-xs font-semibold text-gray-300">Registered Travel Operator</p>
              <p className="text-sm font-bold text-white mt-1">GL# 6190 • Ministry of Tourism Pakistan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-16 bg-[#F5F6F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00264D]">
              Our Guiding Principles
            </h2>
            <p className="text-sm text-[#777F8A] mt-2">
              How we approach every itinerary and travel inquiry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-xs border border-gray-100 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#003566]/10 flex items-center justify-center text-[#003566]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#00264D]">Integrity & Safety</h3>
              <p className="text-xs sm:text-sm text-[#777F8A] leading-relaxed">
                We inspect travel conditions, weather advisories in Northern Pakistan, and transport safety standards so you can travel with complete peace of mind.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xs border border-gray-100 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F4B400]/20 flex items-center justify-center text-[#00264D]">
                <HeartHandshake className="w-6 h-6 text-[#003566]" />
              </div>
              <h3 className="text-lg font-bold text-[#00264D]">Warm Hospitality</h3>
              <p className="text-xs sm:text-sm text-[#777F8A] leading-relaxed">
                Travel should feel welcoming. Our drivers, local coordinators, and hotel partners are chosen for their helpfulness and respect for travelers.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xs border border-gray-100 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#003566]/10 flex items-center justify-center text-[#003566]">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#00264D]">Direct Communication</h3>
              <p className="text-xs sm:text-sm text-[#777F8A] leading-relaxed">
                Connect directly via WhatsApp or phone with knowledgeable team members who can answer real questions regarding visas, terrain, and timings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-[#003566] bg-[#003566]/10 px-3 py-1 rounded-full">
            Our People
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00264D] mt-3">
            Meet the Team
          </h2>
          <p className="text-sm text-[#777F8A] mt-2">
            Professional travel consultants based in Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembersData.map((member) => (
            <div key={member.id} className="text-center bg-[#F5F6F8] p-6 rounded-3xl border border-gray-100">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-md mb-4"
              />
              <h3 className="text-lg font-bold text-[#00264D]">{member.name}</h3>
              <p className="text-xs font-semibold text-[#003566] mt-0.5">{member.role}</p>
              <p className="text-xs text-[#777F8A] mt-2 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#003566] hover:bg-[#00264D] text-white font-bold text-sm shadow transition-colors"
          >
            <span>Visit Our Office or Contact Us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/b2b"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#F4B400] hover:bg-[#e0a300] text-[#00264D] font-bold text-sm shadow transition-colors"
          >
            <span>Explore B2B Services</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
