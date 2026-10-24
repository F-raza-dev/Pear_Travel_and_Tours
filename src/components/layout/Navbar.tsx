import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Clock, Menu, X, ChevronRight, Compass, ShieldCheck, Briefcase } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Explore Destinations', path: '/destinations' },
    { name: 'Tours & Packages', path: '/packages' },
    { name: 'Hotels', path: '/hotels' },
    { name: 'Services', path: '/services' },
    { name: 'B2B Services', path: '/b2b' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100 transition-all">
      {/* Top Utility Contact Bar with Government License GL# 6190 */}
      <div className="bg-[#00264D] text-white text-xs py-2 px-4 sm:px-8 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center space-x-6">
            <a 
              href="tel:+923153171263" 
              className="flex items-center gap-1.5 hover:text-[#F4B400] transition-colors"
              title="Call Pearl Travel & Tours"
            >
              <Phone className="w-3.5 h-3.5 text-[#F4B400]" />
              <span>+92 315 3171263</span>
            </a>
            <a 
              href="mailto:info@pearltravelandtours.com" 
              className="flex items-center gap-1.5 hover:text-[#F4B400] transition-colors"
              title="Email Pearl Travel & Tours"
            >
              <Mail className="w-3.5 h-3.5 text-[#F4B400]" />
              <span>info@pearltravelandtours.com</span>
            </a>
            <div className="flex items-center gap-1.5 text-gray-300">
              <Clock className="w-3.5 h-3.5 text-[#F4B400]" />
              <span>Mon - Sat: 9:30 AM – 7:00 PM (PKT)</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15 text-white">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F4B400]" />
              <span className="font-bold text-[#F4B400]">Govt. License: GL# 6190</span>
              <span className="text-[11px] text-gray-300 hidden lg:inline">• Ministry of Tourism</span>
            </div>
            <Link to="/b2b" className="text-gray-300 hover:text-[#F4B400] flex items-center gap-1 transition-colors">
              <Briefcase className="w-3 h-3 text-[#F4B400]" />
              <span>B2B Portal</span>
            </Link>
            <span className="text-white/20">|</span>
            <Link to="/booking" className="text-[#F4B400] hover:underline font-semibold">
              Travel Inquiry
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo on Left */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#F4B400] rounded-lg p-1">
            <img 
              src="/assets/aistudio/183936-removebg-preview_4ee74c53.png" 
              alt="Pearl Travel & Tours Logo" 
              className="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-xs font-semibold tracking-wide uppercase transition-all duration-200 relative ${
                    active
                      ? 'text-[#003566] font-bold'
                      : 'text-[#353B45] hover:text-[#003566] hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#F4B400] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mid-screen compact nav for lg */}
          <nav className="hidden lg:flex xl:hidden items-center space-x-1">
            {navLinks.filter(l => l.name !== 'Services').map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2.5 py-2 rounded-md text-xs font-semibold transition-all duration-200 relative ${
                    active ? 'text-[#003566] font-bold' : 'text-[#353B45] hover:text-[#003566]'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#F4B400] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/booking"
              className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#F4B400] text-[#00264D] font-bold text-xs sm:text-sm shadow-sm hover:bg-[#e0a300] hover:shadow transition-all duration-200 active:scale-95"
            >
              <Compass className="w-4 h-4" />
              <span>Book / Inquire</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-[#00264D] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#F4B400]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Expandable Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-fadeIn">
          {/* Mobile License Callout */}
          <div className="flex items-center justify-between p-2.5 bg-[#00264D] rounded-xl text-white mb-2">
            <div className="flex items-center gap-2 text-xs">
              <ShieldCheck className="w-4 h-4 text-[#F4B400]" />
              <span className="font-bold">Govt. License GL# 6190</span>
            </div>
            <span className="text-[10px] text-gray-300">Ministry of Tourism</span>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-[#003566]/10 text-[#003566] font-bold border-l-4 border-[#F4B400]'
                      : 'text-[#353B45] hover:bg-gray-50'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-3">
            <Link
              to="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#F4B400] text-[#00264D] font-bold text-sm shadow hover:bg-[#e0a300]"
            >
              <Compass className="w-4 h-4" />
              <span>Book / Inquire Now</span>
            </Link>

            <div className="text-xs text-gray-500 pt-2 flex flex-col gap-1 px-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F4B400]" />
                <a href="tel:+923153171263" className="hover:underline">+92 315 3171263</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F4B400]" />
                <a href="mailto:info@pearltravelandtours.com" className="hover:underline">info@pearltravelandtours.com</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
