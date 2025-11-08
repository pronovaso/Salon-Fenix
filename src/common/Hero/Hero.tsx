import {getIntl} from '@lib/intl';
import React from 'react';

type Props = {locale: string};

const Hero: React.FC<Props> = async ({locale}) => {
    const intl = await getIntl(locale || 'cs');
    return (
        <section className="relative bg-cover bg-center bg-no-repeat py-20 lg:py-32" style={{backgroundImage: 'url(/static/images/background.webp)'}}>
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50" />
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{intl.formatMessage({id: 'hero.title'})}</h1>
                    <h2 className="text-2xl md:text-3xl font-light text-gray-200 mb-8">{intl.formatMessage({id: 'hero.subtitle'})}</h2>
                    <p className="text-lg text-gray-200 mb-12 max-w-2xl mx-auto">{intl.formatMessage({id: 'hero.description'})}</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href={`${locale === 'cs' ? '' : `/${locale}`}/kontakt`}
                            className="inline-flex items-center justify-center px-8 py-3 border-2 border-blue-700 text-base font-bold rounded-md text-white! bg-blue-700! hover:bg-blue-800! transition-colors shadow-md"
                        >
                            {intl.formatMessage({id: 'hero.bookAppointment'})}
                        </a>
                        <a
                            href={`${locale === 'cs' ? '' : `/${locale}`}/sluzby`}
                            className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                        >
                            {intl.formatMessage({id: 'hero.ourServices'})}
                        </a>
                    </div>
                </div>
            </div>

            {/* Gradient overlay at the bottom */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
        </section>
    );
};

export default Hero;
