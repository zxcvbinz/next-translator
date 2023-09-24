import { cookies } from "next/headers";

interface TranslationInput {
	[key: string]: string | TranslationInput;
}

export function CheckServerLocale(TranslateConfig: any) {
	const nextCookies = cookies();
	let language =
		nextCookies.get("lang")?.value || TranslateConfig.defaultLang;
	return language;
}

export async function TranslatorServer(
	basePath = "",
	translations: TranslationInput
) {
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

		return basePath;
	};

	return { t };
}
