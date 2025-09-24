import Script from 'next/script'

interface Product {
  id: string
  name: string
  description: string
  price: number
  sale_price?: number
  image: string
  rating?: number
  reviews_count?: number
  brand?: string
  sku?: string
  availability?: 'InStock' | 'OutOfStock'
}

interface Organization {
  name: string
  url: string
  logo: string
  description: string
  address: {
    streetAddress: string
    addressLocality: string
    addressCountry: string
  }
  contactPoint: {
    telephone: string
    email: string
    contactType: string
  }
}

export function ProductStructuredData({ product }: { product: Product }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku || product.id,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'מכון הניג',
    },
    offers: {
      '@type': 'Offer',
      price: product.sale_price || product.price,
      priceCurrency: 'ILS',
      availability: product.availability || 'InStock',
      url: `${process.env.NEXT_PUBLIC_APP_URL}/products/${product.id}`,
    },
    ...(product.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviews_count || 0,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  }

  return (
    <Script
      id="product-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function OrganizationStructuredData() {
  const organization: Organization = {
    name: 'מכון הניג',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://henig.co.il',
    logo: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
    description: 'מכון מוביל בטיפולים טבעיים לבעיות עיכול',
    address: {
      streetAddress: 'רחוב הרופאים 15',
      addressLocality: 'תל אביב',
      addressCountry: 'IL',
    },
    contactPoint: {
      telephone: '+972-3-1234567',
      email: 'info@henig-institute.com',
      contactType: 'customer service',
    },
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    ...organization,
  }

  return (
    <Script
      id="organization-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function WebsiteStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'מכון הניג',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://henig.co.il',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_APP_URL}/products?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function LocalBusinessStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': process.env.NEXT_PUBLIC_APP_URL,
    name: 'מכון הניג',
    image: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
    telephone: '+972-3-1234567',
    email: 'info@henig-institute.com',
    url: process.env.NEXT_PUBLIC_APP_URL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'רחוב הרופאים 15',
      addressLocality: 'תל אביב',
      addressCountry: 'IL',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Friday',
        opens: '08:00',
        closes: '13:00',
      },
    ],
    priceRange: '₪₪',
    sameAs: [
      'https://www.facebook.com/henig-institute',
      'https://www.instagram.com/henig-institute',
    ],
  }

  return (
    <Script
      id="local-business-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
