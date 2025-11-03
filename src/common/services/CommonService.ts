/**
 * The `logger` function logs data with a specified name and log type, with an option to hide logs in
 * production or pre-production environments.
 * @param  - The `logger` function takes in an object with the following parameters:
 * @returns If the `mode` is set to 'hide' and `isProdPreprod` is true, nothing will be logged and the
 * function will return undefined. Otherwise, the function will log the message using
 * `console[logType]` and return undefined.
 */
export const logger = <T extends string, U extends Record<string, unknown> | unknown>({
    name,
    data,
    logType = 'log',
}: {
    name: T;
    data: U;
    logType?: 'error' | 'log';
    mode?: 'development' | 'production' | 'devAndProd';
}) => {
    // eslint-disable-next-line no-console
    console[logType](`%c 🚨 -> ${name}: `, 'color: #e13019', data);
    return;
};
// Cache pro env hodnoty
const envCache = new Map<
    string,
    {
        data: any;
        timestamp: number;
        ttl: number;
    }
>();

// Cache pro probíhající requesty
const pendingRequests = new Map<string, Promise<any>>();

export const getEnvValue = async <T extends string | readonly string[]>(
    envKey: T,
    options?: {cacheTTL?: number},
): Promise<undefined | (T extends readonly string[] ? {[K in T[number]]: string | undefined} : string | undefined)> => {
    try {
        const isEnvArray = Array.isArray(envKey);
        const cacheKey = isEnvArray ? envKey.join(',') : (envKey as string);
        const now = Date.now();

        // Kontrola cache
        const cached = envCache.get(cacheKey);
        if (cached && now - cached.timestamp < (options?.cacheTTL ?? 5 * 60 * 1000)) {
            return cached.data;
        }

        // Kontrola, zda již neprobíhá stejný request
        const pendingRequest = pendingRequests.get(cacheKey);
        if (pendingRequest) {
            return pendingRequest;
        }

        // Vytvoření nového requestu
        const promise = (async () => {
            try {
                // Na serveru použijeme process.env přímo, na klientovi fetch přes API
                if (typeof window === 'undefined') {
                    // Server-side: použijeme process.env přímo
                    const result = isEnvArray
                        ? (envKey as string[]).reduce(
                              (acc, key) => {
                                  acc[key] = process.env[key];
                                  return acc;
                              },
                              {} as Record<string, string | undefined>,
                          )
                        : process.env[envKey as string];

                    // Uložení do cache
                    envCache.set(cacheKey, {
                        data: result,
                        timestamp: now,
                        ttl: options?.cacheTTL ?? 5 * 60 * 1000,
                    });

                    return result;
                }

                // Client-side: použijeme fetch přes API
                const origin = window.location.origin;
                const queryParams = isEnvArray
                    ? (envKey as string[]).map((key) => `env=${encodeURIComponent(key)}`).join('&')
                    : `env=${encodeURIComponent(envKey as string)}`;

                const response = await fetch(`${origin}/api/env?${queryParams}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const result = isEnvArray ? (data.env as T) : data.env[envKey as keyof T];

                // Uložení do cache
                envCache.set(cacheKey, {
                    data: result,
                    timestamp: now,
                    ttl: options?.cacheTTL ?? 5 * 60 * 1000,
                });

                return result;
            } finally {
                // Vyčištění pending requestu po dokončení
                pendingRequests.delete(cacheKey);
            }
        })();

        // Uložení probíhajícího requestu do cache
        pendingRequests.set(cacheKey, promise);

        return promise;
    } catch (e) {
        logger({name: 'getEnvValue', data: e, logType: 'error'});
        return undefined;
    }
};

export const getEnvValueArray = async <T extends readonly string[]>(envKeys: [...T]): Promise<{[K in T[number]]: string | undefined}> => {
    const result: {[K in T[number]]: string | undefined} = {} as {[K in T[number]]: string | undefined};
    for (const envKey of envKeys) {
        result[envKey] = await getEnvValue(envKey);
    }
    return result;
};
