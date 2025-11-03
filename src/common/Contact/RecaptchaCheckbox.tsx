'use client';
import {GoogleReCaptchaCheckbox} from '@google-recaptcha/react';
import {memo} from 'react';

interface RecaptchaCheckboxProps {
    onChange: (token: string | null) => void;
    onExpired: () => void;
    action?: string;
}

// Memoized reCAPTCHA component to prevent re-renders on form input changes
const RecaptchaCheckbox = memo<RecaptchaCheckboxProps>(({onChange, onExpired, action = 'rezervace'}) => {
    return <GoogleReCaptchaCheckbox action={action} onChange={onChange} onExpired={onExpired} />;
});

RecaptchaCheckbox.displayName = 'RecaptchaCheckbox';

export default RecaptchaCheckbox;

