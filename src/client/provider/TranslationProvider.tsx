"use client";

import React, { createContext, type ReactNode } from "react";
import type { ServerConfig } from "../../type/types";

interface Props {
	children: ReactNode;
	data: ServerConfig;
}

export const TranslatorContext = createContext<{
	data: ServerConfig;
}>({
	data: {
		config: {
			defaultLang: "",
			langs: [],
		},
		translations: "",
	},
});

export function TranslationProvider({ data, children }: Props) {
	return (
		<TranslatorContext.Provider value={{ data }}>
			{children}
		</TranslatorContext.Provider>
	);
}
