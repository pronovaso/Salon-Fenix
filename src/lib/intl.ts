import {createIntl} from '@formatjs/intl';
import type {Locale} from '../../i18n-config';

export const getMessages = async (locale: Locale): Promise<Record<string, any>> => {
    switch (locale) {
        case 'cs':
            return (await import('../../lang/cs.json')).default;
        case 'en':
            return (await import('../../lang/en.json')).default;
        case 'de':
            return (await import('../../lang/de.json')).default;
        default:
            return (await import('../../lang/cs.json')).default;
    }
};

export const getIntl = async (locale: Locale) => {
    const messages = await getMessages(locale);
    return createIntl({
        locale: locale,
        messages: messages,
    });
};

export const getDirection = (locale: Locale) => {
    switch (locale) {
        case 'en':
        case 'cs':
        case 'de':
            return 'ltr';
    }
};
