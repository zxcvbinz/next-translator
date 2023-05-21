"use client";
import React, { createContext } from "react";

type configTR = { defaultLang: string; langs: string[] };

interface Props {
	children: React.ReactNode;
	translations: string;
	config: configTR;
}

export let TranslatorContext = createContext<{
	config: configTR;
	translations: string;
}>({
	config: { defaultLang: "it", langs: [] },
	translations: "",
});

export default function TranslationProvider({
	translations,
	children,
	config,
}: Props) {
	return (
		<TranslatorContext.Provider value={{ config, translations }}>
			{children}
		</TranslatorContext.Provider>
	);
}
