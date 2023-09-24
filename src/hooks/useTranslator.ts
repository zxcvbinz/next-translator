import { getCookie, setCookie } from "cookies-next";
import { useContext } from "react";
import { TranslatorContext } from "../provider/TranslationProvider";

interface TranslationInput {
	[key: string]: string | TranslationInput;
}

export const getLocale = () => {
	const { config } = useContext(TranslatorContext);

	let locale = config.defaultLang;
	if (typeof window !== "undefined") {
		locale = getCookie("lang")?.toString() || config.defaultLang;
	}
	return locale;
};

export const setLocale = (lang: string) => {
	if (typeof window !== "undefined") {
		setCookie("lang", lang);
		window.location.reload();
	}
};

export function useTranslator(basePath = "") {
	const { translations } = useContext(TranslatorContext);

	const t = (keyPath: string, ...args: any[]): string => {
		const completePath = basePath ? `${basePath}.${keyPath}` : keyPath;
		const keys = completePath.split(".");
		let current: TranslationInput | string = translations;

		for (let key of keys) {
			if (typeof current === "object") {
				current = current[key];
			} else {
				break;
			}
		}

		if (typeof current === "string") {
			let i = 0;
			return current.replace(/%s/g, () => {
				return args[i++] || "";
			});
		}

		return "";
	};

	return { t };
}
