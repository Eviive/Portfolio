"use client";

import { Dropdown } from "@/components/common/client";
import { Link } from "@/components/common/server";
import { useI18nContext } from "@/contexts/I18nContext";
import { useDictionary } from "@/hooks/useDictionary";
import { defaultLocale, isLocale, Locale, localeDictionary, locales } from "@/libs/i18n";
import { formatClassNames } from "@/libs/utils";
import logo from "@/public/logo.svg";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import type { FC } from "react";
import { useEffect, useState } from "react";

import styles from "./header.module.scss";

const anchors = [ "home", "about", "projects" ] as const;
type Anchor = typeof anchors[number];

export type HeaderDictionary = {
    anchors: Record<Anchor, string>;
    logoAlt: string;
};

type HeaderState = {
    isOnTop: boolean;
    isScrolling: boolean;
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

    const [ headerState, setHeaderState ] = useState<HeaderState>({
        isOnTop: true,
        isScrolling: false
    });

    useEffect(() => {
        setHeaderState(prevState => ({
            ...prevState,
            isOnTop: window.scrollY === 0
        }));
    }, []);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;
        const updateScroll = () => {
            const scrollY = window.scrollY;
            let isScrolling: boolean | undefined = undefined;
            if (Math.abs(scrollY - lastScrollY) < 0) {
                ticking = false;
            } else {
                isScrolling = scrollY > lastScrollY;
                lastScrollY = scrollY > 0 ? scrollY : 0;
                ticking = false;
            }
            setHeaderState(prevState => ({
                ...prevState,
                isOnTop: scrollY === 0,
                isScrolling: isScrolling ?? prevState.isScrolling
            }));
        };
        let animationFrameId: number;
        const onScroll = () => {
            if (!ticking) {
                animationFrameId = window.requestAnimationFrame(updateScroll);
                ticking = true;
            }
        };
        window.addEventListener("scroll", onScroll);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    const headerClassName = formatClassNames(
        styles.header,
        headerState.isOnTop
            ? styles.top
            : (headerState.isScrolling && styles.hidden)
    );

    return (
        <header className={headerClassName}>
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
