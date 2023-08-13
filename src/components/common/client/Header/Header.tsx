"use client";

import { Link } from "@/components/common/server";
import { useI18nContext } from "@/contexts/I18nContext";
import { useDictionary } from "@/hooks/useDictionary";
import { formatClassNames } from "@/lib/utils";
import logo from "@/public/logo.svg";
import NextImage from "next/image";
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
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScroll);
                ticking = true;
            }
        };
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const headerClassName = formatClassNames(
        styles.header,
        headerState.isOnTop ? styles.top : (headerState.isScrolling && styles.hidden)
    );

    return (
        <header className={headerClassName}>
            <nav className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.logo}>
                        <Link href={`/${locale}`}>
                            <NextImage
                                src={logo}
                                alt={dico.logoAlt}
                                height={50}
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
            </nav>
        </header>
    );
};
