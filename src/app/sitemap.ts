import {MetadataRoute} from 'next';
import {i18n} from '../../i18n-config';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.salon-fenix.cz';

    const routes = ['', '/sluzby', '/cenik', '/kontakt', '/portfolio', '/fotogalerie'];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    // Generate sitemap entries for each locale
    i18n.locales.forEach((locale) => {
        const prefix = locale === 'cs' ? '' : `/${locale}`;

        routes.forEach((route) => {
            const url = `${baseUrl}${prefix}${route}`;
            sitemapEntries.push({
                url,
                lastModified: new Date(),
                changeFrequency: route === '' ? 'weekly' : 'monthly',
                priority: route === '' ? 1.0 : 0.8,
            });
        });
    });

    return sitemapEntries;
}
