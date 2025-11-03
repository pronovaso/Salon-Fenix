import {getIntl} from '@lib/intl';
import Image from 'next/image';
import React from 'react';

type Props = {
    title: string;
    description: string;
    image?: string;
    price?: string;
    locale?: string;
};

const ServiceCard: React.FC<Props> = async ({title, description, image = 'https://placehold.co/400x300/e5e7eb/6b7280?text=Service', price, locale = 'cs'}) => {
    const intl = await getIntl(locale);
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>

                {price && (
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">{price}</span>
                        <a
                            href={`${locale === 'cs' ? '' : `/${locale}`}/kontakt`}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-md text-white! bg-blue-700! hover:bg-blue-800! transition-colors shadow-md relative z-10"
                        >
                            {intl.formatMessage({id: 'common.bookNow'})}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceCard;
