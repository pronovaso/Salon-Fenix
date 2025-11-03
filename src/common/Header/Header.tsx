'use client';

import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState} from 'react';

export type NavItem = {
    name: string;
    href: string;
};

export type HeaderProps = {
    locale: string;
    navigation: NavItem[];
    brandName?: string;
    openMenuLabel?: string;
    langLabels?: {cs: string; en: string; de: string};
};

const Header = ({
    locale,
    navigation,
    brandName = 'Salon Fénix',
    openMenuLabel = 'Open main menu',
    langLabels = {cs: 'CZ', en: 'EN', de: 'DE'},
}: HeaderProps) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-3 text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                            <Image
                                src="/static/images/logo.webp"
                                alt="Salon Fénix logo"
                                width={40}
                                height={40}
                                className="object-contain"
                                style={{height: 'auto', width: 'auto'}}
                            />
                            {brandName}
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => {
                            const isActive =
                                pathname === item.href || pathname === item.href + '/' || (item.href !== '/' && pathname.startsWith(item.href + '/'));
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                        isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Language Switcher */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Link
                                href="/"
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                    locale === 'cs' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            >
                                {langLabels.cs}
                            </Link>
                            <Link
                                href="/en"
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                    locale === 'en' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            >
                                {langLabels.en}
                            </Link>
                            <Link
                                href="/de"
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                    locale === 'de' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            >
                                {langLabels.de}
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        aria-controls="mobile-menu"
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen((v) => !v)}
                    >
                        <span className="sr-only">{openMenuLabel}</span>
                        {/* Hamburger icon */}
                        <svg
                            className={`${mobileOpen ? 'hidden' : 'block'} h-6 w-6`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                        {/* Close icon */}
                        <svg
                            className={`${mobileOpen ? 'block' : 'hidden'} h-6 w-6`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden ${mobileOpen ? '' : 'hidden'}`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || pathname === item.href + '/' || (item.href !== '/' && pathname.startsWith(item.href + '/'));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </header>
    );
};

export default Header;
