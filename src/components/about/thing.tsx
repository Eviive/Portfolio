"use client";

import type { Thing as ThingType } from "@/content/things";
import { useI18nContext } from "@/contexts/i18n-context";
import { formatClassNames } from "@/libs/utils/react";
import { forwardRef } from "react";
import { BsFillCircleFill } from "react-icons/bs";

import styles from "./thing.module.scss";

type Props = ThingType;

const Thing = forwardRef<
    HTMLLIElement,
    Props
>((props, ref) => {

    const i18n = useI18nContext();

    return (
        <li ref={ref} className={formatClassNames(styles.card, "reveal-hidden")}>
            <div className={styles.circle}>
                <BsFillCircleFill size={60} />
                <props.icon size={35} className={styles.icon} />
            </div>
            <h3>{props.name[i18n.locale]}</h3>
            <p>{props.text[i18n.locale]}</p>
        </li>
    );
});

Thing.displayName = "Thing";

export { Thing };
