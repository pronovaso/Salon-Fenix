'use client';
import {ScriptProps} from 'next/script';
import {RawIntlProvider, createIntl, createIntlCache} from 'react-intl';
import Czech from '../../lang/cs.json';

const intlCache = createIntlCache();

export const IntlProvider = ({children}: ScriptProps) => {
    return (
        <RawIntlProvider
            value={createIntl(
                {
                    locale: 'cs',
                    // Cast to any to allow non-string values (e.g., lists) in messages object
                    messages: Czech,
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
            )}
        >
            {children}
        </RawIntlProvider>
    );
};
