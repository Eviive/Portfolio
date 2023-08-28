import { useDictionary } from "@/hooks/useDictionary";
import type { FC } from "react";

import styles from "./home-title.module.scss";

export const HomeTitle: FC = () => {

    const dico = useDictionary("home");

    return (
        <div className={styles.hello}>
            <span>{dico.hi}</span>
            <h1>Albert Vaillon</h1>
            <h2>{dico.occupation}</h2>
        </div>
    );
};
