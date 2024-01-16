'use server';

import { cookies } from 'next/headers';
import { ServerConfig } from '../type/types';

export const CreateServerProvider = (data: ServerConfig) => {
    return {
        getLocale: () => {
            const nextCookies = cookies();
            return nextCookies.get('lang')?.value || data.config.defaultLang;
        },
        useServerTranslator: (basePath = '') => {
            const t = (keyPath: string, ...args: any[]): string => {
                const completePath = basePath ? `${basePath}.${keyPath}` : keyPath;
                const keys = completePath.split('.');
                let current: any = data.translations;

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
    };
};
