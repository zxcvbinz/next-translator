'use client';

import React, { createContext } from 'react';
import { ServerConfig } from '../../type/types';

interface Props {
    children: React.ReactNode;
    data: ServerConfig;
}

export let TranslatorContext = createContext<{
    data: ServerConfig;
}>({
    data: {
        config: {
            defaultLang: '',
            langs: []
        },
        translations: ''
    }
});

export function TranslationProvider({ data, children }: Props) {
    return <TranslatorContext.Provider value={{ data }}>{children}</TranslatorContext.Provider>;
}
