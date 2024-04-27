import { getDictionary } from "@/libs/utils/i18n";
import type { FC } from "react";

import styles from "./home-title.module.scss";

export type HomeDictionary = {
    hi: string;
    occupation: string;
};

export const HomeTitle: FC = () => {
    const dict = getDictionary("home");

    return (
        <div className={styles.hello}>
            <span>{dict.hi}</span>
            <h1>Albert Vaillon</h1>
            <h2>{dict.occupation}</h2>
        </div>
    );
};
