import {getIntl} from '@lib/intl';
import Link from 'next/link';

type FooterProps = {
    locale: string;
    prefix: string;
};

const Footer = async ({locale, prefix}: FooterProps) => {
    const intl = await getIntl(locale || 'cs');
    return (
        <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                {/* Main Content */}
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Contact Info */}
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">{intl.formatMessage({id: 'contact.contactInfo'})}</h3>
                            <div className="space-y-2 text-gray-600">
                                <p>{'Vendula Staňková'}</p>
                                <p>{intl.formatMessage({id: 'common.name.description'})}</p>
                                <p>
                                    <a href="tel:+420606313452" className="text-blue-600 hover:text-blue-800 underline">
                                        {'+420 606 313 452'}
                                    </a>
                                </p>
                                <p>{intl.formatMessage({id: 'contact.hoursRange'})}</p>
                                <p className="text-sm">{intl.formatMessage({id: 'contact.weekendAppointments'})}</p>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">{intl.formatMessage({id: 'common.address'})}</h3>
                            <div className="text-gray-600">
                                <p>{'Přední Výtoň 256'}</p>
                                <p>{'382 73 Přední Výtoň'}</p>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">{intl.formatMessage({id: 'footer.quickLinks'})}</h3>
                            <div className="space-y-2">
                                {[
                                    {name: intl.formatMessage({id: 'navigation.services'}), href: `${prefix}/sluzby` || '/sluzby'},
                                    {name: intl.formatMessage({id: 'navigation.pricing'}), href: `${prefix}/cenik` || '/cenik'},
                                    {name: intl.formatMessage({id: 'navigation.contact'}), href: `${prefix}/kontakt` || '/kontakt'},
                                    {name: intl.formatMessage({id: 'navigation.gallery'}), href: `${prefix}/fotogalerie` || '/fotogalerie'},
                                ].map((link) => (
                                    <Link key={link.href} href={link.href} className="block text-gray-600 hover:text-blue-600 transition-colors">
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar - Full width separator */}
            <div className="w-screen border-t border-gray-200 relative left-1/2 -ml-[50vw]">
                <div className="container mx-auto px-4 max-w-5xl py-6 relative">
                    <div className="max-w-5xl mx-auto text-center">
                        <p className="text-gray-500 text-sm">{intl.formatMessage({id: 'footer.copyright'}, {year: new Date().getFullYear()})}</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
