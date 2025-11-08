import Gallery from '@common/Gallery/Gallery';
import {Metadata} from 'next';
import type {Locale} from '../../../../i18n-config';
import {getIntl} from '../../../lib/intl';
import {generateMetadata as genMeta} from '../../../lib/metadata';

type Props = {
    params: Promise<{locale: Locale}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {locale} = await params;
    const intl = await getIntl(locale);
    const title = intl.formatMessage({id: 'gallery.title'});
    const description = intl.formatMessage({id: 'gallery.description'});

    return genMeta({
        locale: locale as any,
        title,
        description,
        path: '/fotogalerie',
    });
}

const GalleryPage = async ({params}: Props) => {
    const {locale} = await params;
    const intl = await getIntl(locale);

    // Build gallery images from available static images
    const galleryImages = [
        {id: 1, category: 'manikura', title: 'Salon Fénix 1', src: '/static/images/salon_1.webp'},
        {id: 2, category: 'manikura', title: 'Salon Fénix 2', src: '/static/images/salon_2.webp'},
        {id: 3, category: 'manikura', title: 'Salon Fénix 3', src: '/static/images/salon_3.webp'},
        {id: 4, category: 'manikura', title: 'Salon Fénix 4', src: '/static/images/salon_4.webp'},
        {id: 5, category: 'manikura', title: 'Salon Fénix 5', src: '/static/images/salon_5.webp'},
        {id: 6, category: 'manikura', title: 'Salon Fénix 6', src: '/static/images/salon_6.webp'},
        {id: 7, category: 'manikura', title: 'Salon Fénix 7', src: '/static/images/salon_7.webp'},
        {id: 8, category: 'manikura', title: 'Salon Fénix 8', src: '/static/images/salon_8.webp'},
        {id: 9, category: 'manikura', title: 'Salon Fénix 9', src: '/static/images/salon_9.webp'},
        {id: 10, category: 'manikura', title: 'Salon Fénix 10', src: '/static/images/salon_10.webp'},
        {id: 11, category: 'manikura', title: 'Salon Fénix 11', src: '/static/images/salon_11.webp'},
        {id: 12, category: 'manikura', title: 'Salon Fénix 12', src: '/static/images/salon_12.webp'},
        {id: 13, category: 'manikura', title: 'Salon Fénix 13', src: '/static/images/salon_13.webp'},
        {id: 14, category: 'manikura', title: 'Salon Fénix 14', src: '/static/images/salon_14.webp'},
        {id: 15, category: 'manikura', title: 'Salon Fénix 15', src: '/static/images/salon_15.webp'},
        {id: 16, category: 'manikura', title: 'Salon Fénix 16', src: '/static/images/salon_16.webp'},
        {id: 17, category: 'manikura', title: 'Salon Fénix 17', src: '/static/images/salon_17.webp'},
        {id: 18, category: 'manikura', title: 'Salon Fénix 18', src: '/static/images/salon_18.webp'},
        {id: 19, category: 'manikura', title: 'Salon Fénix 19', src: '/static/images/salon_19.webp'},
        {id: 20, category: 'manikura', title: 'Salon Fénix 20', src: '/static/images/salon_20.webp'},
        {id: 21, category: 'manikura', title: 'Salon Fénix 21', src: '/static/images/salon_21.webp'},
        {id: 22, category: 'manikura', title: 'Salon Fénix 22', src: '/static/images/salon_22.webp'},
        {id: 23, category: 'manikura', title: 'Salon Fénix 23', src: '/static/images/salon_23.webp'},
        {id: 24, category: 'manikura', title: 'Salon Fénix 24', src: '/static/images/salon_24.webp'},
        {id: 25, category: 'manikura', title: 'Salon Fénix 25', src: '/static/images/salon_25.webp'},
        {id: 26, category: 'manikura', title: 'Salon Fénix 26', src: '/static/images/salon_26.webp'},
        {id: 27, category: 'manikura', title: 'Salon Fénix 27', src: '/static/images/salon_27.webp'},
    ];

    const prefix = locale === 'cs' ? '' : `/${locale}`;

    return (
        <>
            {/* Hero Section */}
            <section
                className="bg-linear-to-br from-blue-50 to-white py-16 bg-cover bg-center bg-no-repeat"
                style={{backgroundImage: 'url(/static/images/background.webp)'}}
            >
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{intl.formatMessage({id: 'gallery.title'})}</h1>
                        <p className="text-xl text-white">{intl.formatMessage({id: 'gallery.description'})}</p>
                    </div>
                </div>
            </section>

            <Gallery images={galleryImages} />

            {/* CTA Section */}
            <section className="py-16 bg-blue-600">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">{intl.formatMessage({id: 'gallery.likeOurSalon'})}</h2>
                        <p className="text-lg text-blue-100 mb-8">{intl.formatMessage({id: 'gallery.seeYourself'})}</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href={`${prefix}/kontakt` || '/kontakt'}
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
                            >
                                {intl.formatMessage({id: 'hero.bookAppointment'})}
                            </a>
                            <a
                                href={`${prefix}/sluzby` || '/sluzby'}
                                className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors"
                            >
                                {intl.formatMessage({id: 'hero.ourServices'})}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default GalleryPage;
