"use client";

import { Dropdown } from "@/components/common/client";
import { Link } from "@/components/common/server";
import { useI18nContext } from "@/contexts/I18nContext";
import { useDictionary } from "@/hooks/useDictionary";
import type { Locale } from "@/libs/i18n";
import { defaultLocale, isLocale, localeDictionary, locales } from "@/libs/i18n";
import logo from "@/public/logo.svg";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import type { FC } from "react";

import styles from "./header.module.scss";

const anchors = [ "home", "about", "projects" ] as const;
type Anchor = typeof anchors[number];

export type HeaderDictionary = {
    anchors: Record<Anchor, string>;
    logoAlt: string;
};

export const Header: FC = () => {

    const locale = useI18nContext();

    const dico = useDictionary("header");

    const pathname = usePathname();

    const getLocaleLink = (linkLocale: Locale): string => {
        const segments = pathname.split("/"),
              firstSegment = segments[1];

        segments[1] = linkLocale;

        if (linkLocale === defaultLocale) {
            if (isLocale(firstSegment)) {
                if (firstSegment !== defaultLocale) {
                    segments[1] = "";
                }
            } else {
                segments[1] = "";
            }
        }

        return segments.join("/");
    };

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.left}>
                    <div className={styles.logo}>
                        <Link href={`/${locale}`}>
                            <NextImage
                                src={logo}
                                alt={dico.logoAlt}
                                height={40}
                                priority
                            />
                        </Link>
                    </div>
                    <div className={styles.links}>
                        {anchors.map(a => (
                            <Link key={a} href={`/${locale}#${a}`}>
                                {dico.anchors[a]}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className={styles.right}>
                    <Dropdown
                        items={locales.map(l => ({
                            text: localeDictionary[l],
                            href: getLocaleLink(l),
                            isSelected: l === locale
                        }))}
                    />
                </div>
            </nav>
        </header>
    );
};
