import {Metadata} from 'next';
import ContactPage from '../../../common/Contact/ContactPage';
import {getIntl} from '../../../lib/intl';
import {generateMetadata as genMeta} from '../../../lib/metadata';

type Props = {
    params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {locale} = await params;
    const intl = await getIntl(locale);
    const title = intl.formatMessage({id: 'contact.title'});
    const description = intl.formatMessage({id: 'contact.description'});

    return genMeta({
        locale,
        title,
        description,
        path: '/kontakt',
    });
}

const Page = async () => {
    return <ContactPage />;
};

export default Page;
