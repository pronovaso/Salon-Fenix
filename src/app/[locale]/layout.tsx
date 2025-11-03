import Footer from '@common/Footer/Footer';
import Header from '@common/Header/Header';
import StructuredData from '@common/StructuredData/StructuredData';
import {getEnvValueArray} from '@common/services/CommonService';
import {IntlProvider} from '@lib/IntlProvider';
import {getIntl} from '@lib/intl';
import {Metadata, Viewport} from 'next';
import {headers} from 'next/headers';
import {ReactNode} from 'react';
import {GoogleReCaptchaProvider} from '../../lib/GoogleReCaptchaProvider';
type Props = {
    children: ReactNode;
    params: Promise<{locale: string}>;
};
const RootLayout = async ({children, params}: Props) => {
    const {locale} = await params;
    const reqHeaders = await headers();
    const nonce = (reqHeaders as any).get?.('x-nonce') ?? undefined;
    const env = await getEnvValueArray(['RECAPTCHA_SITE_KEY']);
    const reCaptchaCode = env.RECAPTCHA_SITE_KEY || '';

    const intl = await getIntl(locale as any);
    // Get messages from intl instance
    const messages = (await import(`../../lang/${locale}.json`)).default;
    const prefix = locale === 'cs' ? '' : `/${locale}`;
    const navigation = [
        {name: intl.formatMessage({id: 'navigation.home'}), href: prefix || '/'},
        {name: intl.formatMessage({id: 'navigation.services'}), href: `${prefix}/sluzby` || '/sluzby'},
        {name: intl.formatMessage({id: 'navigation.pricing'}), href: `${prefix}/cenik` || '/cenik'},
        {name: intl.formatMessage({id: 'navigation.contact'}), href: `${prefix}/kontakt` || '/kontakt'},
        {name: intl.formatMessage({id: 'navigation.gallery'}), href: `${prefix}/fotogalerie` || '/fotogalerie'},
        {name: intl.formatMessage({id: 'navigation.portfolio'}), href: `${prefix}/portfolio` || '/portfolio'},
    ];
    const brandName = intl.formatMessage({id: 'hero.title'});
    const openMenuLabel = 'Open main menu';
    const langLabels = {cs: 'CZ', en: 'EN', de: 'DE'} as const;

    return (
        <IntlProvider messages={messages} locale={locale}>
            <GoogleReCaptchaProvider type="v2-checkbox" siteKey={reCaptchaCode} scriptProps={{nonce}}>
                <StructuredData locale={locale} />
                <Header locale={locale} navigation={navigation} brandName={brandName} openMenuLabel={openMenuLabel} langLabels={langLabels} />
                {children}
                <Footer locale={locale} prefix={prefix} />
            </GoogleReCaptchaProvider>
        </IntlProvider>
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
