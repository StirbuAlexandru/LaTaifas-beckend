'use client';

import Script from 'next/script';

export default function StructuredData() {
  const restaurantSchema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': 'https://lataifas-suceava.ro/#restaurant',
    name: 'La Taifas',
    image: 'https://lataifas-suceava.ro/images/logo.png',
    description: 'Restaurant și terasă în Suceava - mâncare tradițională românească, pizza, paste, vinuri selectate. Livrare la domiciliu.',
    url: 'https://lataifas-suceava.ro',
    telephone: '+40-XXX-XXX-XXX',
    priceRange: '$$',
    servesCuisine: ['Romanian', 'Italian', 'European'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Strada Burdujeni',
      addressLocality: 'Suceava',
      addressRegion: 'Suceava',
      postalCode: '720000',
      addressCountry: 'RO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 47.6500,
      longitude: 26.2500,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '10:00',
        closes: '23:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday', 'Saturday'],
        opens: '10:00',
        closes: '00:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:00',
        closes: '23:00',
      },
    ],
    hasMenu: 'https://lataifas-suceava.ro/comanda-online',
    acceptsReservations: 'True',
    paymentAccepted: 'Cash, Credit Card',
    currenciesAccepted: 'RON',
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://lataifas-suceava.ro/#localbusiness',
    name: 'La Taifas Restaurant',
    image: 'https://lataifas-suceava.ro/images/logo.png',
    logo: 'https://lataifas-suceava.ro/images/logo.png',
    url: 'https://lataifas-suceava.ro',
    telephone: '+40-XXX-XXX-XXX',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Strada Burdujeni',
      addressLocality: 'Suceava',
      addressRegion: 'Suceava',
      postalCode: '720000',
      addressCountry: 'RO',
    },
    sameAs: [
      'https://www.facebook.com/lataifas',
      'https://www.instagram.com/lataifas',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://lataifas-suceava.ro/#website',
    name: 'La Taifas Restaurant',
    url: 'https://lataifas-suceava.ro',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://lataifas-suceava.ro/comanda-online?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Acasă',
        item: 'https://lataifas-suceava.ro',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Comandă Online',
        item: 'https://lataifas-suceava.ro/comanda-online',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Vinuri',
        item: 'https://lataifas-suceava.ro/vinuri',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Despre Noi',
        item: 'https://lataifas-suceava.ro/about',
      },
    ],
  };

  return (
    <>
      <Script
        id="restaurant-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
