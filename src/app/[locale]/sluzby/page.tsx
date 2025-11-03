import ServiceCard from '@common/ServiceCard/ServiceCard';
import {getIntl} from '../../../lib/intl';
import {generateMetadata as genMeta} from '../../../lib/metadata';
import {Metadata} from 'next';

type Props = {
    params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {locale} = await params;
    const intl = await getIntl(locale);
    const title = intl.formatMessage({id: 'services.title'});
    const description = intl.formatMessage({id: 'services.description'});

    return genMeta({
        locale: locale as any,
        title,
        description,
        path: '/sluzby',
    });
}

const ServicesPage = async ({params}: Props) => {
    const {locale} = await params;
    const intl = await getIntl(locale);

    const services = [
        {
            title: 'Relaxační masáže',
            description: 'Klasická relaxační masáž pro uvolnění svalového napětí a stresu. Ideální pro regeneraci těla i duše.',
            price: 'od 800 Kč',
            image: '/static/images/Relax.webp',
        },
        {
            title: 'Rašelinové zábaly',
            description: 'Hluboce prohřívají, detoxikují organismus a pomáhají při revmatických potížích.',
            price: '900 Kč',
            image: '/static/images/Raselina.webp',
        },
        {
            title: 'Havajská masáž Lomi Lomi',
            description: 'Tradiční havajská masáž pomocí předloktí a dlaní. Pracuje s energií a uvolňuje blokády.',
            price: '1200 Kč',
            image: '/static/images/Lomi.webp',
        },
        {
            title: 'Thajská masáž',
            description: 'Akupresurní masáž kombinovaná s protahováním. Zlepšuje flexibilitu a energii těla.',
            price: '1000 Kč',
            image: '/static/images/Thai.webp',
        },
        {
            title: 'Přístrojová pedikúra',
            description: 'Profesionální péče o chodidla a nehty pomocí moderních přístrojů. Včetně nehtových špon a hloubkové abraze.',
            price: '580 Kč',
            image: '/static/images/Pristrojova_pedikura.webp',
        },
        {
            title: 'Kart pedikúra',
            description: 'Nová vize péče o nohy založená na principech péče o pleť. Moderní přístup k pedikúře.',
            price: '1500 Kč',
            image: '/static/images/Kart.webp',
        },
        {
            title: 'Maderoterapie',
            description: 'Masáž přírodními dřevěnými válečky. Aktivuje lymfatický systém, pomáhá proti celulitidě a tvaruje postavu.',
            price: '1100 Kč',
            image: '/static/images/Maderoterapie.webp',
        },
        {
            title: 'Základní kosmetické ošetření',
            description: 'Kompletní péče o pleť obličeje, krku a dekoltu. Odlíčení, čištění, peeling, masáž, maska a krém.',
            price: '1290 Kč',
            image: '/static/images/Zakladni_osetreni.webp',
        },
        {
            title: 'Manikúra + Shellac',
            description: 'Profesionální manikúra s aplikací kvalitního Shellac laků pro dlouhotrvající efekt až 3 týdny.',
            price: '640 Kč',
            image: '/static/images/Shellac.webp',
        },
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
