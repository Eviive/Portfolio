import { Header } from "@/components/common/client";
import { Footer } from "@/components/common/server";
import { I18nContextProvider } from "@/contexts/I18nContext";
import { inter, montserrat, sourceCodePro } from "@/libs/fonts";
import type { Locale } from "@/libs/i18n";
import { defaultLocale, getDictionary, locales } from "@/libs/i18n";
import { formatClassNames } from "@/libs/utils/react";
import "@/styles/reset.scss";
import type { PropsWithParams } from "@/types/app";
import type { Metadata } from "next";
import type { FC, PropsWithChildren } from "react";

import styles from "./layout.module.scss";

export type MetadataDictionary = {
    description: string;
};

export const generateMetadata = ({ params: { lang } }: { params: RootParams }): Metadata => {

    const dico = getDictionary(lang, "metadata");

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ? new URL(process.env.NEXT_PUBLIC_BASE_URL) : undefined;

    const localesUrl: Record<string, string> = {};
    for (const locale of locales) {
        localesUrl[locale] = new URL(locale === defaultLocale ? "" : locale, baseUrl).toString();
    }

    return {
        metadataBase: baseUrl,
        title: {
            default: "Albert Vaillon - Portfolio",
            template: "%s - Portfolio"
        },
        description: dico.description,
        generator: "Next.js",
        applicationName: "Albert Vaillon - Portfolio",
        referrer: "origin-when-cross-origin",
        keywords: [
            "Albert Vaillon", "Albert", "Vaillon",
            "Albert Vaillon's portfolio", "Portfolio de Albert Vaillon", "Portfolio",
            "Computer science", "Student", "Étudiant en informatique", "Étudiant",
            "Software development", "Web development", "Développement logiciel", "Développement web",
            "Next.js", "Next.js 13", "React", "JavaScript", "TypeScript", "SCSS", "App Router",
            "IUT", "IUT Lyon 1", "Institut Universitaire de Technologie Lyon 1", "IUT Lyon 1 - Département Informatique",
            "BUT", "BUT Informatique", "Bachelor Universitaire de Technologie"
        ],
        authors: {
            name: "Albert Vaillon",
            url: process.env.NEXT_PUBLIC_BASE_URL
        },
        themeColor: "#1a1a1a",
        colorScheme: "dark",
        creator: "Albert Vaillon",
        publisher: "Albert Vaillon",
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true
            }
        },
        alternates: {
            canonical: baseUrl?.toString(),
            languages: localesUrl
        },
        manifest: "/manifest.json",
        openGraph: {
            title: "Albert Vaillon - Portfolio",
            description: dico.description,
            url: "/",
            siteName: "Portfolio",
            images: [
                {
                    url: "/api/og",
                    width: 1200,
                    height: 630,
                    alt: "Albert Vaillon - Portfolio"
                }
            ],
            locale: lang,
            countryName: "France",
            type: "website"
        },
        twitter: {
            card: "summary_large_image",
            title: "Albert Vaillon - Portfolio",
            description: dico.description,
            images: {
                url: "/api/og",
                alt: "Albert Vaillon - Portfolio",
                width: 1200,
                height: 630
            }
        },
        other: {
            "msapplication-TileColor": "#1a1a1a",
            "msapplication-TileImage": "/mstile-150x150.png",
            "msapplication-config": "/browserconfig.xml"
        }
    };
};

type RootParams = {
    lang: Locale;
};

export const generateStaticParams = (): RootParams[] => {
    return locales.map(lang => ({ lang }));
};

const RootLayout: FC<PropsWithParams<PropsWithChildren, RootParams>> = ({ children, params }) => {
    return (
        <html lang={params.lang} className="sr">
            <body className={formatClassNames(inter.className, sourceCodePro.variable, montserrat.variable)}>
                <I18nContextProvider value={params.lang}>
                    <Header />
                    <main className={styles.main}>
                        {children}
                    </main>
                    <Footer />
                </I18nContextProvider>
            </body>
        </html>
    );
};

export default RootLayout;
