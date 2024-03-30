"use client";

import { Thing } from "@/components/about/thing";
import { Title } from "@/components/ui/title";
import { thingsData } from "@/content/things";
import { useDictionary } from "@/hooks/useDictionary";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { DictionaryWithTitle } from "@/types/i18n";
import type { FC } from "react";

import styles from "src/components/about/about.module.scss";

export type AboutDictionary = DictionaryWithTitle;

export const About: FC = () => {

    const dico = useDictionary("about");

    const refs = useScrollReveal({
        multiple: true
    });

    return (
        <section id="about">
            <div className={styles.things}>
                <Title title={dico.title} />
                <ul className={styles.cards}>
                    {thingsData.map((content, i) => (
                        <Thing
                            key={content.name.en}
                            ref={el => refs.current[i] = el}
                            {...content}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
};
