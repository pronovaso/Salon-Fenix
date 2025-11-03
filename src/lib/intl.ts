import {createIntl} from '@formatjs/intl';
import type {Locale} from '../../i18n-config';

export const getIntl = async (locale: Locale) => {
    return createIntl({
        locale: locale,
        messages: (await import(`../../lang/${locale}.json`)).default,
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
