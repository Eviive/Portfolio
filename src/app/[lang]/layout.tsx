import { Header } from "@/components/common/client";
import { Footer } from "@/components/common/server";
import { I18nContextProvider } from "@/contexts/I18nContext";
import { inter, montserrat, sourceCodePro } from "@/lib/fonts";
import type { Locale } from "@/lib/i18n";
import { getDictionary, locales } from "@/lib/i18n";
import { formatClassNames } from "@/lib/utils";
import "@/styles/reset.scss";
import type { Metadata } from "next";
import type { FC, PropsWithChildren } from "react";

import styles from "./layout.module.scss";

export type MetadataDictionary = {
    description: string;
};

export const generateMetadata = ({ params: { lang } }: { params: RootParams }): Metadata => {

    const dico = getDictionary(lang, "metadata");

    return {
        metadataBase: process.env.BASE_URL ? new URL(process.env.BASE_URL) : undefined,
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
            "Next.js", "Next.js 13", "React", "JavaScript", "TypeScript", "SCSS", "App Router"
        ],
        authors: {
            name: "Albert Vaillon",
            url: process.env.BASE_URL
        },
        colorScheme: "dark",
        themeColor: "#1a1a1a",
        creator: "Albert Vaillon",
        publisher: "Albert Vaillon",
        manifest: "/manifest.json",
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true
            }
        },
        openGraph: {
            title: "Albert Vaillon - Portfolio",
            description: "Albert Vaillon's portfolio",
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
            description: "Albert Vaillon's portfolio",
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

type RootProps = {
    params: RootParams;
};

const RootLayout: FC<PropsWithChildren<RootProps>> = ({ children, params }) => {
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
