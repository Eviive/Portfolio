"use client";

import { Thing } from "@/components/about/thing";
import { Title } from "@/components/ui/title";
import { thingsData } from "@/content/things";
import { useDictionary } from "@/hooks/use-dictionary";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { defaultLocale } from "@/libs/i18n";
import { extractLocaleFromPathname } from "@/libs/utils/url";
import type { DictionaryWithTitle } from "@/types/i18n";
import { usePathname } from "next/navigation";
import type { FC } from "react";

import styles from "./about.module.scss";

export type AboutDictionary = DictionaryWithTitle;

export const About: FC = () => {

    const pathname = usePathname();

    const locale = extractLocaleFromPathname(pathname) || defaultLocale;

    const dico = useDictionary("about", locale);

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
