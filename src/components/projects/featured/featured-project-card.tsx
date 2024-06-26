"use client";

import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";
import { useI18nContext } from "@/contexts/i18n-context";
import { formatClassNames } from "@/libs/utils/react";
import { ImageService } from "@/services/image";
import type { Project } from "@/types/entities";
import { forwardRef } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";

import styles from "./featured-project-card.module.scss";

export type FeaturedProjectCardDictionary = {
    subtitle: string;
};

type Props = {
    project: Project;
    dict: FeaturedProjectCardDictionary;
};

const FeaturedProjectCard = forwardRef<HTMLLIElement, Props>(({ project, dict }, ref) => {
    const i18n = useI18nContext();

    const dateFormatter = new Intl.DateTimeFormat(i18n.locale, {
        month: "long",
        year: "numeric"
    });

    project.skills.sort((a, b) => a.sort - b.sort);

    return (
        <li ref={ref} className={formatClassNames(styles.card, "reveal-hidden")}>
            <div className={styles.description}>
                <div className={styles.title}>
                    <span className={styles.featured}>{dict.subtitle}</span>
                    <Link href={project.demoUrl} blank>
                        <h3>{project.title}</h3>
                    </Link>
                    <span className={styles.date}>
                        {dateFormatter.format(new Date(project.creationDate))}
                    </span>
                </div>
                <p>{i18n.locale === "en" ? project.descriptionEn : project.descriptionFr}</p>
                <div className={styles.logos}>
                    <div className={styles.skills}>
                        {project.skills.map(s => (
                            <Image
                                key={s.id}
                                src={ImageService.getImageUrl(s.image, "skills") ?? ""}
                                alt={i18n.locale === "en" ? s.image.altEn : s.image.altFr}
                                title={s.name}
                                width={36}
                            />
                        ))}
                    </div>
                    <div className={styles.links}>
                        <Link href={project.repoUrl} aria-label="GitHub repository" blank>
                            <FiGithub size={30} />
                        </Link>
                        <Link href={project.demoUrl} aria-label="Demonstration" blank>
                            <FiExternalLink size={30} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.image}>
                <Link href={project.demoUrl} aria-label="Demonstration" blank>
                    <Image
                        src={ImageService.getImageUrl(project.image, "projects") ?? ""}
                        alt={i18n.locale === "en" ? project.image.altEn : project.image.altFr}
                        width={1080}
                        height={675}
                    />
                </Link>
            </div>
        </li>
    );
});

FeaturedProjectCard.displayName = "FeaturedProjectCard";

export { FeaturedProjectCard };
