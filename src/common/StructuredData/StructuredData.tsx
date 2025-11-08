import Script from 'next/script';

interface LocalBusinessSchema {
    '@context': string;
    '@type': string;
    name: string;
    image: string;
    '@id': string;
    url: string;
    telephone: string;
    email: string;
    address: {
        '@type': string;
        streetAddress: string;
        addressLocality: string;
        addressCountry: string;
    };
    geo: {
        '@type': string;
        latitude: number;
        longitude: number;
    };
    openingHoursSpecification: Array<{
        '@type': string;
        dayOfWeek: string[];
        opens: string;
        closes: string;
    }>;
    priceRange: string;
    description: string;
    sameAs?: string[];
}

interface StructuredDataProps {
    locale?: string;
}

export default function StructuredData({locale = 'cs'}: StructuredDataProps) {
    const businessData: LocalBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'BeautySalon',
        name: 'Salon Fénix',
        image: 'https://www.salon-fenix.cz/static/images/logo.webp',
        '@id': 'https://www.salon-fenix.cz',
        url: 'https://www.salon-fenix.cz',
        telephone: '+420606313452',
        email: 'info@salon-fenix.cz',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Přední Výtoň 256',
            addressLocality: 'Přední Výtoň',
            addressCountry: 'CZ',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 48.6178,
            longitude: 14.1996,
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '10:00',
                closes: '17:00',
            },
        ],
        priceRange: '$$',
        description:
            locale === 'cs'
                ? 'Salon Fénix - profesionální kosmetické a masážní služby v Předním Výtoňi 256. Nabízíme masáže, pedikúru, manikúru a kosmetické ošetření.'
                : locale === 'en'
                  ? 'Salon Fénix - professional cosmetic and massage services in Předním Výtoňi 256. We offer massages, pedicure, manicure and cosmetic treatments.'
                  : 'Salon Fénix - professionelle kosmetische und Massagedienstleistungen in Předním Výtoňi 256. Wir bieten Massagen, Pediküre, Maniküre und kosmetische Behandlungen.',
    };

    return <Script id="structured-data" type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(businessData)}} />;
}

