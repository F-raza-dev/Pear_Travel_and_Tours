export type TravelServiceType = 
  | 'Domestic Tour' 
  | 'International Tour' 
  | 'Umrah Package' 
  | 'Hotel Booking' 
  | 'Flight Assistance' 
  | 'Customized Holiday'
  | 'Corporate / Group'
  | 'B2B Agent Services';

export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: 'Pakistan' | 'Middle East' | 'Europe' | 'Asia' | 'Other';
  tagline: string;
  description: string;
  image: string;
  featured: boolean;
  highlights: string[];
  bestTimeToVisit: string;
  packageCount?: number;
}

export interface PackageItineraryDay {
  day: number;
  title: string;
  description: string;
  mealsIncluded?: string;
  stayLocation?: string;
}

export interface TourPackage {
  id: string;
  slug: string;
  title: string;
  category: 'Northern Pakistan' | 'Dubai Getaway' | 'Umrah' | 'International' | 'Custom';
  destinationId: string;
  destinationName: string;
  country: string;
  durationDays: number;
  durationNights: number;
  startingPricePKR?: number; // Optional verified price
  priceDisplay: string; // e.g., "Request a Quote" or "PKR 125,000 / person"
  shortDescription: string;
  overview: string;
  image: string;
  galleryImages: string[];
  featured: boolean;
  published: boolean;
  itinerary: PackageItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  accommodationType: string;
  importantNotes: string[];
}

export interface Hotel {
  id: string;
  slug: string;
  name: string;
  city: string;
  country: string;
  stars: number;
  pricePerNightPKR?: number;
  priceDisplay: string; // "Request a Quote" or "From PKR 22,000 / night"
  image: string;
  galleryImages: string[];
  address: string;
  description: string;
  amenities: string[];
  roomTypes: string[];
  featured: boolean;
  published: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  image: string;
  email?: string;
  phone?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  location: string;
  tourName: string;
  rating: number;
  quote: string;
  date: string;
  verified: boolean;
  avatarUrl?: string;
}

export type InquiryStatus = 'New' | 'Contacted' | 'Quoted' | 'Confirmed' | 'Cancelled' | 'Closed';

export interface TravelInquiry {
  id: string;
  referenceNumber: string;
  createdAt: string;
  customerName: string;
  agencyName?: string; // For B2B agents
  email: string;
  phone: string;
  serviceType: TravelServiceType;
  destination: string;
  packageOrHotelId?: string;
  packageOrHotelName?: string;
  departureDate: string;
  returnDate?: string;
  adultsCount: number;
  childrenCount: number;
  roomsCount?: number;
  budgetRange?: string;
  currency: string;
  additionalNotes?: string;
  consentAccepted: boolean;
  status: InquiryStatus;
  internalNotes?: string[];
}

export interface SiteSettings {
  businessName: string;
  tagline: string;
  govtLicense: string; // e.g. "GL# 6190"
  ministryAuth: string;
  websiteUrl: string;
  primaryPhone: string;
  primaryPhoneFormatted: string;
  secondaryPhone: string;
  thirdPhone: string;
  whatsappNumber: string; // Raw digits for link
  supportEmail: string;
  officeAddress: string;
  googleMapsUrl: string;
  workingHours: string;
  enableLiveSupabase: boolean;
  socials: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}
