import {getIntl} from '@lib/intl';
import {generateMetadata as genMeta} from '@lib/metadata';
import {getIndexServices} from '@lib/services';
import {Metadata} from 'next';
import Image from 'next/image';
import Hero from 'src/common/Hero/Hero';
import ServiceCard from 'src/common/ServiceCard/ServiceCard';

type Props = {
    params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {locale} = await params;
    const intl = await getIntl(locale);
    const title = intl.formatMessage({id: 'home.meta.title'});
    const description = intl.formatMessage({id: 'home.meta.description'});

    return genMeta({
        locale,
        title,
        description,
        path: '/',
    });
}

const HomePage = async ({params}: Props) => {
    const {locale} = await params;
    const intl = await getIntl(locale);

    const indexServicesData = getIndexServices();
    const featuredServices = indexServicesData.map((service) => {
        // Speciální mapování pro klasickou masáž
        let titleKey = `servicesList.${service.id}`;
        let descriptionKey = `servicesList.${service.id}.description`;

        if (service.id === 'klasickaMasaz') {
            titleKey = 'sluzby.masaz.klasicka';
            descriptionKey = 'sluzby.masaz.klasicka.description';
        }

        return {
            title: intl.formatMessage({id: titleKey}),
            description: intl.formatMessage({id: descriptionKey}),
            price: service.price,
            image: service.image,
        };
    });

    const contactInfo = {
        phone: '+420 606 313 452',
        hours: locale === 'cs' ? 'Po - Pá: 10:00 - 17:00' : 'Mon - Fri: 10:00 - 17:00',
        additionalHours: locale === 'cs' ? 'a dle telefonických objednávek + víkendy' : 'and by phone appointment + weekends',
    };

    return (
        <>
            <Hero locale={locale} />

            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">{intl.formatMessage({id: 'contact.quickReservation'})}</h2>
                            <p className="text-lg text-gray-700">
                                {intl.formatMessage({id: 'common.phone'})}:{' '}
                                <a href="tel:+420606313452" className="text-blue-600 hover:text-blue-800 font-semibold">
                                    {contactInfo.phone}
                                </a>
                            </p>
                        </div>

                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">{intl.formatMessage({id: 'common.openingHours'})}</h2>
                            <p className="text-lg text-gray-700">{contactInfo.hours}</p>
                            <p className="text-sm text-gray-600 mt-1">{contactInfo.additionalHours}</p>
                        </div>

                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">{intl.formatMessage({id: 'cta.haveQuestions'})}</h2>
                            <p className="text-lg text-gray-700">{intl.formatMessage({id: 'cta.wellAdvise'})}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{intl.formatMessage({id: 'cta.haveQuestions'})}</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{intl.formatMessage({id: 'services.description'})}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        <div className="text-center p-6 bg-blue-50 rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{intl.formatMessage({id: 'services.massage.title'})}</h3>
                            <p className="text-gray-600">{intl.formatMessage({id: 'services.massage.description'})}</p>
                        </div>

                        <div className="text-center p-6 bg-blue-50 rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{intl.formatMessage({id: 'services.cosmetics.title'})}</h3>
                            <p className="text-gray-600">{intl.formatMessage({id: 'services.cosmetics.description'})}</p>
                        </div>

                        <div className="text-center p-6 bg-blue-50 rounded-lg">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{intl.formatMessage({id: 'services.pedicure.title'})}</h3>
                            <p className="text-gray-600">{intl.formatMessage({id: 'services.pedicure.description'})}</p>
                        </div>
                    </div>
                </div>
            </section> */}

            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{intl.formatMessage({id: 'pricing.interested'})}</h2>
                        <p className="text-lg text-gray-600">{intl.formatMessage({id: 'pricing.bookToday'})}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredServices.map((service) => (
                            <ServiceCard
                                key={service.title}
                                title={service.title}
                                description={service.description}
                                price={service.price}
                                image={service.image}
                                locale={locale}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{intl.formatMessage({id: 'home.membership.title'})}</h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">{intl.formatMessage({id: 'home.membership.description'})}</p>
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full">
                            <Image src="/static/images/Logo-ČPS-JPEG-300x300.webp" alt="Logo ČPS" width={300} height={300} className="rounded-full" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-blue-600">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">{intl.formatMessage({id: 'cta.bookMassage'})}</h2>
                        <p className="text-lg text-blue-100 mb-8">{intl.formatMessage({id: 'cta.bookToday'})}</p>
                        <a
                            href={'/kontakt'}
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
                        >
                            {intl.formatMessage({id: 'common.bookNow'})}
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
