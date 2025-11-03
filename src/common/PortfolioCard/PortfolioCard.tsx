'use client';
import Image from 'next/image';
import React, {useState} from 'react';
import {useIntl} from 'react-intl';

type PortfolioItem = {
    id: string;
    title: string;
    description: string;
    image: string;
    alt: string;
    details?: {
        title: string;
        items: string[];
    }[];
};

type Props = {
    item: PortfolioItem;
};

const PortfolioCard: React.FC<Props> = ({item}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const intl = useIntl();

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 512px"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    priority={false}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <div className={`text-gray-600 mb-4 ${!isExpanded ? 'line-clamp-3' : ''}`}>{item.description}</div>

                {item.details && isExpanded && (
                    <div className="space-y-4 mb-4">
                        {item.details.map((section, index) => (
                            <div key={index}>
                                <h4 className="font-semibold text-gray-800 mb-2">{section.title}</h4>
                                <ul className="space-y-1">
                                    {section.items.map((item, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="text-blue-600 mr-2">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-auto">
                    <button onClick={toggleExpand} className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        {isExpanded ? intl.formatMessage({id: 'common.showLess'}) : intl.formatMessage({id: 'common.readMore'})}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PortfolioCard;
