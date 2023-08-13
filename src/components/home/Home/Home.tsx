import { useDictionary } from "@/hooks/useDictionary";
import type { FC } from "react";

import styles from "./home.module.scss";

export type HomeDictionary = {
    hi: string;
    occupation: string;
};

export const Home: FC = () => {

    const dico = useDictionary("home");

    return (
        <section id="home" className={styles.home}>
            <div className={styles.hello}>
                <span>{dico.hi}</span>
                <h1>Albert Vaillon</h1>
                <h2>{dico.occupation}</h2>
            </div>
        </section>
    );
};
