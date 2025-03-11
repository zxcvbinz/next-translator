export interface TranslationInput {
	[key: string]: string | TranslationInput;
}

export type configTR = { defaultLang: string; langs: string[] };

export interface ServerConfig {
	translations: string | TranslationInput;
	config: configTR;
}
