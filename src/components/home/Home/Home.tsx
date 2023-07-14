import type { FC } from "react";

import styles from "./home.module.scss";

export const Home: FC = () => {
    return (
        <section id="home" className={styles.home}>
            <div className={styles.hello}>
                <span>Hi, I&apos;m</span>
                <h1>Albert Vaillon</h1>
                <h3>Computer science student</h3>
            </div>
        </section>
    );
};