import { Header } from "@/components/common/client";
import { Footer } from "@/components/common/server";
import { inter, montserrat, sourceCodePro } from "@/lib/fonts";
import { formatClassNames } from "@/lib/utils";
import "@/styles/reset.scss";
import type { Metadata } from "next";
import type { FC, PropsWithChildren } from "react";

import styles from "./layout.module.scss";

export const metadata: Metadata = {
    metadataBase: process.env.BASE_URL ? new URL(process.env.BASE_URL) : undefined,
    title: {
        default: "Albert Vaillon - Portfolio",
        template: "%s - Portfolio"
    },
    description: "Albert Vaillon's portfolio",
    generator: "Next.js",
    applicationName: "Albert Vaillon - Portfolio",
    referrer: "origin-when-cross-origin",
    keywords: [
        "Albert Vaillon", "Albert", "Vaillon",
        "Albert Vaillon's portfolio", "Portfolio",
        "Computer science", "Student",
        "Software development", "Web development",
        "Next.js", "Next.js 13", "React", "JavaScript",
        "TypeScript", "SCSS"
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
        locale: "en_GB",
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

const RootLayout: FC<PropsWithChildren> = props => {
    return (
        <html lang="en" className="sr">
            <body className={formatClassNames(inter.className, sourceCodePro.variable, montserrat.variable)}>
                <Header />
                <main className={styles.main}>
                    {props.children}
                </main>
                <Footer />
            </body>
        </html>
    );
};

export default RootLayout;
