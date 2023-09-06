import type { Thing as ThingType } from "@/content/things";
import { useI18nContext } from "@/contexts/I18nContext";
import type { FC } from "react";
import { BsFillCircleFill } from "react-icons/bs";

import styles from "./thing.module.scss";

type Props = ThingType;

export const Thing: FC<Props> = props => {

    const locale = useI18nContext();

    return (
        <div className={styles.card}>
            <div className={styles.circle}>
                <BsFillCircleFill size={60} />
                <props.icon size={35} className={styles.icon} />
            </div>
            <h3>{props.name[locale]}</h3>
            <p>{props.text[locale]}</p>
        </div>
    );
};
