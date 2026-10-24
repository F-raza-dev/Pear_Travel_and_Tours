import { TravelInquiry, SiteSettings, TourPackage, Hotel, Destination } from '../types/travel';
import { initialSiteSettings, packagesData, hotelsData, destinationsData } from '../data/travelData';
import { generateInquiryReference } from '../utils/travelLogic';

const INQUIRIES_STORAGE_KEY = 'ptt_travel_inquiries_v1';
const SETTINGS_STORAGE_KEY = 'ptt_site_settings_v1';
const PACKAGES_STORAGE_KEY = 'ptt_packages_v1';
const HOTELS_STORAGE_KEY = 'ptt_hotels_v1';
const DESTINATIONS_STORAGE_KEY = 'ptt_destinations_v1';

// Initial sample inquiries for demonstration in the admin dashboard
const initialDemoInquiries: TravelInquiry[] = [
  {
    id: 'inq-101',
    referenceNumber: 'PTT-20261020-K78B',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    customerName: 'Asad Mehmood',
    email: 'asad.mehmood@example.com',
    phone: '+92 321 4455667',
    serviceType: 'Domestic Tour',
    destination: 'Hunza & Gilgit-Baltistan',
    packageOrHotelId: 'pkg-hunza-adventure',
    packageOrHotelName: 'Northern Pakistan Scenic Adventure',
    departureDate: '2026-11-15',
    returnDate: '2026-11-22',
    adultsCount: 4,
    childrenCount: 1,
    budgetRange: 'PKR 400,000 - 500,000',
    currency: 'PKR',
    additionalNotes: 'Need Prado with baby seat and heater in rooms.',
    consentAccepted: true,
    status: 'New',
    internalNotes: ['Called customer at 11 AM, requested custom quote for Prado SUV.'],
  },
  {
    id: 'inq-102',
    referenceNumber: 'PTT-20261022-P92M',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    customerName: 'Khurram Shehzad',
    email: 'khurram.shehzad@example.com',
    phone: '+92 300 8899112',
    serviceType: 'Umrah Package',
    destination: 'Makkah & Madinah',
    packageOrHotelId: 'pkg-umrah-spiritual',
    packageOrHotelName: 'Blessed Umrah Spiritual Package',
    departureDate: '2026-12-01',
    returnDate: '2026-12-15',
    adultsCount: 2,
    childrenCount: 0,
    budgetRange: 'PKR 600,000',
    currency: 'PKR',
    additionalNotes: 'Require 5-star walking distance clock tower hotel in Makkah.',
    consentAccepted: true,
    status: 'Contacted',
    internalNotes: ['Sent WhatsApp itinerary options for Swissôtel Al Maqam.'],
  },
];

export function getStoredInquiries(): TravelInquiry[] {
  try {
    const raw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(initialDemoInquiries));
      return initialDemoInquiries;
    }
    return JSON.parse(raw);
  } catch {
    return initialDemoInquiries;
  }
}

export function saveNewInquiry(
  inquiryData: Omit<TravelInquiry, 'id' | 'referenceNumber' | 'createdAt' | 'status'>
): TravelInquiry {
  const inquiries = getStoredInquiries();
  const id = `inq-${Date.now()}`;
  const referenceNumber = generateInquiryReference();
  const newInquiry: TravelInquiry = {
    ...inquiryData,
    id,
    referenceNumber,
    createdAt: new Date().toISOString(),
    status: 'New',
    internalNotes: ['Received via website booking inquiry portal.'],
  };

  const updated = [newInquiry, ...inquiries];
  localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
  return newInquiry;
}

export function updateInquiryStatus(id: string, status: TravelInquiry['status'], note?: string): void {
  const inquiries = getStoredInquiries();
  const updated = inquiries.map((item) => {
    if (item.id === id) {
      const existingNotes = item.internalNotes || [];
      const newNotes = note ? [...existingNotes, note] : existingNotes;
      return { ...item, status, internalNotes: newNotes };
    }
    return item;
  });
  localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
}

export function getStoredSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(initialSiteSettings));
      return initialSiteSettings;
    }
    return { ...initialSiteSettings, ...JSON.parse(raw) };
  } catch {
    return initialSiteSettings;
  }
}

export function saveSettings(settings: SiteSettings): void {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

export function getStoredPackages(): TourPackage[] {
  try {
    const raw = localStorage.getItem(PACKAGES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PACKAGES_STORAGE_KEY, JSON.stringify(packagesData));
      return packagesData;
    }
    return JSON.parse(raw);
  } catch {
    return packagesData;
  }
}

export function getStoredHotels(): Hotel[] {
  try {
    const raw = localStorage.getItem(HOTELS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(HOTELS_STORAGE_KEY, JSON.stringify(hotelsData));
      return hotelsData;
    }
    return JSON.parse(raw);
  } catch {
    return hotelsData;
  }
}

export function getStoredDestinations(): Destination[] {
  try {
    const raw = localStorage.getItem(DESTINATIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(DESTINATIONS_STORAGE_KEY, JSON.stringify(destinationsData));
      return destinationsData;
    }
    return JSON.parse(raw);
  } catch {
    return destinationsData;
  }
}
