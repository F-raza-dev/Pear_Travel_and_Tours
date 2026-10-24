import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { 
  getStoredInquiries, updateInquiryStatus, getStoredSettings, saveSettings, 
  getStoredPackages, getStoredHotels, getStoredDestinations 
} from '../lib/storage';
import { TravelInquiry, SiteSettings, TourPackage, Hotel, Destination } from '../types/travel';
import { 
  LayoutDashboard, Inbox, Map, Package, Building2, Settings, Database, 
  ShieldCheck, Lock, CheckCircle2, Clock, Phone, Mail, User, AlertCircle, Copy, Check 
} from 'lucide-react';
import { useDocumentTitleAndSEO } from '../lib/seo';

export const AdminPage: React.FC = () => {
  useDocumentTitleAndSEO({
    title: 'Agency Admin Portal',
    description: 'Pearl Travel & Tours internal management dashboard for customer inquiries, tour packages, and site configurations.',
    canonicalPath: '/admin',
  });

  // Admin access gate: default authorized in dev preview or with passkey
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inquiries' | 'packages' | 'destinations' | 'hotels' | 'settings' | 'database'>('dashboard');

  // Stored state
  const [inquiries, setInquiries] = useState<TravelInquiry[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(getStoredSettings());
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);

  // Selected Inquiry for details / status update
  const [selectedInquiry, setSelectedInquiry] = useState<TravelInquiry | null>(null);
  const [newNote, setNewNote] = useState('');
  const [sqlCopied, setSqlCopied] = useState(false);
  const [settingsSavedMessage, setSettingsSavedMessage] = useState(false);

  useEffect(() => {
    // Check session auth or auto-allow dev preview
    const sessionAuth = sessionStorage.getItem('ptt_admin_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
    loadData();
  }, []);

  const loadData = () => {
    setInquiries(getStoredInquiries());
    setSettings(getStoredSettings());
    setPackages(getStoredPackages());
    setHotels(getStoredHotels());
    setDestinations(getStoredDestinations());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default demo passcode: pearl2026 or admin
    if (passkeyInput === 'pearl2026' || passkeyInput === 'admin' || passkeyInput === 'pearl') {
      setIsAuthenticated(true);
      sessionStorage.setItem('ptt_admin_auth', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('ptt_admin_auth');
  };

  const handleStatusChange = (id: string, newStatus: TravelInquiry['status']) => {
    updateInquiryStatus(id, newStatus, `Status updated to ${newStatus}`);
    loadData();
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleAddNote = (id: string) => {
    if (!newNote.trim()) return;
    updateInquiryStatus(id, selectedInquiry?.status || 'New', `Note: ${newNote.trim()}`);
    setNewNote('');
    loadData();
    // Update local selection
    const updated = getStoredInquiries().find(i => i.id === id);
    if (updated) setSelectedInquiry(updated);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(settings);
    setSettingsSavedMessage(true);
    setTimeout(() => setSettingsSavedMessage(false), 4000);
  };

  // SQL Schema snippet for Supabase setup
  const supabaseSqlSchema = `-- PEARL TRAVEL & TOURS — SUPABASE PRODUCTION DATABASE SCHEMA
-- Generated for pearltravelandtours.com

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_number TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service_type TEXT NOT NULL,
    destination TEXT NOT NULL,
    package_or_hotel_id TEXT,
    package_or_hotel_name TEXT,
    departure_date DATE NOT NULL,
    return_date DATE,
    adults_count INTEGER DEFAULT 2,
    children_count INTEGER DEFAULT 0,
    rooms_count INTEGER DEFAULT 1,
    budget_range TEXT,
    currency TEXT DEFAULT 'PKR',
    additional_notes TEXT,
    consent_accepted BOOLEAN DEFAULT TRUE,
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Quoted', 'Confirmed', 'Cancelled', 'Closed')),
    internal_notes TEXT[] DEFAULT '{}'::TEXT[]
);

-- Row Level Security (RLS)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Anonymous visitors can submit an inquiry
CREATE POLICY "Public can insert inquiries" ON public.inquiries
    FOR INSERT WITH CHECK (true);

-- Only authenticated admins can read inquiries
CREATE POLICY "Only admins can view inquiries" ON public.inquiries
    FOR SELECT USING (auth.role() = 'authenticated');

-- Only authenticated admins can update inquiries
CREATE POLICY "Only admins can update inquiries" ON public.inquiries
    FOR UPDATE USING (auth.role() = 'authenticated');
`;

  const copySql = () => {
    navigator.clipboard.writeText(supabaseSqlSchema);
    setSqlCopied(true);
    setTimeout(() => setSqlCopied(false), 3000);
  };

  // Analytics
  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter(i => i.status === 'New').length;
  const contactedInquiries = inquiries.filter(i => i.status === 'Contacted').length;
  const quotedInquiries = inquiries.filter(i => i.status === 'Quoted').length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] bg-[#F5F6F8] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#00264D] text-[#F4B400] flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#00264D]">Agency Admin Portal</h1>
            <p className="text-xs text-gray-500 mt-1">
              Restricted access for Pearl Travel & Tours management.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>Invalid passkey. (Hint: use <strong>pearl2026</strong>)</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Admin Passkey / Password
              </label>
              <input
                type="password"
                required
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                placeholder="Enter admin passcode"
                className="w-full text-sm rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-[#F4B400] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#00264D] hover:bg-[#003566] text-[#F4B400] font-bold text-sm shadow transition-colors"
            >
              Unlock Dashboard
            </button>
          </form>

          <p className="text-[11px] text-gray-400">
            For development preview, enter passkey <code className="text-[#003566] font-bold">pearl2026</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F6F8] min-h-screen pb-20">
      <Breadcrumbs items={[{ name: 'Admin Portal' }]} />

      {/* Admin Top Bar */}
      <div className="bg-[#00264D] text-white px-4 sm:px-8 py-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <h1 className="text-base font-bold text-white leading-tight">
                Pearl Travel & Tours — Operations Desk
              </h1>
              <p className="text-[11px] text-gray-300">
                Logged in as Authorized Travel Administrator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#F4B400] bg-white/10 px-2.5 py-1 rounded-full font-bold">
              Govt. License: GL# 6190
            </span>
            <span className="text-xs text-gray-300 bg-white/10 px-2.5 py-1 rounded-full font-medium hidden sm:inline">
              Hyderabad Head Office
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Admin Shell */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Navigation Sidebar (3 Cols) */}
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100 space-y-1">
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-colors text-left ${
                  activeTab === 'dashboard'
                    ? 'bg-[#003566] text-[#F4B400] shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                <span>Dashboard Overview</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('inquiries')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-colors text-left ${
                  activeTab === 'inquiries'
                    ? 'bg-[#003566] text-[#F4B400] shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Inbox className="w-4 h-4 shrink-0" />
                  <span>Inquiries Queue</span>
                </div>
                {newInquiries > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#F4B400] text-[#00264D] text-[10px] font-bold">
                    {newInquiries}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('packages')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-colors text-left ${
                  activeTab === 'packages'
                    ? 'bg-[#003566] text-[#F4B400] shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Package className="w-4 h-4 shrink-0" />
                <span>Tour Packages</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('destinations')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-colors text-left ${
                  activeTab === 'destinations'
                    ? 'bg-[#003566] text-[#F4B400] shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Map className="w-4 h-4 shrink-0" />
                <span>Destinations</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('hotels')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-colors text-left ${
                  activeTab === 'hotels'
                    ? 'bg-[#003566] text-[#F4B400] shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Building2 className="w-4 h-4 shrink-0" />
                <span>Hotels & Stays</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-colors text-left ${
                  activeTab === 'settings'
                    ? 'bg-[#003566] text-[#F4B400] shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Settings className="w-4 h-4 shrink-0" />
                <span>Website Settings</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('database')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-colors text-left ${
                  activeTab === 'database'
                    ? 'bg-[#003566] text-[#F4B400] shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Database className="w-4 h-4 shrink-0" />
                <span>Supabase Cloud SQL</span>
              </button>
            </div>
          </div>

          {/* Main Module Content (9 Cols) */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* TAB: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats row */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-3xl shadow-xs border border-gray-100">
                    <span className="text-xs font-bold text-gray-400 uppercase">Total Inquiries</span>
                    <div className="text-3xl font-extrabold text-[#00264D] mt-1">{totalInquiries}</div>
                    <span className="text-[11px] text-gray-500">All registered requests</span>
                  </div>

                  <div className="bg-white p-5 rounded-3xl shadow-xs border border-gray-100">
                    <span className="text-xs font-bold text-amber-500 uppercase">New / Pending</span>
                    <div className="text-3xl font-extrabold text-amber-600 mt-1">{newInquiries}</div>
                    <span className="text-[11px] text-gray-500">Requires follow-up</span>
                  </div>

                  <div className="bg-white p-5 rounded-3xl shadow-xs border border-gray-100">
                    <span className="text-xs font-bold text-blue-500 uppercase">Contacted</span>
                    <div className="text-3xl font-extrabold text-blue-600 mt-1">{contactedInquiries}</div>
                    <span className="text-[11px] text-gray-500">In communication</span>
                  </div>

                  <div className="bg-white p-5 rounded-3xl shadow-xs border border-gray-100">
                    <span className="text-xs font-bold text-emerald-500 uppercase">Quoted</span>
                    <div className="text-3xl font-extrabold text-emerald-600 mt-1">{quotedInquiries}</div>
                    <span className="text-[11px] text-gray-500">Proposal sent</span>
                  </div>
                </div>

                {/* Recent Inquiries List */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100 space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-[#00264D]">Recent Customer Inquiries</h3>
                      <p className="text-xs text-gray-500">Click any inquiry to update status or record internal notes.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('inquiries')}
                      className="text-xs font-bold text-[#003566] hover:underline"
                    >
                      View All ›
                    </button>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {inquiries.slice(0, 5).map((inq) => (
                      <div
                        key={inq.id}
                        onClick={() => {
                          setSelectedInquiry(inq);
                          setActiveTab('inquiries');
                        }}
                        className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50 px-2 rounded-xl cursor-pointer transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#003566]">{inq.referenceNumber}</span>
                            <span className="text-xs font-semibold text-gray-800">{inq.customerName}</span>
                            <span className="text-[11px] text-gray-400">({inq.phone})</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {inq.serviceType} • <strong>{inq.destination}</strong> • Departure: {inq.departureDate}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            inq.status === 'New' ? 'bg-amber-100 text-amber-800' :
                            inq.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                            inq.status === 'Quoted' ? 'bg-emerald-100 text-emerald-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {inq.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: INQUIRIES QUEUE */}
            {activeTab === 'inquiries' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#00264D]">Customer Inquiries Management</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Filter by status, update customer follow-up notes, or launch WhatsApp conversations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Inquiry list (5 Cols) */}
                  <div className="md:col-span-5 border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                    {inquiries.map((inq) => (
                      <div
                        key={inq.id}
                        onClick={() => setSelectedInquiry(inq)}
                        className={`p-3.5 cursor-pointer text-xs transition-colors ${
                          selectedInquiry?.id === inq.id ? 'bg-[#003566]/10 border-l-4 border-[#003566]' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono font-bold text-[#003566]">{inq.referenceNumber}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            inq.status === 'New' ? 'bg-amber-100 text-amber-800' :
                            inq.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                            'bg-emerald-100 text-emerald-800'
                          }`}>
                            {inq.status}
                          </span>
                        </div>
                        <p className="font-semibold text-gray-900">{inq.customerName}</p>
                        <p className="text-gray-500 mt-0.5">{inq.serviceType} - {inq.destination}</p>
                      </div>
                    ))}
                  </div>

                  {/* Detail Panel (7 Cols) */}
                  <div className="md:col-span-7 bg-[#F5F6F8] rounded-2xl p-6 border border-gray-200 space-y-4">
                    {selectedInquiry ? (
                      <div className="space-y-4 text-xs">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                          <div>
                            <span className="text-[10px] text-gray-400 uppercase font-bold">Reference</span>
                            <div className="font-mono text-base font-bold text-[#003566]">
                              {selectedInquiry.referenceNumber}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-500">Status:</span>
                            <select
                              value={selectedInquiry.status}
                              onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value as any)}
                              className="bg-white border border-gray-300 rounded-lg px-2.5 py-1 font-bold text-[#00264D] outline-none"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Quoted">Quoted</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Cancelled">Cancelled</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </div>
                        </div>

                        {/* Customer Info */}
                        <div className="grid grid-cols-2 gap-2 bg-white p-3.5 rounded-xl border border-gray-200">
                          <div>
                            <span className="text-gray-400 block text-[10px] uppercase">Customer</span>
                            <span className="font-bold text-gray-800 text-sm">{selectedInquiry.customerName}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block text-[10px] uppercase">Phone</span>
                            <a href={`tel:${selectedInquiry.phone}`} className="font-bold text-[#003566] underline">
                              {selectedInquiry.phone}
                            </a>
                          </div>
                          <div>
                            <span className="text-gray-400 block text-[10px] uppercase">Email</span>
                            <a href={`mailto:${selectedInquiry.email}`} className="text-gray-700 underline truncate block">
                              {selectedInquiry.email}
                            </a>
                          </div>
                          <div>
                            <span className="text-gray-400 block text-[10px] uppercase">Service Type</span>
                            <span className="font-semibold text-gray-700">{selectedInquiry.serviceType}</span>
                          </div>
                        </div>

                        {/* Trip specs */}
                        <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-1.5">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Destination:</span>
                            <span className="font-bold text-gray-800">{selectedInquiry.destination}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Departure:</span>
                            <span>{selectedInquiry.departureDate}</span>
                          </div>
                          {selectedInquiry.returnDate && (
                            <div className="flex justify-between">
                              <span className="text-gray-500">Return:</span>
                              <span>{selectedInquiry.returnDate}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-gray-500">Travelers:</span>
                            <span>{selectedInquiry.adultsCount} Adults, {selectedInquiry.childrenCount} Children</span>
                          </div>
                          {selectedInquiry.additionalNotes && (
                            <div className="pt-2 border-t border-gray-100">
                              <span className="text-gray-500 block mb-0.5">Client Notes:</span>
                              <p className="text-gray-700 italic bg-gray-50 p-2 rounded">{selectedInquiry.additionalNotes}</p>
                            </div>
                          )}
                        </div>

                        {/* Internal notes & log */}
                        <div className="space-y-2">
                          <span className="font-bold text-gray-700 block">Staff Activity & Notes</span>
                          <div className="space-y-1 max-h-32 overflow-y-auto">
                            {(selectedInquiry.internalNotes || []).map((note, i) => (
                              <div key={i} className="text-[11px] bg-white p-2 rounded-lg border border-gray-100 text-gray-600">
                                {note}
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-2 pt-1">
                            <input
                              type="text"
                              value={newNote}
                              onChange={(e) => setNewNote(e.target.value)}
                              placeholder="Add follow-up note..."
                              className="w-full text-xs bg-white rounded-lg border border-gray-300 p-2 outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => handleAddNote(selectedInquiry.id)}
                              className="px-3 py-2 bg-[#003566] text-white rounded-lg font-bold text-xs shrink-0"
                            >
                              Add
                            </button>
                          </div>
                        </div>

                        {/* Direct WhatsApp Action */}
                        <div className="pt-2">
                          <a
                            href={`https://wa.me/${selectedInquiry.phone.replace(/\D/g, '')}?text=Assalamu%20Alaikum%20${encodeURIComponent(selectedInquiry.customerName)},%20this%20is%20Pearl%20Travel%20&%20Tours%20regarding%20your%20inquiry%20reference%20${selectedInquiry.referenceNumber}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#20ba59]"
                          >
                            <span>Open Direct WhatsApp with Customer</span>
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-400">
                        Select an inquiry from the list to view full details and update status.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PACKAGES */}
            {activeTab === 'packages' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div>
                    <h3 className="text-xl font-bold text-[#00264D]">Tour Packages Catalog</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Active tour listings displayed across the website.</p>
                  </div>
                  <span className="text-xs font-bold text-[#003566] bg-gray-100 px-3 py-1 rounded-full">
                    {packages.length} Active Packages
                  </span>
                </div>

                <div className="divide-y divide-gray-100">
                  {packages.map((pkg) => (
                    <div key={pkg.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img src={pkg.image} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                        <div>
                          <h4 className="font-bold text-[#00264D] text-sm">{pkg.title}</h4>
                          <p className="text-xs text-gray-500">{pkg.destinationName} • {pkg.durationDays} Days</p>
                          <span className="text-xs font-bold text-[#003566]">{pkg.priceDisplay}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                          Published
                        </span>
                        <a
                          href={`/packages/${pkg.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold hover:bg-gray-50"
                        >
                          View Public Page
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: DESTINATIONS */}
            {activeTab === 'destinations' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div>
                    <h3 className="text-xl font-bold text-[#00264D]">Destinations Manager</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Top destinations featured on homepage and explore page.</p>
                  </div>
                  <span className="text-xs font-bold text-[#003566] bg-gray-100 px-3 py-1 rounded-full">
                    {destinations.length} Destinations
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {destinations.map((d) => (
                    <div key={d.id} className="p-4 rounded-2xl border border-gray-100 flex items-center gap-3 bg-gray-50">
                      <img src={d.image} alt="" className="w-14 h-14 rounded-full object-cover shrink-0" />
                      <div>
                        <h4 className="font-bold text-[#00264D] text-sm">{d.name}</h4>
                        <p className="text-xs text-gray-500">{d.region} ({d.country})</p>
                        <span className="text-[11px] text-[#003566] font-semibold">{d.highlights.length} Highlights</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: HOTELS */}
            {activeTab === 'hotels' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div>
                    <h3 className="text-xl font-bold text-[#00264D]">Hotels & Stays Catalog</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Verified partner hotels with discounted agency allotments.</p>
                  </div>
                  <span className="text-xs font-bold text-[#003566] bg-gray-100 px-3 py-1 rounded-full">
                    {hotels.length} Properties
                  </span>
                </div>

                <div className="divide-y divide-gray-100">
                  {hotels.map((h) => (
                    <div key={h.id} className="py-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img src={h.image} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0" />
                        <div>
                          <h4 className="font-bold text-[#00264D] text-sm">{h.name}</h4>
                          <p className="text-xs text-gray-500">{h.city}, {h.country} • {h.stars} Stars</p>
                          <span className="text-xs font-bold text-[#003566]">{h.priceDisplay}</span>
                        </div>
                      </div>

                      <a
                        href={`/hotels/${h.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold hover:bg-gray-50 shrink-0"
                      >
                        Preview Listing
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: WEBSITE SETTINGS */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#00264D]">Central Business Settings</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Update phone numbers, WhatsApp, office address, and support emails across all components.
                  </p>
                </div>

                {settingsSavedMessage && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Business settings saved successfully.</span>
                  </div>
                )}

                <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Business Name</label>
                      <input
                        type="text"
                        value={settings.businessName}
                        onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                        className="w-full text-xs rounded-xl border border-gray-200 p-2.5 outline-none focus:ring-1 focus:ring-[#F4B400]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Official Brand Slogan</label>
                      <input
                        type="text"
                        value={settings.tagline}
                        onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                        className="w-full text-xs rounded-xl border border-gray-200 p-2.5 outline-none focus:ring-1 focus:ring-[#F4B400]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Primary Phone</label>
                      <input
                        type="text"
                        value={settings.primaryPhone}
                        onChange={(e) => setSettings({ ...settings, primaryPhone: e.target.value })}
                        className="w-full text-xs rounded-xl border border-gray-200 p-2.5 outline-none focus:ring-1 focus:ring-[#F4B400]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Additional Contact 1</label>
                      <input
                        type="text"
                        value={settings.secondaryPhone}
                        onChange={(e) => setSettings({ ...settings, secondaryPhone: e.target.value })}
                        className="w-full text-xs rounded-xl border border-gray-200 p-2.5 outline-none focus:ring-1 focus:ring-[#F4B400]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Additional Contact 2</label>
                      <input
                        type="text"
                        value={settings.thirdPhone}
                        onChange={(e) => setSettings({ ...settings, thirdPhone: e.target.value })}
                        className="w-full text-xs rounded-xl border border-gray-200 p-2.5 outline-none focus:ring-1 focus:ring-[#F4B400]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Support Email</label>
                      <input
                        type="email"
                        value={settings.supportEmail}
                        onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                        className="w-full text-xs rounded-xl border border-gray-200 p-2.5 outline-none focus:ring-1 focus:ring-[#F4B400]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">WhatsApp Digits (for wa.me links)</label>
                      <input
                        type="text"
                        value={settings.whatsappNumber}
                        onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                        className="w-full text-xs rounded-xl border border-gray-200 p-2.5 outline-none focus:ring-1 focus:ring-[#F4B400]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Govt of Pakistan License (Ministry of Tourism)</label>
                      <input
                        type="text"
                        value={settings.govtLicense || ''}
                        onChange={(e) => setSettings({ ...settings, govtLicense: e.target.value })}
                        placeholder="GL# 6190"
                        className="w-full text-xs rounded-xl border border-gray-200 p-2.5 outline-none focus:ring-1 focus:ring-[#F4B400]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Google Maps Route Share URL</label>
                      <input
                        type="url"
                        value={settings.googleMapsUrl || ''}
                        onChange={(e) => setSettings({ ...settings, googleMapsUrl: e.target.value })}
                        placeholder="https://share.google/wkuwHtPzcg2pbQCBZ"
                        className="w-full text-xs rounded-xl border border-gray-200 p-2.5 outline-none focus:ring-1 focus:ring-[#F4B400]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Office Address (Hyderabad Head Office)</label>
                    <input
                      type="text"
                      value={settings.officeAddress}
                      onChange={(e) => setSettings({ ...settings, officeAddress: e.target.value })}
                      className="w-full text-xs rounded-xl border border-gray-200 p-2.5 outline-none focus:ring-1 focus:ring-[#F4B400]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#003566] text-[#F4B400] font-bold text-xs hover:bg-[#00264D] transition-colors"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* TAB: DATABASE / SUPABASE SETUP */}
            {activeTab === 'database' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#00264D]">Supabase Cloud Database Integration</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Connect your free cloud PostgreSQL & Auth instance on Supabase to persist travel inquiries indefinitely.
                  </p>
                </div>

                <div className="bg-[#F5F6F8] p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-[#00264D]">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Configuration Instructions:</span>
                  </div>
                  <ol className="list-decimal pl-5 space-y-1 text-gray-600">
                    <li>Create a project at <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-[#003566] underline">supabase.com</a>.</li>
                    <li>Go to the <strong>SQL Editor</strong> in your Supabase dashboard and run the schema query below.</li>
                    <li>Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to your environment file.</li>
                  </ol>
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between bg-[#00264D] text-white px-4 py-2 rounded-t-xl text-xs font-mono">
                    <span>schema.sql</span>
                    <button
                      type="button"
                      onClick={copySql}
                      className="flex items-center gap-1 text-[#F4B400] hover:underline"
                    >
                      {sqlCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{sqlCopied ? 'Copied!' : 'Copy SQL'}</span>
                    </button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-xl text-[11px] font-mono overflow-x-auto max-h-72">
                    {supabaseSqlSchema}
                  </pre>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
