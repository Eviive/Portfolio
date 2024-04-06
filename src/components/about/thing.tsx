"use client";

import type { Thing as ThingType } from "@/content/things";
import { defaultLocale } from "@/libs/i18n";
import { extractLocaleFromPathname } from "@/libs/utils/url";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { BsFillCircleFill } from "react-icons/bs";

import styles from "./thing.module.scss";

type Props = ThingType;

const Thing = forwardRef<
    HTMLLIElement,
    Props
>((props, ref) => {

    const pathname = usePathname();

    const locale = extractLocaleFromPathname(pathname) || defaultLocale;

    return (
        <li ref={ref} className={styles.card}>
            <div className={styles.circle}>
                <BsFillCircleFill size={60} />
                <props.icon size={35} className={styles.icon} />
            </div>
            <h3>{props.name[locale]}</h3>
            <p>{props.text[locale]}</p>
        </li>
    );
});

Thing.displayName = "Thing";

export { Thing };
