import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, HeartHandshake, Compass, ArrowRight } from 'lucide-react';

export const AboutSnippet: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Principles */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold tracking-widest uppercase text-[#003566] bg-[#003566]/10 px-3 py-1 rounded-full">
              Trust & Transparency
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#00264D] leading-tight">
              Our Company <span className="text-[#003566]">About Us</span>
            </h2>

            <p className="text-base text-[#353B45] leading-relaxed">
              Pearl Travel & Tours helps travelers discover destinations, plan memorable holidays, explore tour packages, and submit travel requests through a convenient, customer-focused service. Our goal is to make travel planning clearer, easier, and more enjoyable.
            </p>

            <p className="text-sm text-[#777F8A] leading-relaxed">
              Based in Pakistan with dedicated international partners, we specialize in curated family vacations to Gilgit-Baltistan, corporate group retreats, all-inclusive Dubai getaways, and spiritually organized Umrah pilgrimages. We believe in honest recommendations without fabricated promises.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#F5F6F8] border border-gray-100">
                <ShieldCheck className="w-6 h-6 text-[#003566] mb-2" />
                <h4 className="text-sm font-bold text-[#00264D]">Verified Stays</h4>
                <p className="text-xs text-gray-500 mt-1">Inspected hotels and safe transport.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#F5F6F8] border border-gray-100">
                <HeartHandshake className="w-6 h-6 text-[#003566] mb-2" />
                <h4 className="text-sm font-bold text-[#00264D]">No Hidden Fees</h4>
                <p className="text-xs text-gray-500 mt-1">Clear quotes with complete breakdown.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#F5F6F8] border border-gray-100">
                <Compass className="w-6 h-6 text-[#003566] mb-2" />
                <h4 className="text-sm font-bold text-[#00264D]">Custom Trips</h4>
                <p className="text-xs text-gray-500 mt-1">Tailored around your schedule.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                to="/about"
                className="px-6 py-3 rounded-xl bg-[#003566] hover:bg-[#00264D] text-white font-semibold text-sm transition-colors flex items-center gap-2"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 text-[#00264D] font-semibold text-sm transition-colors"
              >
                View All Services
              </Link>
            </div>
          </div>

          {/* Right Column: Branded Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80"
                alt="Travel experience with Pearl Travel"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00264D]/80 via-transparent to-transparent" />
              
              {/* Badge overlay with Pearl Travel & Tours official slogan */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-gray-100 text-[#00264D]">
                <p className="text-xs font-bold uppercase tracking-wider text-[#003566]">Official Brand Mission</p>
                <p className="text-sm font-bold text-[#00264D] mt-0.5">“Explore the World with Pearl.”</p>
                <p className="text-[11px] text-gray-500 mt-1">From mountain expeditions to sacred sanctuaries, we guide you every step.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
