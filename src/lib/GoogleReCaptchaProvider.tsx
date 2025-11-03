'use client';
import {GoogleReCaptchaProvider as _GoogleReCaptchaProvider} from '@google-recaptcha/react';
import type {ComponentProps} from 'react';
export type ReCaptchaProviderProps = ComponentProps<typeof _GoogleReCaptchaProvider>;
export const GoogleReCaptchaProvider = (props: ReCaptchaProviderProps) => <_GoogleReCaptchaProvider {...props} />;
