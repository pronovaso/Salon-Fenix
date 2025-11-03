'use server';

import {EmailParams, MailerSend, Recipient, Sender} from 'mailersend';

const mailerSend = new MailerSend({apiKey: process.env.MAILERSEND_API_KEY || ''});

export type ContactFormData = {
    name: string;
    phone: string;
    email: string;
    service: string;
    date: string;
    message?: string;
    recaptchaToken: string;
};

export type ContactActionResult = {
    success: boolean;
    message?: string;
};

export const submitContactForm = async (formData: ContactFormData): Promise<ContactActionResult> => {
    try {
        const sentFrom = new Sender(process.env.MAIL_FROM ?? '', 'Salon Fénix');
        const recipients = [new Recipient(formData.email, 'Your Client')];

        const html = `
      <h2>Nová objednávka</h2>
      <p><strong>Jméno:</strong> ${formData.name}</p>
      <p><strong>Telefon:</strong> ${formData.phone}</p>
      <p><strong>Email:</strong> ${formData.email || 'neuveden'}</p>
      <p><strong>Služba:</strong> ${formData.service}</p>
      <p><strong>Datum:</strong> ${formData.date}</p>
      ${formData.message ? `<p><strong>Zpráva:</strong><br>${formData.message}</p>` : ''}
    `;

        const emailParams = new EmailParams().setFrom(sentFrom).setTo(recipients).setSubject(`Rezervace služby ${formData.service}`).setHtml(html);

        const response = await mailerSend.email.send(emailParams);

        if (!response.statusCode || response.statusCode >= 400) {
            const errorData = await response.body;
            throw new Error(errorData || 'Nepodařilo se odeslat zprávu');
        }

        return {success: true};
    } catch (error: any) {
        console.error('Contact form error:', error);
        return {
            success: false,
            message: error?.message || 'Došlo k chybě při zpracování požadavku',
        };
    }
};
