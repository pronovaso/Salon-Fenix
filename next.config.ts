import { NextConfig } from "next";


module.exports = async () => {
    /** @type {import("next").NextConfig} */
    const nextConfig: NextConfig = {
        reactCompiler: true,
        poweredByHeader: false,
        images: {
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: 'images.unsplash.com',
                },
                {
                    protocol: 'https',
                    hostname: 'placehold.co',
                },
            ],
        },
        headers: async () => {
            // Build headers dynamically so we can differ between dev and prod
            const isProd = process.env.NODE_ENV === 'production';
            


            const headers = [
                {
                    key: 'Referrer-Policy',
                    value: 'strict-origin-when-cross-origin'
                },
                {
                    key: 'X-Frame-Options',
                    value: 'SAMEORIGIN'
                },
                {
                    key: 'X-XSS-Protection',
                    value: '1; mode=block'
                },
                {
                    key: 'X-Content-Type-Options',
                    value: 'nosniff'
                },
                {
                    key: 'Permissions-Policy',
                    value: 'gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()'
                },
                
            ];

            // Only send HSTS in production (don't set on localhost/dev over plain HTTP)
            if (isProd) {
                headers.push({
                    key: 'Strict-Transport-Security',
                    value: 'max-age=31536000; includeSubDomains; preload'
                });
            }

            return [
                {
                    // Apply these headers to all routes in your application.
                    source: '/(.*)',
                    headers,
                },
            ];
        },
        rewrites: async () => {
            return [
                {
                    source: '/:locale(en|cs|de)/manifest.json',
                    destination: '/manifest.json',
                },
            ];
        },
        productionBrowserSourceMaps: true
    }

    return nextConfig;
};

