import ServiceCard from '@common/ServiceCard/ServiceCard';
import {Metadata} from 'next';
import {getIntl} from '../../../lib/intl';
import {generateMetadata as genMeta} from '../../../lib/metadata';
import {getServices} from '../../../lib/services';

type Props = {
    params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {locale} = await params;
    const intl = await getIntl(locale);
    const title = intl.formatMessage({id: 'services.title'});
    const description = intl.formatMessage({id: 'services.description'});

    return genMeta({
        locale,
        title,
        description,
        path: '/sluzby',
    });
}

const ServicesPage = async ({params}: Props) => {
    const {locale} = await params;
    const intl = await getIntl(locale);

    const servicesData = getServices();
    const services = servicesData.map((service) => {
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
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{intl.formatMessage({id: 'services.title'})}</h1>
                        <p className="text-xl text-white">{intl.formatMessage({id: 'services.description'})}</p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
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

            {/* CTA Section */}
            <section className="py-16 bg-blue-600">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">{intl.formatMessage({id: 'cta.haveQuestions'})}</h2>
                        <p className="text-lg text-blue-100 mb-8">{intl.formatMessage({id: 'cta.wellAdvise'})}</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href={`${prefix}/kontakt` || '/kontakt'}
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
                            >
                                {intl.formatMessage({id: 'cta.contactUs'})}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ServicesPage;
