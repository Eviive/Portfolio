import { HomeTitle } from "@/components/home/home-title";
import type { FC } from "react";

import styles from "src/components/home/home.module.scss";

export const Home: FC = async () => {
    return (
        <section id="home" className={styles.home}>
            <HomeTitle />
        </section>
    );
};
