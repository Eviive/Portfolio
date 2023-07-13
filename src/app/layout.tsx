import { Header } from "@/components/common/client";
import { Footer } from "@/components/common/server";
import { inter, montserrat, sourceCodePro } from "@/fonts";
import "@/styles/reset.scss";
import { formatClassNames } from "@/utils/components";
import type { Metadata } from "next";
import type { FC, PropsWithChildren } from "react";

import styles from "./layout.module.scss";

export const metadata: Metadata = {
    title: {
        default: "Albert Vaillon - Portfolio",
        template: "%s - Portfolio"
    },
    manifest: "/manifest.json",
    themeColor: "#1a1a1a",
    other: {
        "msapplication-TileColor": "#1a1a1a",
        "msapplication-TileImage": "/mstile-150x150.png",
        "msapplication-config": "/browserconfig.xml"
    }
};

const RootLayout: FC<PropsWithChildren> = props => {
    return (
        <html lang="en">
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
