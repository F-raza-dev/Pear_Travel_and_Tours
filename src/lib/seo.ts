import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  type?: string;
  schema?: Record<string, unknown>;
}

export function useDocumentTitleAndSEO({
  title,
  description,
  canonicalPath = '',
  ogImage = '/assets/aistudio/183936-removebg-preview_4ee74c53.png',
  type = 'website',
  schema,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = title 
      ? `${title} | Pearl Travel & Tours (GL# 6190)`
      : 'Pearl Travel & Tours (GL# 6190) — Explore the World with Pearl';
    document.title = fullTitle;

    const defaultDesc = 'Pearl Travel & Tours is a Government of Pakistan Ministry of Tourism licensed travel agency (GL# 6190) in Hyderabad offering Northern Pakistan tours, Umrah packages, Dubai holidays, and B2B agent services.';
    const finalDesc = description || defaultDesc;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', finalDesc);

    // OG Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', fullTitle);

    // OG Description
    let ogDescEl = document.querySelector('meta[property="og:description"]');
    if (!ogDescEl) {
      ogDescEl = document.createElement('meta');
      ogDescEl.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescEl);
    }
    ogDescEl.setAttribute('content', finalDesc);

    // OG Image
    let ogImgEl = document.querySelector('meta[property="og:image"]');
    if (!ogImgEl) {
      ogImgEl = document.createElement('meta');
      ogImgEl.setAttribute('property', 'og:image');
      document.head.appendChild(ogImgEl);
    }
    ogImgEl.setAttribute('content', ogImage);

    // OG Type
    let ogTypeEl = document.querySelector('meta[property="og:type"]');
    if (!ogTypeEl) {
      ogTypeEl = document.createElement('meta');
      ogTypeEl.setAttribute('property', 'og:type');
      document.head.appendChild(ogTypeEl);
    }
    ogTypeEl.setAttribute('content', type);

    // Canonical link
    const canonicalUrl = `https://pearltravelandtours.com${canonicalPath}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // JSON-LD Structured Data
    const defaultSchema = {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      name: 'Pearl Travel & Tours',
      legalName: 'Pearl Travel & Tours',
      url: 'https://pearltravelandtours.com',
      logo: 'https://pearltravelandtours.com/assets/aistudio/183936-removebg-preview_4ee74c53.png',
      telephone: '+92-315-3171263',
      email: 'info@pearltravelandtours.com',
      license: 'GL# 6190',
      award: 'Licensed by Government of Pakistan Ministry of Tourism (Department of Tourist Services)',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Shop#3 Plot#4/284, Jelani House, Sarfaraz Incline, near Bin Tayyab Hospital, Chari',
        addressLocality: 'Hyderabad',
        addressRegion: 'Sindh',
        postalCode: '71000',
        addressCountry: 'PK',
      },
      hasMap: 'https://share.google/wkuwHtPzcg2pbQCBZ',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 25.3960,
        longitude: 68.3578,
      },
      priceRange: '$$',
      slogan: 'Explore the World with Pearl.',
      currenciesAccepted: 'PKR, USD, SAR, AED',
      paymentAccepted: 'Bank Transfer, Cash, Pay Order',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:30',
          closes: '19:00',
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Pearl Travel Services Catalog',
        itemListElement: [
          {
            '@type': 'OfferCatalog',
            name: 'Northern Pakistan Tours',
            description: 'Guided mountain tours across Hunza, Skardu, Gilgit, and Swat.',
          },
          {
            '@type': 'OfferCatalog',
            name: 'Umrah Pilgrimage Packages',
            description: 'Walking-distance hotel packages, visas, and VIP transportation in Makkah and Madinah.',
          },
          {
            '@type': 'OfferCatalog',
            name: 'B2B Travel Agent Services',
            description: 'Wholesale group ticketing, transport fleets, and hotel allotments for partner agencies.',
          },
        ],
      },
    };

    const targetSchema = schema || defaultSchema;
    let scriptTag = document.getElementById('ptt-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'ptt-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(targetSchema);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [title, description, canonicalPath, ogImage, type, schema]);
}
