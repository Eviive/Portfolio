"use client";

import { Thing } from "@/components/about/thing";
import { Title } from "@/components/ui/title";
import { thingsData } from "@/content/things";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import type { DictionaryWithTitle } from "@/types/i18n";
import type { FC } from "react";

import styles from "./about.module.scss";

export type AboutDictionary = DictionaryWithTitle;

type Props = {
    dict: AboutDictionary;
};

export const About: FC<Props> = ({ dict }) => {
    const refs = useScrollReveal({
        multiple: true
    });

    return (
        <section id="about">
            <div className={styles.things}>
                <Title title={dict.title} />
                <ul className={styles.cards}>
                    {thingsData.map((content, i) => (
                        <Thing
                            key={content.name.en}
                            ref={el => {
                                refs.current[i] = el;
                            }}
                            {...content}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
};
