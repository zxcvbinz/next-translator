# next-translator
Simple next library for translation 

## usage
- Create a ```translator.config.ts``` on main dir ```/```
- Copy this git on ```/``` with ```/translator```
- Put the translation json on ```/translator/locales```

translator.config.ts
```typescript
export const config = {
	defaultLang: "it",
	langs: ["it", "en"],
};
```


layout.tsx
```typescript
import { TranslationProvider } from "@/translator";
import "./globals.css";
import { config } from "@/translator.config";
import { cookies } from "next/headers";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const nextCookies = cookies();
	let language = nextCookies.get("lang")?.value || config.defaultLang;
	let translations;
	try {
		translations = (await import(`@/translator/locales/${language}.json`))
			.default;
	} catch (e) {
		throw new Error("Language not found");
	}
  
	return (
		<html lang="it">
			<body>
				<TranslationProvider value={translations}>
					{children}
				</TranslationProvider>
			</body>
		</html>
	);
}
```

page.tsx
```typescript

"use client"; #important
import { useTranslator, setLocale } from "@/translator";
interface Props {
	params: any;
}

export default async function Page({ params }: Props) {
	const { t } = useTranslator();

	return (
		<form>
    #To change language 
			<button onClick={() => setLocale("en")} type="submit">
				{t("sidebar.profile")}
			</button>
		</form>
	);
}


```

