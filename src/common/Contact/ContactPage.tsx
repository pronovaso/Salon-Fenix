'use client';
import type {ChangeEvent} from 'react';
import React, {useCallback, useState} from 'react';
import {z} from 'zod';

import {submitContactFormNodeMailer} from '@lib/contact-action';
import {useIntl} from 'react-intl';
import {recaptchaVerify} from '../../lib/recaptcha-action';
import {getServices} from '../../lib/services';
import {logger} from '../services/CommonService';
import MapSection from './MapSection';
import RecaptchaCheckbox from './RecaptchaCheckbox';

const ContactPage: React.FC = () => {
    const intl = useIntl();
    const services = getServices();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        service: '',
        date: '',
        message: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{success: boolean; message: string} | null>(null);
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const [isVerified, setIsVerified] = useState(false);

    // Zod schema for form validation
    const contactFormSchema = z.object({
        name: z.string().min(2, {message: 'Jméno musí obsahovat alespoň 2 znaky'}).max(100),
        phone: z.string().min(9, {message: 'Telefonní číslo je příliš krátké'}).max(20),
        email: z.string().email({message: 'Neplatný formát emailu'}).or(z.literal('')),
        service: z.string().min(1, {message: 'Vyberte prosím službu'}),
        date: z.string().min(1, {message: 'Vyberte prosím datum'}),
        message: z.string().max(1000, {message: 'Zpráva je příliš dlouhá'}).optional(),
        recaptchaToken: z.string().min(1, {message: 'Prosím ověřte, že nejste robot'}),
    });

    const contactInfo = {
        name: 'Vendula Staňková',
        phone: '+420 606 313 452',
        email: 'salon.fenix.lipno@gmail.com',
        address: 'Přední Výtoň 256',
        city: '382 73 Přední Výtoň',
        hours: 'Po - Pá: 10:00 - 17:00',
        additionalHours: 'a dle telefonických objednávek + víkendy',
        coordinates: {
            lat: 48.6178,
            lng: 14.1996,
        },
    };

    // Define DOM element types explicitly
    // DOM Element types
    type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    type HTMLFormElement = globalThis.HTMLFormElement;

    const handleInputChange = (e: ChangeEvent<FormElement>) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleRecaptchaExpired = useCallback(() => {
        setIsVerified(false);
        setRecaptchaToken(null);
    }, []);

    const handleCaptchaSubmission = useCallback(async (token: string | null) => {
        if (token) {
            setRecaptchaToken(token);
            await recaptchaVerify(token)
                .then(() => {
                    setIsVerified(true);
                })
                .catch((e) => {
                    setIsVerified(false);
                    setRecaptchaToken(null);
                    logger({data: JSON.stringify(e), name: 'Captcha submission error', logType: 'error'});
                });
        } else {
            setRecaptchaToken(null);
            setIsVerified(false);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        setSubmitStatus(null);

        try {
            const form = e.currentTarget;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Add reCAPTCHA token to data
            const dataWithRecaptcha = {
                ...data,
                recaptchaToken: recaptchaToken || '',
            };

            // Client-side validation
            const validatedData = contactFormSchema.parse(dataWithRecaptcha);
            // Format date to Czech format (DD.MM.YYYY) using Intl before sending
            const formatDateToCz = (isoDate: string) => {
                if (!isoDate) return isoDate;
                const date = new Date(`${isoDate}T00:00:00`);
                const parts = new Intl.DateTimeFormat('cs-CZ', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                }).formatToParts(date);
                const get = (type: string) => parts.find((p) => p.type === type)?.value || '';
                return `${get('day')}.${get('month')}.${get('year')}`;
            };

            const formattedData = {
                ...validatedData,
                date: formatDateToCz(validatedData.date),
            };
            setIsSubmitting(true);

            // Use server action instead of API route
            const result = await submitContactFormNodeMailer(formattedData);

            if (!result.success) {
                throw new Error(result.message || 'Nepodařilo se odeslat zprávu');
            }

            setSubmitStatus({
                success: true,
                message: 'Děkujeme za vaši zprávu! Brzy vás budeme kontaktovat.',
            });

            // Reset form
            form.reset();

            // Also update local state
            setFormData({
                name: '',
                phone: '',
                email: '',
                service: '',
                date: '',
                message: '',
            });

            // Reset reCAPTCHA
            setRecaptchaToken(null);
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Format Zod validation errors
                const formattedErrors: Record<string, string> = {};
                error.issues.forEach((issue) => {
                    const key = issue.path[0];
                    if (key) {
                        formattedErrors[String(key)] = issue.message;
                    }
                });
                setErrors(formattedErrors);
            } else {
                const errorMessage = error instanceof Error ? error.message : 'Neznámá chyba';
                setSubmitStatus({
                    success: false,
                    message: `Při odesílání formuláře došlo k chybě: ${errorMessage}. Zkuste to prosím znovu.`,
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Hero Section */}
            <section
                className="bg-linear-to-br from-blue-50 to-white py-16 bg-cover bg-center bg-no-repeat"
                style={{backgroundImage: 'url(/static/images/background.webp)'}}
            >
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{intl.formatMessage({id: 'contact.title'})}</h1>
                        <p className="text-xl text-white">{intl.formatMessage({id: 'contact.description'})}</p>
                    </div>
                </div>
            </section>

            {/* Contact Info & Form */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Information */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">{intl.formatMessage({id: 'contact.contactInfo'})}</h2>

                            <div className="space-y-6">
                                {/* Name */}
                                <div className="flex items-start">
                                    <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-900">{intl.formatMessage({id: 'common.name'})}</h3>
                                        <p className="text-blue-600 text-lg font-medium">{contactInfo.name}</p>
                                        <p className="text-gray-600 text-sm mt-1">{intl.formatMessage({id: 'common.name.description'})}</p>
                                    </div>
                                </div>
                                {/* Phone */}
                                <div className="flex items-start">
                                    <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-900">{intl.formatMessage({id: 'common.phone'})}</h3>
                                        <a href="tel:+420606313452" className="text-blue-600 hover:text-blue-800 text-lg font-medium">
                                            {contactInfo.phone}
                                        </a>
                                        <p className="text-gray-600 text-sm mt-1">{intl.formatMessage({id: 'contact.fastestWay'})}</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start">
                                    <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-900">{intl.formatMessage({id: 'common.email'})}</h3>
                                        <a href="mailto:salon.fenix.lipno@gmail.com" className="text-blue-600 hover:text-blue-800 text-lg font-medium">
                                            {contactInfo.email}
                                        </a>
                                        <p className="text-gray-600 text-sm mt-1">{intl.formatMessage({id: 'contact.questionsInfo'})}</p>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start">
                                    <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            ></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-900">{intl.formatMessage({id: 'common.address'})}</h3>
                                        <p className="text-gray-900 text-lg">{contactInfo.address}</p>
                                        <p className="text-gray-900 text-lg">{contactInfo.city}</p>
                                    </div>
                                </div>

                                {/* Opening Hours */}
                                <div className="flex items-start">
                                    <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-900">{intl.formatMessage({id: 'common.openingHours'})}</h3>
                                        <p className="text-gray-900 text-lg">{contactInfo.hours}</p>
                                        <p className="text-gray-600 text-sm mt-1">{intl.formatMessage({id: 'contact.weekendAppointments'})}</p>
                                    </div>
                                </div>

                                {/* Social media */}
                                <div className="flex items-start">
                                    <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 21l1.8-5A7.8 7.8 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-900">{intl.formatMessage({id: 'contact.socials'})}</h3>
                                        <div className="mt-2 flex flex-wrap gap-4">
                                            <a
                                                href="https://www.facebook.com/salonfenixlipno?mibextid=wwXIfr&rdid=JZkWOhhJCSX391iG&share_url=https://www.facebook.com/share/19pH4BTMXB/?mibextid%3DwwXIfr%26ref%3D1"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={intl.formatMessage({id: 'contact.facebook'})}
                                                className="text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                {intl.formatMessage({id: 'contact.facebook'})}
                                            </a>
                                            <a
                                                href="https://www.instagram.com/fenixlipno"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={intl.formatMessage({id: 'contact.instagram'})}
                                                className="text-pink-600 hover:text-pink-700 font-medium"
                                            >
                                                {intl.formatMessage({id: 'contact.instagram'})}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">{intl.formatMessage({id: 'contact.quickReservation'})}</h2>

                            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-lg" noValidate>
                                {submitStatus && (
                                    <div className={`p-4 rounded-md ${submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                                        {submitStatus.message}
                                    </div>
                                )}
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        {intl.formatMessage({id: 'form.name'})} {intl.formatMessage({id: 'form.required'})}
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                        placeholder={intl.formatMessage({id: 'form.namePlaceholder'})}
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        {intl.formatMessage({id: 'form.phone'})} {intl.formatMessage({id: 'form.required'})}
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                        placeholder={intl.formatMessage({id: 'form.phonePlaceholder'})}
                                    />
                                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        {intl.formatMessage({id: 'form.email'})}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                        placeholder={intl.formatMessage({id: 'form.emailPlaceholder'})}
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>

                                {/* Service */}
                                <div>
                                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                                        {intl.formatMessage({id: 'form.service'})} {intl.formatMessage({id: 'form.required'})}
                                    </label>
                                    <select
                                        id="service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border ${errors.service ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                    >
                                        <option value="">{intl.formatMessage({id: 'form.selectService'})}</option>
                                        {services.map((service) => {
                                            // Speciální mapování pro klasickou masáž
                                            let titleKey = `servicesList.${service.id}`;
                                            if (service.id === 'klasickaMasaz') {
                                                titleKey = 'sluzby.masaz.klasicka';
                                            }
                                            return (
                                                <option key={service.id} value={service.id}>
                                                    {intl.formatMessage({id: titleKey})}
                                                </option>
                                            );
                                        })}
                                        <option value="other">{intl.formatMessage({id: 'servicesList.otherService'})}</option>
                                    </select>
                                    {errors.service && <p className="mt-1 text-sm text-red-600">{errors.service}</p>}
                                </div>

                                {/* Date */}
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                                        {intl.formatMessage({id: 'form.preferredDate'})} {intl.formatMessage({id: 'form.required'})}
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                    />
                                    {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        {intl.formatMessage({id: 'form.message'})}
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                        placeholder={intl.formatMessage({id: 'form.messagePlaceholder'})}
                                    ></textarea>
                                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                                </div>

                                {/* reCAPTCHA */}
                                <div>
                                    <RecaptchaCheckbox onChange={handleCaptchaSubmission} onExpired={handleRecaptchaExpired} />
                                    {errors.recaptchaToken && <p className="mt-1 text-sm text-red-600">{errors.recaptchaToken}</p>}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !isVerified}
                                    className={`w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors ${isSubmitting || !isVerified ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? 'Odesílám...' : intl.formatMessage({id: 'form.submit'})}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <MapSection />
        </>
    );
};

export default ContactPage;
