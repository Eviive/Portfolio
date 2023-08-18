import { Thing } from "@/components/about";
import { ScrollReveal } from "@/components/common/client";
import { Title } from "@/components/common/server";
import { thingsData } from "@/content/things";
import { useDictionary } from "@/hooks/useDictionary";
import type { DictionaryWithTitle } from "@/types/i18n";
import type { FC } from "react";

import styles from "./about.module.scss";

export type AboutDictionary = DictionaryWithTitle;

export const About: FC = () => {

    const dico = useDictionary("about");

    return (
        <section id="about">
            <div className={styles.things}>
                <Title title={dico.title} />
                <ul className={styles.cards}>
                    <ScrollReveal
                        multiple
                        content={
                            thingsData.map(content => (
                                <Thing key={content.name.en} {...content} />
                            ))
                        }
                    />
                </ul>
            </div>
        </section>
    );
};
