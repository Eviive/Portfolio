"use client";

import { Link } from "@/components/ui/link";
import { useI18nContext } from "@/contexts/i18n-context";
import { formatClassNames } from "@/libs/utils/react";
import type { Project } from "@/types/entities";
import { forwardRef } from "react";
import { FiExternalLink, FiFolder, FiGithub } from "react-icons/fi";

import styles from "./other-project-card.module.scss";

type Props = {
    project: Project;
};

const OtherProjectCard = forwardRef<HTMLLIElement, Props>(({ project }, ref) => {
    const i18n = useI18nContext();

    project.skills.sort((a, b) => a.sort - b.sort);

    return (
        <li ref={ref} className={formatClassNames(styles.card, "reveal-hidden")}>
            <div>
                <div className={styles.icons}>
                    <FiFolder size={40} strokeWidth={1} className={styles.folder} />
                    <div className={styles.links}>
                        <Link href={project.repoUrl} aria-label="GitHub repository" blank>
                            <FiGithub size={22} />
                        </Link>
                        <Link href={project.demoUrl} aria-label="Demonstration" blank>
                            <FiExternalLink size={22} />
                        </Link>
                    </div>
                </div>
                <Link className={styles.title} href={project.demoUrl}>
                    <h3>{project.title}</h3>
                </Link>
                <p>{i18n.locale === "en" ? project.descriptionEn : project.descriptionFr}</p>
            </div>
            <ul className={styles.skills}>
                {project.skills.map(s => (
                    <li key={s.id}>{s.name}</li>
                ))}
            </ul>
        </li>
    );
});

OtherProjectCard.displayName = "OtherProjectCard";

export { OtherProjectCard };
