# next-translator

Simple next library for translation

layout.tsx

```typescript
import { TranslationProvider } from "next-translator";
import "./globals.css";
import { cookies } from "next/headers";

export const TranslateConfig = {
	defaultLang: "it",
	langs: ["it", "en"],
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const nextCookies = cookies();
	let language =
		nextCookies.get("lang")?.value || TranslateConfig.defaultLang;
	let translations;
	try {
		translations = (await import(`@/locales/${language}.json`)).default;
	} catch (e) {
		throw new Error("Language not found");
	}
	return (
		<html lang="en">
			<body>
				<TranslationProvider
					translations={translations}
					config={TranslateConfig}>
					{children}
				</TranslationProvider>
			</body>
		</html>
	);
}

export async function generateMetadata({ params }: { params: any }) {
	return {
		title: "Demo",
	};
}
```

server-page.tsx

```typescript
import { useTranslatorServer } from "next-translator";

interface Props {
	params: any;
}

/* Export this in case of multiple uses */
const TranslateConfig = {
	defaultLang: "it",
	langs: ["it", "en"],
};

const language = checkServerLocale(TranslateConfig);
let translations;
try {
	translations = (await import(`@/locales/${language}.json`)).default;
} catch (e) {
	throw new Error("Language not found");
}

const { t } = await useTranslatorServer("metadata", translations);

const title = t("title");
const description = t("description");
return {
	title: title,
	description: description,
};

export default async function Page({ params }: Props) {
	return <h1>Demo Page</h1>;
}
```

page.tsx

```typescript
"use client";
#important;
import { useTranslator, setLocale } from "next-translator";
interface Props {
	params: any;
}

export default async function Page({ params }: Props) {
	const { t } = useTranslator();
	/* or 
	const { t } = useTranslator("sidebar");  */

	return (
		<form>
			/* To change language */
			<button onClick={() => setLocale("en")} type="submit">
				{t("sidebar.profile")}
			</button>
		</form>
	);
}
```

## To Build

```bash
npm run build #This create dist folder
npm pack #this create a tar.gz file
```
