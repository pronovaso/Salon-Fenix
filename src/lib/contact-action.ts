'use server';

import nodemailer from 'nodemailer';

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

// export const submitContactForm = async (formData: ContactFormData): Promise<ContactActionResult> => {
//     try {
//         const sentFrom = new Sender(process.env.MAIL_FROM ?? '', 'Salon Fénix');
//         const recipients = [new Recipient(formData.email, 'Your Client')];

//         const html = `
//       <h2>Nová objednávka</h2>
//       <p><strong>Jméno:</strong> ${formData.name}</p>
//       <p><strong>Telefon:</strong> ${formData.phone}</p>
//       <p><strong>Email:</strong> ${formData.email || 'neuveden'}</p>
//       <p><strong>Služba:</strong> ${formData.service}</p>
//       <p><strong>Datum:</strong> ${formData.date}</p>
//       ${formData.message ? `<p><strong>Zpráva:</strong><br>${formData.message}</p>` : ''}
//     `;

//         const emailParams = new EmailParams().setFrom(sentFrom).setTo(recipients).setSubject(`Rezervace služby ${formData.service}`).setHtml(html);

//         const response = await mailerSend.email.send(emailParams);

//         if (!response.statusCode || response.statusCode >= 400) {
//             const errorData = await response.body;
//             throw new Error(errorData || 'Nepodařilo se odeslat zprávu');
//         }

//         return {success: true};
//     } catch (error: unknown) {
//         return {
//             success: false,
//             message: error instanceof Error ? error.message : 'Došlo k chybě při zpracování požadavku',
//         };
//     }
// };
/**
 * Submit contact form using NodeMailer via gmail
 * @param formData - Contact form data
 * @returns Contact action result
 */
export const submitContactFormNodeMailer = async (formData: ContactFormData): Promise<ContactActionResult> => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: true,
            auth: {
                user: process.env.GMAIL_USERNAME ?? '',
                pass: process.env.GMAIL_PASSWORD ?? '',
            },
        });
        const mailOptions = {
            from: process.env.GMAIL_USERNAME ?? '',
            cc: process.env.GMAIL_USERNAME ?? '',
            to: formData.email,
            subject: `Rezervace služby ${formData.service}`,
            html: `
                <h2>Nová objednávka</h2>
                <p><strong>Jméno:</strong> ${formData.name}</p>
                <p><strong>Telefon:</strong> ${formData.phone}</p>
                <p><strong>Email:</strong> ${formData.email || 'neuveden'}</p>
                <p><strong>Služba:</strong> ${formData.service}</p>
                <p><strong>Datum:</strong> ${formData.date}</p>
                ${formData.message ? `<p><strong>Zpráva:</strong><br>${formData.message}</p>` : ''}

                Upozornění: Toto je automatická zpráva, prosím neodpovídejte na ni.
            `,
        };
        const info = await transporter.sendMail(mailOptions);
        return {
            success: info.accepted.length > 0,
            message: info.accepted.length > 0 ? 'Email sent successfully' : 'Failed to send email',
        };
    } catch (error: unknown) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Došlo k chybě při odesílání emailu',
        };
    }
};
