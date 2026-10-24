import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateInquiryReference,
  validateTravelDates,
  formatPrice,
  filterPackages,
  buildWhatsAppUrl,
} from './travelLogic';
import { TourPackage } from '../types/travel';

test('generateInquiryReference outputs correct prefix and format', () => {
  const fixedDate = new Date(2026, 9, 24); // Oct 24, 2026
  const ref = generateInquiryReference(fixedDate, 'ABCD');
  assert.equal(ref, 'PTT-20261024-ABCD');
});

test('validateTravelDates checks departure and return constraints', () => {
  // Empty departure
  const emptyCheck = validateTravelDates('');
  assert.equal(emptyCheck.valid, false);

  // Return date before departure
  const invalidRange = validateTravelDates('2026-11-10', '2026-11-05');
  assert.equal(invalidRange.valid, false);
  assert.match(invalidRange.error || '', /Return date cannot be earlier/);

  // Valid range
  const validRange = validateTravelDates('2026-11-10', '2026-11-18');
  assert.equal(validRange.valid, true);
});

test('formatPrice displays Request a Quote or formatted currency', () => {
  assert.equal(formatPrice(undefined), 'Request a Quote');
  assert.equal(formatPrice(0), 'Request a Quote');
  assert.equal(formatPrice(125000, 'PKR'), 'PKR 125,000');
});

test('filterPackages correctly matches category, destination and query', () => {
  const dummyPackages: TourPackage[] = [
    {
      id: '1',
      slug: 'hunza-autumn',
      title: 'Hunza Autumn Dream',
      category: 'Northern Pakistan',
      destinationId: 'dest-hunza',
      destinationName: 'Hunza Valley',
      country: 'Pakistan',
      durationDays: 7,
      durationNights: 6,
      priceDisplay: 'Request a Quote',
      shortDescription: 'Golden autumn colors in Gilgit-Baltistan',
      overview: '',
      image: '',
      galleryImages: [],
      featured: true,
      published: true,
      itinerary: [],
      inclusions: [],
      exclusions: [],
      accommodationType: 'Hotel',
      importantNotes: [],
    },
    {
      id: '2',
      slug: 'dubai-luxury',
      title: 'Dubai Desert & Marina Escape',
      category: 'Dubai Getaway',
      destinationId: 'dest-dubai',
      destinationName: 'Dubai',
      country: 'United Arab Emirates',
      durationDays: 5,
      durationNights: 4,
      priceDisplay: 'Request a Quote',
      shortDescription: 'Modern cityscape and dune bashing',
      overview: '',
      image: '',
      galleryImages: [],
      featured: true,
      published: true,
      itinerary: [],
      inclusions: [],
      exclusions: [],
      accommodationType: '4-star Hotel',
      importantNotes: [],
    },
    {
      id: '3',
      slug: 'unpublished-pkg',
      title: 'Draft Tour',
      category: 'International',
      destinationId: 'dest-turkey',
      destinationName: 'Istanbul',
      country: 'Türkiye',
      durationDays: 6,
      durationNights: 5,
      priceDisplay: 'Request a Quote',
      shortDescription: 'Draft',
      overview: '',
      image: '',
      galleryImages: [],
      featured: false,
      published: false,
      itinerary: [],
      inclusions: [],
      exclusions: [],
      accommodationType: 'Hotel',
      importantNotes: [],
    },
  ];

  // Category filter
  const northernOnly = filterPackages(dummyPackages, { category: 'Northern Pakistan' });
  assert.equal(northernOnly.length, 1);
  assert.equal(northernOnly[0].id, '1');

  // Search query
  const marinaSearch = filterPackages(dummyPackages, { query: 'Marina' });
  assert.equal(marinaSearch.length, 1);
  assert.equal(marinaSearch[0].id, '2');

  // Unpublished items must not be shown
  const draftSearch = filterPackages(dummyPackages, { query: 'Draft' });
  assert.equal(draftSearch.length, 0);
});

test('buildWhatsAppUrl properly strips non-digit characters and encodes message', () => {
  const url = buildWhatsAppUrl('+92 315 3171263', 'Assalamu Alaikum! Inquiry for Hunza');
  assert.ok(url.startsWith('https://wa.me/923153171263?text='));
  assert.ok(url.includes('Hunza'));
});
