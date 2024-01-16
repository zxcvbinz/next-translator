import { getCookie, setCookie } from 'cookies-next';
import { useContext } from 'react';
import { TranslatorContext } from './provider/TranslationProvider';
import { TranslationInput } from '../type/types';

export const getLocale = () => {
    const { data } = useContext(TranslatorContext);

    let locale = data.config.defaultLang;
    if (typeof window !== 'undefined') {
        locale = getCookie('lang')?.toString() || data.config.defaultLang;
    }
    return locale;
};

export const setLocale = (lang: string, autoReload = true) => {
    if (typeof window !== 'undefined') {
        setCookie('lang', lang);
        if (autoReload) window.location.reload();
    }
};

export function useTranslator(basePath = '') {
    const { data } = useContext(TranslatorContext);

    const t = (keyPath: string, ...args: any[]): string => {
        const completePath = basePath ? `${basePath}.${keyPath}` : keyPath;
        const keys = completePath.split('.');
        let current: TranslationInput | string = data.translations;

        for (let key of keys) {
            if (typeof current === 'object') {
                current = current[key];
            } else {
                break;
            }
        }

        if (typeof current === 'string') {
            let i = 0;
            return current.replace(/%s/g, () => {
                return args[i++] || '';
            });
        }

        return '';
    };

    return { t };
}
