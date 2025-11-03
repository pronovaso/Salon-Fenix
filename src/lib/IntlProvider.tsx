'use client';
import {ScriptProps} from 'next/script';
import {RawIntlProvider, createIntl, createIntlCache} from 'react-intl';

const intlCache = createIntlCache();

type IntlProviderProps = ScriptProps & {
    messages: Record<string, any>;
    locale: string;
};

export const IntlProvider = ({children, messages, locale}: IntlProviderProps) => {
    const intl = createIntl(
        {
            locale: locale,
            // Cast to any to allow non-string values (e.g., lists) in messages object
            messages: messages,
            formats: {
                number: {
                    CS: {
                        style: 'currency',
                        currency: 'CZK',
                    },
                    EN: {
                        style: 'currency',
                        currency: 'US',
                    },
                },
            },
        },
        intlCache,
    );

    return <RawIntlProvider value={intl}>{children}</RawIntlProvider>;
};
