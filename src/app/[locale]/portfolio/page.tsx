import PortfolioCard from '@common/PortfolioCard/PortfolioCard';
import {Metadata} from 'next';
import {getIntl} from '../../../lib/intl';
import {generateMetadata as genMeta} from '../../../lib/metadata';

type Props = {
    params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {locale} = await params;
    const intl = await getIntl(locale);
    const title = intl.formatMessage({id: 'portfolio.title'});
    const description = `${intl.formatMessage({id: 'portfolio.title'})} - ${intl.formatMessage({id: 'services.description'})}`;

    return genMeta({
        locale,
        title,
        description,
        path: '/portfolio',
    });
}

const PortfolioPage = async ({params}: Props) => {
    const {locale} = await params;
    const intl = await getIntl(locale);

    const portfolioItems = [
        {
            id: 'machine-pedicure',
            title: intl.formatMessage({id: 'portfolio.machinePedicure.title'}),
            description: intl.formatMessage({id: 'portfolio.machinePedicure.description1'}),
            image: '/static/images/manikura_lipno-13-5.jpg',
            alt: intl.formatMessage({id: 'portfolio.machinePedicure.title'}),
            details: [
                {
                    title: intl.formatMessage({id: 'portfolio.machinePedicure.treatment.title'}),
                    items: [
                        intl.formatMessage({id: 'portfolio.machinePedicure.treatment.point1'}),
                        intl.formatMessage({id: 'portfolio.machinePedicure.treatment.point2'}),
                        intl.formatMessage({id: 'portfolio.machinePedicure.treatment.point3'}),
                        intl.formatMessage({id: 'portfolio.machinePedicure.treatment.point4'}),
                        intl.formatMessage({id: 'portfolio.machinePedicure.treatment.point5'}),
                    ],
                },
                {
                    title: intl.formatMessage({id: 'portfolio.machinePedicure.benefits.title'}),
                    items: [
                        intl.formatMessage({id: 'portfolio.machinePedicure.benefits.point1'}),
                        intl.formatMessage({id: 'portfolio.machinePedicure.benefits.point2'}),
                        intl.formatMessage({id: 'portfolio.machinePedicure.benefits.point3'}),
                        intl.formatMessage({id: 'portfolio.machinePedicure.benefits.point4'}),
                        intl.formatMessage({id: 'portfolio.machinePedicure.benefits.point5'}),
                    ],
                },
                {
                    title: intl.formatMessage({id: 'portfolio.machinePedicure.recommendedFor.title'}),
                    items: [
                        intl.formatMessage({id: 'portfolio.machinePedicure.recommendedFor.point1'}),
                        intl.formatMessage({id: 'portfolio.machinePedicure.recommendedFor.point2'}),
                        intl.formatMessage({id: 'portfolio.machinePedicure.recommendedFor.point3'}),
                        intl.formatMessage({id: 'portfolio.machinePedicure.recommendedFor.point4'}),
                        intl.formatMessage({id: 'portfolio.machinePedicure.recommendedFor.point5'}),
                    ],
                },
            ],
        },
        {
            id: 'manicure',
            title: intl.formatMessage({id: 'portfolio.manicure.title'}),
            description: intl.formatMessage({id: 'portfolio.manicure.pShine.description1'}),
            image: '/static/images/manikura_lipno-4.jpg',
            alt: intl.formatMessage({id: 'portfolio.manicure.title'}),
            details: [
                {
                    title: intl.formatMessage({id: 'portfolio.manicure.pShine.title'}),
                    items: [
                        intl.formatMessage({id: 'portfolio.manicure.pShine.description1'}),
                        intl.formatMessage({id: 'portfolio.manicure.pShine.description2'}),
                    ],
                },
                {
                    title: intl.formatMessage({id: 'portfolio.manicure.afterPShine.title'}),
                    items: [
                        intl.formatMessage({id: 'portfolio.manicure.afterPShine.description1'}),
                        intl.formatMessage({id: 'portfolio.manicure.afterPShine.description2'}),
                    ],
                },
            ],
        },
        {
            id: 'luxury-cosmetics',
            title: intl.formatMessage({id: 'portfolio.luxuryCosmetics.title'}),
            description: intl.formatMessage({id: 'portfolio.luxuryCosmetics.description'}),
            image: '/static/images/manikura_lipno-15.jpg',
            alt: intl.formatMessage({id: 'portfolio.luxuryCosmetics.title'}),
            details: [
                {
                    title: intl.formatMessage({id: 'portfolio.luxuryCosmetics.weOffer'}),
                    items: [
                        intl.formatMessage({id: 'portfolio.luxuryCosmetics.offer1'}),
                        intl.formatMessage({id: 'portfolio.luxuryCosmetics.offer2'}),
                        intl.formatMessage({id: 'portfolio.luxuryCosmetics.offer3'}),
                        intl.formatMessage({id: 'portfolio.luxuryCosmetics.offer4'}),
                    ],
                },
                {
                    title: intl.formatMessage({id: 'portfolio.luxuryCosmetics.ultrasonicSpatula.title'}),
                    items: [intl.formatMessage({id: 'portfolio.luxuryCosmetics.ultrasonicSpatula.description'})],
                },
                {
                    title: intl.formatMessage({id: 'portfolio.luxuryCosmetics.chemicalPeel.title'}),
                    items: [intl.formatMessage({id: 'portfolio.luxuryCosmetics.chemicalPeel.description'})],
                },
                {
                    title: intl.formatMessage({id: 'portfolio.luxuryCosmetics.galvanicIron.title'}),
                    items: [intl.formatMessage({id: 'portfolio.luxuryCosmetics.galvanicIron.description'})],
                },
                {
                    title: intl.formatMessage({id: 'portfolio.luxuryCosmetics.biostimulatingLaser.title'}),
                    items: [intl.formatMessage({id: 'portfolio.luxuryCosmetics.biostimulatingLaser.description'})],
                },
                {
                    title: intl.formatMessage({id: 'portfolio.luxuryCosmetics.suitableFor.title'}),
                    items: [intl.formatMessage({id: 'portfolio.luxuryCosmetics.suitableFor.conditions'})],
                },
            ],
        },
        {
            id: 'massage',
            title: intl.formatMessage({id: 'portfolio.massage.title'}),
            description: intl.formatMessage({id: 'portfolio.massage.relaxing.description'}),
            image: '/static/images/manikura_lipno-17.jpg',
            alt: intl.formatMessage({id: 'portfolio.massage.title'}),
            details: [
                {
                    title: intl.formatMessage({id: 'portfolio.massage.relaxing.title'}),
                    items: [
                        intl.formatMessage({id: 'portfolio.massage.relaxing.description'}),
                        intl.formatMessage({id: 'portfolio.massage.relaxing.recommendation'}),
                    ],
                },
                {
                    title: intl.formatMessage({id: 'portfolio.massage.combinedCupping.title'}),
                    items: [
                        intl.formatMessage({id: 'portfolio.massage.combinedCupping.description1'}),
                        intl.formatMessage({id: 'portfolio.massage.combinedCupping.description2'}),
                        intl.formatMessage({id: 'portfolio.massage.combinedCupping.description3'}),
                    ],
                },
                {
                    title: intl.formatMessage({id: 'portfolio.massage.manualLymphaticDrainage.title'}),
                    items: [intl.formatMessage({id: 'portfolio.massage.manualLymphaticDrainage.description'})],
                },
                {
                    title: intl.formatMessage({id: 'portfolio.massage.contraindications.title'}),
                    items: [intl.formatMessage({id: 'portfolio.massage.contraindications.description'})],
                },
            ],
        },
    ];

    return (
        <>
            <section
                className="bg-linear-to-br from-blue-50 to-white py-22 bg-cover bg-center bg-no-repeat"
                style={{backgroundImage: 'url(/static/images/background.webp)'}}
            >
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-white mb-16 text-center">{intl.formatMessage({id: 'portfolio.title'})}</h1>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
                        {portfolioItems.map((item) => (
                            <PortfolioCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default PortfolioPage;
