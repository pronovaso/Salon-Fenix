import {Metadata} from 'next';
import {i18n} from '../../i18n-config';

export type Locale = (typeof i18n.locales)[number];

const siteUrl = 'https://www.salon-fenix.cz';

interface GenerateMetadataParams {
    locale: Locale;
    title: string;
    description: string;
    path: string;
    image?: string;
    noindex?: boolean;
}

export function generateMetadata({
    locale,
    title,
    description,
    path,
    image = '/static/images/logo.webp',
    noindex = false,
}: GenerateMetadataParams): Metadata {
    const localePrefix = locale === 'cs' ? '' : `/${locale}`;
    const fullPath = `${localePrefix}${path}`;
    const canonicalUrl = `${siteUrl}${fullPath}`;
    const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

    const localeMap: Record<Locale, string> = {
        cs: 'cs_CZ',
        en: 'en_US',
        de: 'de_DE',
    };

    const alternateLanguages: Record<string, string> = {};
    i18n.locales.forEach((loc) => {
        const prefix = loc === 'cs' ? '' : `/${loc}`;
        alternateLanguages[loc === 'cs' ? 'cs-CZ' : loc === 'en' ? 'en-US' : 'de-DE'] = `${siteUrl}${prefix}${path}`;
    });

    return {
        title,
        description,
        metadataBase: new URL(siteUrl),
        alternates: {
            canonical: canonicalUrl,
            languages: alternateLanguages,
        },
        robots: noindex ? 'noindex, nofollow' : 'index, follow',
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: 'Salon Fénix',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: localeMap[locale],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [imageUrl],
        },
    };
}

