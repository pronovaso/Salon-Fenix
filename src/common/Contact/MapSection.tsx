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
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2640.234391423885!2d14.22941131566082!3d48.63417997925284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47700d2e8a9d9e1f%3A0x5a2d4b9b8c0b6e0a!2sLipno%20nad%20Vltavou%2090%2C%20382%2078%20Lipno%20nad%20Vltavou!5e0!3m2!1scs!2scz!4v1645637890123!5m2!1scs!2scz"
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
