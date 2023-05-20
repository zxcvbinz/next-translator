"use client";
import React from "react";

export let TranslatorContext = React.createContext("");

interface Props {
	children: React.ReactNode;
	value: string;
}

export default function TranslationProvider({ value, children }: Props) {
	return (
		<TranslatorContext.Provider value={value}>
			{children}
		</TranslatorContext.Provider>
	);
}
