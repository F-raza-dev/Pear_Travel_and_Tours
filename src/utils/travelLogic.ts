import { TourPackage } from '../types/travel';

/**
 * Generates an inquiry reference number in format PTT-YYYYMMDD-XXXX
 */
export function generateInquiryReference(date: Date = new Date(), randomSuffix?: string): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const suffix = randomSuffix || Math.random().toString(36).substring(2, 6).toUpperCase();
  return `PTT-${yyyy}${mm}${dd}-${suffix}`;
}

/**
 * Validates travel departure and return dates
 */
export function validateTravelDates(departureDateStr: string, returnDateStr?: string): { valid: boolean; error?: string } {
  if (!departureDateStr) {
    return { valid: false, error: 'Departure date is required.' };
  }

  const departure = new Date(departureDateStr);
  if (isNaN(departure.getTime())) {
    return { valid: false, error: 'Invalid departure date.' };
  }

  // Today check (at midnight)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  departure.setHours(0, 0, 0, 0);

  if (departure < today) {
    return { valid: false, error: 'Departure date cannot be in the past.' };
  }

  if (returnDateStr) {
    const returnDate = new Date(returnDateStr);
    if (isNaN(returnDate.getTime())) {
      return { valid: false, error: 'Invalid return date.' };
    }
    returnDate.setHours(0, 0, 0, 0);
    if (returnDate < departure) {
      return { valid: false, error: 'Return date cannot be earlier than departure date.' };
    }
  }

  return { valid: true };
}

/**
 * Formats a currency amount nicely
 */
export function formatPrice(amount?: number, currency: string = 'PKR'): string {
  if (!amount || amount <= 0) {
    return 'Request a Quote';
  }
  return `${currency} ${amount.toLocaleString('en-US')}`;
}

/**
 * Filters tour packages based on user queries and categories
 */
export function filterPackages(
  packages: TourPackage[],
  filters: { destination?: string; category?: string; query?: string }
): TourPackage[] {
  return packages.filter((pkg) => {
    if (!pkg.published) return false;

    if (filters.destination && filters.destination !== 'all') {
      const matchDest =
        pkg.destinationName.toLowerCase().includes(filters.destination.toLowerCase()) ||
        pkg.destinationId.toLowerCase() === filters.destination.toLowerCase() ||
        pkg.country.toLowerCase().includes(filters.destination.toLowerCase());
      if (!matchDest) return false;
    }

    if (filters.category && filters.category !== 'all') {
      if (pkg.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }
    }

    if (filters.query && filters.query.trim()) {
      const q = filters.query.toLowerCase().trim();
      const inTitle = pkg.title.toLowerCase().includes(q);
      const inDest = pkg.destinationName.toLowerCase().includes(q);
      const inDesc = pkg.shortDescription.toLowerCase().includes(q);
      const inCountry = pkg.country.toLowerCase().includes(q);
      if (!inTitle && !inDest && !inDesc && !inCountry) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Builds standard WhatsApp deep link
 */
export function buildWhatsAppUrl(rawPhone: string, message: string): string {
  const cleanPhone = rawPhone.replace(/\D/g, '');
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}
