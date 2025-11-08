import React from 'react';
import {useIntl} from 'react-intl';

const MapSection: React.FC = () => {
    const intl = useIntl();
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{intl.formatMessage({id: 'contact.whereToFind'})}</h2>
                    <p className="text-gray-600">{intl.formatMessage({id: 'contact.location'})}</p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="w-full" style={{height: '500px'}}>
                            <iframe
                                src="https://www.google.com/maps?q=48.6274,14.1697&output=embed&hl=cs"
                                width="100%"
                                height="100%"
                                style={{border: 0}}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Mapa s umístěním Salonu Fénix"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MapSection;
