'use client';
import {ScriptProps} from 'next/script';
import {useEffect, useState} from 'react';
import {RawIntlProvider, createIntl, createIntlCache} from 'react-intl';

const intlCache = createIntlCache();

// Dynamic import for JSON files to work in production builds
const getCzechMessages = async () => {
    const module = await import('../../lang/cs.json');
    return module.default;
};

export const IntlProvider = ({children}: ScriptProps) => {
    const [messages, setMessages] = useState<Record<string, any> | null>(null);

    useEffect(() => {
        getCzechMessages().then(setMessages);
    }, []);

    if (!messages) {
        // Return children without IntlProvider while loading
        return <>{children}</>;
    }

    return (
        <RawIntlProvider
            value={createIntl(
                {
                    locale: 'cs',
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
            )}
        >
            {children}
        </RawIntlProvider>
    );
};
