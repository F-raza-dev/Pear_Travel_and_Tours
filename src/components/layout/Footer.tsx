import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send, ShieldCheck, CheckCircle2, ExternalLink, Briefcase } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#00264D] text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Govt. License */}
          <div className="space-y-4">
            <Link to="/" className="inline-block bg-white/95 p-2.5 rounded-xl shadow-md hover:bg-white transition-colors">
              <img 
                src="/assets/aistudio/183936-removebg-preview_4ee74c53.png" 
                alt="Pearl Travel & Tours Logo" 
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-[#F4B400] font-semibold text-sm italic">
              “Explore the World with Pearl.”
            </p>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Pearl Travel & Tours is your dedicated partner for domestic Northern Pakistan adventures, international holidays, sacred Umrah pilgrimages, and wholesale B2B travel operations.
            </p>

            {/* Government License Badge */}
            <div className="pt-2 p-3 bg-white/10 rounded-2xl border border-[#F4B400]/40 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#F4B400]">
                <ShieldCheck className="w-4 h-4 text-[#F4B400]" />
                <span>Govt. License: GL# 6190</span>
              </div>
              <p className="text-[11px] text-gray-300 leading-tight">
                Registered & Licensed by Government of Pakistan Ministry of Tourism (Department of Tourist Services).
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white tracking-wide border-b border-white/10 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-[#F4B400] transition-colors flex items-center gap-2">
                  <span>›</span> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#F4B400] transition-colors flex items-center gap-2">
                  <span>›</span> About Us & Licensing
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-[#F4B400] transition-colors flex items-center gap-2">
                  <span>›</span> Destinations
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-[#F4B400] transition-colors flex items-center gap-2">
                  <span>›</span> Tour Packages
                </Link>
              </li>
              <li>
                <Link to="/b2b" className="text-[#F4B400] hover:underline font-semibold flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>B2B Agent Services</span>
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-[#F4B400] transition-colors flex items-center gap-2">
                  <span>›</span> Hotels & Stays
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-[#F4B400] transition-colors flex items-center gap-2">
                  <span>›</span> Book / Inquire Now
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F4B400] transition-colors flex items-center gap-2">
                  <span>›</span> Contact Us & Office
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#F4B400] transition-colors flex items-center gap-2">
                  <span>›</span> Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white tracking-wide border-b border-white/10 pb-2">
              Our Services
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <li>
                <Link to="/services" className="hover:text-[#F4B400] transition-colors flex items-center gap-2">
                  <span>›</span> Northern Pakistan Tours
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#F4B400] transition-colors flex items-center gap-2">
                  <span>›</span> International Holidays (Dubai, Turkey)
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#F4B400] transition-colors flex items-center gap-2">
                  <span>›</span> Umrah Travel & Sacred Pilgrimages
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#F4B400] transition-colors flex items-center gap-2">
                  <span>›</span> Hotel & Resort Reservations
                </Link>
              </li>
              <li>
                <Link to="/b2b" className="hover:text-[#F4B400] transition-colors flex items-center gap-2">
                  <span>›</span> B2B Group Ticketing & Fleet
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#F4B400] transition-colors flex items-center gap-2">
                  <span>›</span> Tailored Family & Corporate Groups
                </Link>
              </li>
            </ul>

            <div className="pt-2">
              <p className="text-xs text-[#F4B400] font-medium mb-2">Subscribe for Travel Updates</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#F4B400] w-full"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#F4B400] hover:bg-[#e0a300] text-[#00264D] px-3 py-2 rounded-lg text-xs font-bold transition-colors shrink-0"
                  title="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              {subscribed && (
                <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Thank you for subscribing!
                </p>
              )}
            </div>
          </div>

          {/* Column 4: Contact Us & Map Routing */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white tracking-wide border-b border-white/10 pb-2">
              Contact & Office Location
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F4B400] shrink-0 mt-1" />
                <div>
                  <a 
                    href="https://share.google/wkuwHtPzcg2pbQCBZ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="leading-snug hover:text-[#F4B400] transition-colors block group"
                    title="Open office in Google Maps"
                  >
                    Shop#3 Plot#4/284, Jelani House, Sarfaraz Incline, near Bin Tayyab Hospital, Chari Hyderabad, 71000.
                    <span className="flex items-center gap-1 text-[11px] text-[#F4B400] font-bold mt-1 group-hover:underline">
                      <ExternalLink className="w-3 h-3" />
                      <span>Click to view route on Google Maps</span>
                    </span>
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#F4B400] shrink-0 mt-1" />
                <div className="flex flex-col gap-0.5">
                  <a href="tel:+923153171263" className="hover:text-[#F4B400] transition-colors font-bold">+92 315 3171263 (Primary)</a>
                  <a href="tel:+923183229903" className="hover:text-[#F4B400] transition-colors text-xs text-gray-400">+92 318 3229903</a>
                  <a href="tel:+923000226016" className="hover:text-[#F4B400] transition-colors text-xs text-gray-400">+92 300 0226016</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#F4B400] shrink-0" />
                <a href="mailto:info@pearltravelandtours.com" className="hover:text-[#F4B400] transition-colors">
                  info@pearltravelandtours.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#F4B400] shrink-0" />
                <span>Mon – Sat: 9:30 AM – 7:00 PM (PKT)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Pearl Travel & Tours (GL# 6190). All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link to="/privacy-policy" className="hover:text-[#F4B400] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#F4B400] transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/cancellation-policy" className="hover:text-[#F4B400] transition-colors">
              Cancellation / Refund Policy
            </Link>
            <Link to="/b2b" className="text-gray-300 hover:text-[#F4B400] transition-colors">
              B2B Portal
            </Link>
            <Link to="/admin" className="text-gray-500 hover:text-gray-300 transition-colors">
              Agency Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
