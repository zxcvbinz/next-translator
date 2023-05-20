import { getCookie, setCookie } from "cookies-next";
import { useContext } from "react";
import { TranslatorContext } from "@/translator/provider/TranslationProvider";
import { config } from "@/translator.config";

interface TranslationInput {
	[key: string]: string | TranslationInput;
}

export const getLocale = () => {
	let locale = config.defaultLang;
	if (typeof window !== "undefined") {
		locale = getCookie("lang")?.toString() || config.defaultLang;
	}
	return locale;
};

export const setLocale = (lang: string) => {
	if (!config.langs.includes(lang)) return;
	setCookie("lang", lang);
	if (typeof window !== "undefined") {
		window.location.reload();
	}
};

export function useTranslator() {
	const translations = useContext(TranslatorContext);
	const t = (keyPath: string): string | undefined => {
		const keys = keyPath.split(".");
		let current: TranslationInput | string = translations;

		for (let key of keys) {
			if (typeof current === "object") {
				current = current[key];
			} else {
				break;
			}
		}
		return typeof current === "string" ? current : undefined;
	};

	return { t };
}
