'use server';

export const recaptchaVerify = async (token: string) => {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
        throw new Error('ReCAPTCHA secret key is not set');
    }

    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const responseBody = await response.json();

    if (responseBody.success) {
        return responseBody;
    } else {
        throw new Error('Failed to verify ReCAPTCHA');
    }
};
