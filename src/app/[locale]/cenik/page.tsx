import {Metadata} from 'next';
import Link from 'next/link';
import pricing from '../../../data/pricing.json';
import {getIntl} from '../../../lib/intl';
import {generateMetadata as genMeta} from '../../../lib/metadata';

type Props = {
    params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {locale} = await params;
    const intl = await getIntl(locale);
    const title = intl.formatMessage({id: 'pricing.title'});
    const description = intl.formatMessage({id: 'pricing.description'});

    return genMeta({
        locale,
        title,
        description,
        path: '/cenik',
    });
}

const PricingPage = async ({params}: Props) => {
    const {locale} = await params;
    const intl = await getIntl(locale);
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
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{intl.formatMessage({id: 'pricing.title'})}</h1>
                        <p className="text-xl text-white">{intl.formatMessage({id: 'pricing.description'})}</p>
                    </div>
                </div>
            </section>

            {/* Price List */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {(pricing as any).categories.map((category: any) => (
                            <div key={category.id} className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h2>
                                {category.description && <p className="text-gray-600 mb-4">{category.description}</p>}
                                <div className="space-y-3">
                                    {category.services.map((service: any) => (
                                        <div
                                            key={service.id}
                                            className="flex justify-between items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <div>
                                                <span className="text-lg font-medium text-gray-900">{service.name}</span>
                                                {'description' in service && service.description ? (
                                                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                                                ) : null}
                                            </div>
                                            <span className="text-xl font-bold text-blue-600">
                                                {typeof service.price === 'number' ? `${service.price} Kč` : service.price}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Additional Info */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">{intl.formatMessage({id: 'pricing.importantInfo'})}</h2>
                            <div className="space-y-4 text-gray-600">
                                <p className="flex items-start">
                                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    {intl.formatMessage({id: 'pricing.info.finalPrices'})}
                                </p>
                                <p className="flex items-start">
                                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {intl.formatMessage({id: 'pricing.info.reservation'})}
                                </p>
                                <p className="flex items-start">
                                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {intl.formatMessage({id: 'pricing.info.cancellation'})}
                                </p>
                                <p className="flex items-start">
                                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    {intl.formatMessage({id: 'pricing.info.payment'})}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-blue-600">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">{intl.formatMessage({id: 'pricing.interested'})}</h2>
                        <p className="text-lg text-blue-100 mb-8">{intl.formatMessage({id: 'pricing.bookToday'})}</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={`${prefix}/kontakt` || '/kontakt'}
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
                            >
                                {intl.formatMessage({id: 'pricing.onlineReservation'})}
                            </Link>
                            <a
                                href="tel:+420606313452"
                                className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors"
                            >
                                {intl.formatMessage({id: 'common.callUs'})}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PricingPage;
