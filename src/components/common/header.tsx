"use client";

import { Dropdown } from "@/components/ui/dropdown";
import { Link } from "@/components/ui/link";
import { useI18nContext } from "@/contexts/i18n-context";
import { localeDictionary, locales } from "@/libs/i18n";
import { extractLocaleFromPathname, formatUriWithLocale } from "@/libs/utils/url";
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

type Props = {
    dict: HeaderDictionary;
};

export const Header: FC<Props> = ({ dict }) => {

    const pathname = usePathname();

    const pathnameLocale = extractLocaleFromPathname(pathname);

    const i18n = useI18nContext();

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.left}>
                    <div className={styles.logo}>
                        <Link href={`/${pathnameLocale}`}>
                            <NextImage
                                src={logo}
                                alt={dict.logoAlt}
                                height={35}
                                priority
                            />
                        </Link>
                    </div>
                    <div className={styles.links}>
                        {anchors.map(a => (
                            <Link key={a} href={`/${pathnameLocale}#${a}`}>
                                {dict.anchors[a]}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className={styles.right}>
                    <Dropdown
                        menuClassName={styles.menu}
                        items={
                            locales.map(l => ({
                                text: localeDictionary[l],
                                href: formatUriWithLocale(pathname, l),
                                isSelected: l === i18n.locale
                            }))
                        }
                    />
                </div>
            </nav>
        </header>
    );
};
