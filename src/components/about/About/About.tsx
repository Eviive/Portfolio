import { Thing } from "@/components/about";
import { ScrollReveal } from "@/components/common/client";
import { Title } from "@/components/common/server";
import { thingsData } from "@/content/things";
import type { FC } from "react";

import styles from "./about.module.scss";

export const About: FC = () => {
    return (
        <section id="about">
            <div className={styles.things}>
                <Title title="Things I love" />
                <ul className={styles.cards}>
                    <ScrollReveal
                        multiple
                        content={
                            thingsData.map((content, i) => (
                                <Thing key={i} {...content} />
                            ))
                        }
                    />
                </ul>
            </div>
        </section>
    );
};
