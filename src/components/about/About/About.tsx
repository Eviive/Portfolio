import { Thing } from "@/components/about";
import { Title } from "@/components/common/client";
import { thingsData } from "@/content/things";
import type { FC } from "react";

import styles from "./about.module.scss";

export const About: FC = () => {

    const things = thingsData.map((content, i) => (
        <Thing
            key={i}
            {...content}
        />
    ));

    return (
        <section id="about">
            <div className={styles.things}>
                <Title title="Things I love" />
                <div className={styles.cards}>
                    {things}
                </div>
            </div>
        </section>
    );
};
