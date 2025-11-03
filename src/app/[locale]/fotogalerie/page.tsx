import Gallery from '@common/Gallery/Gallery';
import type {Locale} from '../../../../i18n-config';
import {getIntl} from '../../../lib/intl';
import {generateMetadata as genMeta} from '../../../lib/metadata';
import {Metadata} from 'next';

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
        {id: 1, category: 'manikura', title: 'DSC 8027', src: '/static/images/DSC_8027.jpeg'},
        {id: 2, category: 'manikura', title: 'DSC 8090', src: '/static/images/DSC_8090.jpeg'},
        {id: 3, category: 'manikura', title: 'DSC 9859', src: '/static/images/DSC_9859.jpeg'},
        {id: 4, category: 'manikura', title: 'DSC 9961', src: '/static/images/DSC_9961.jpeg'},
        {id: 5, category: 'manikura', title: 'DSC 9993', src: '/static/images/DSC_9993.jpeg'},
        {id: 6, category: 'manikura', title: 'IMG 3462 Edit', src: '/static/images/IMG_3462-Edit.jpg'},
        {id: 7, category: 'manikura', title: 'IMG 3466 1', src: '/static/images/IMG_3466-1.jpg'},
        {id: 8, category: 'manikura', title: 'IMG 3474', src: '/static/images/IMG_3474.jpg'},
        {id: 9, category: 'manikura', title: 'IMG 3478', src: '/static/images/IMG_3478.jpg'},
        {id: 10, category: 'manikura', title: 'IMG 3481', src: '/static/images/IMG_3481.jpg'},
        {id: 11, category: 'manikura', title: 'Manikura Lipno 1 3', src: '/static/images/manikura_lipno-1-3.jpg'},
        {id: 12, category: 'manikura', title: 'Manikura Lipno 11', src: '/static/images/manikura_lipno-11.jpg'},
        {id: 13, category: 'manikura', title: 'Manikura Lipno 13 5', src: '/static/images/manikura_lipno-13-5.jpg'},
        {id: 14, category: 'manikura', title: 'Manikura Lipno 14', src: '/static/images/manikura_lipno-14.jpg'},
        {id: 15, category: 'manikura', title: 'Manikura Lipno 15', src: '/static/images/manikura_lipno-15.jpg'},
        {id: 16, category: 'manikura', title: 'Manikura Lipno 17', src: '/static/images/manikura_lipno-17.jpg'},
        {id: 17, category: 'manikura', title: 'Manikura Lipno 18', src: '/static/images/manikura_lipno-18.jpg'},
        {id: 18, category: 'manikura', title: 'Manikura Lipno 3', src: '/static/images/manikura_lipno-3.jpg'},
        {id: 19, category: 'manikura', title: 'Manikura Lipno 4', src: '/static/images/manikura_lipno-4.jpg'},
        {id: 20, category: 'manikura', title: 'Manikura Lipno 5 1', src: '/static/images/manikura_lipno-5-1.jpg'},
    ];

    const prefix = locale === 'cs' ? '' : `/${locale}`;

    return (
        <>
            {/* Hero Section */}
            <section
                className="bg-linear-to-br from-blue-50 to-white py-16 bg-cover bg-center bg-no-repeat"
                style={{backgroundImage: 'url(/static/images/background.png)'}}
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
