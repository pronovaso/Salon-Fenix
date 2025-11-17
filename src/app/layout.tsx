import {getDirection} from '@lib/intl';
import {SpeedInsights} from '@vercel/speed-insights/next';
import {Metadata, Viewport} from 'next';
import {i18n} from '../../i18n-config';
import './globals.css';

const RootLayout = ({children}: {children: React.ReactNode}) => {
    const defaultLang = i18n.defaultLocale;
    const dir = getDirection(defaultLang) ?? 'ltr';
    return (
        <html lang={defaultLang} dir={dir}>
            <body>
                {children}
                <SpeedInsights />
            </body>
        </html>
    );
};

export default RootLayout;

export const viewport: Viewport = {
    themeColor: '#1200E0',
    initialScale: 1,
    minimumScale: 1,
    width: 'device-width',
    viewportFit: 'cover',
    userScalable: false,
};

export const metadata: Metadata = {
    title: {
        default: 'Salon Fénix',
        template: '%s | Salon Fénix',
    },
    metadataBase: new URL('https://www.salon-fenix.cz'),
    description: 'Salon Fénix - profesionální kosmetické a masážní služby v Lipně nad Vltavou',
    keywords: ['salon', 'fenix', 'lipno', 'vltava', 'masaze', 'kosmetika', 'pedikura', 'manikura'],
    authors: [{name: 'Salon Fénix', url: 'https://www.salon-fenix.cz'}],
    creator: 'Salon Fénix',
    publisher: 'Salon Fénix',
    robots: 'index, follow',
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/static/images/logo.webp',
    },
    openGraph: {
        title: 'Salon Fénix',
        description: 'Salon Fénix - profesionální kosmetické a masážní služby v Lipně nad Vltavou',
        url: 'https://www.salon-fenix.cz',
        siteName: 'Salon Fénix',
        images: [
            {
                url: '/static/images/logo.webp',
                width: 1200,
                height: 630,
                alt: 'Salon Fénix logo',
            },
        ],
        locale: 'cs_CZ',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Salon Fénix',
        description: 'Salon Fénix - profesionální kosmetické a masážní služby v Lipně nad Vltavou',
        images: ['/static/images/logo.webp'],
    },
    manifest: '/manifest.json',
};
