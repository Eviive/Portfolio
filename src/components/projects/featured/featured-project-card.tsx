"use client";

import { Image } from "@/components/ui/image";
import { Link } from "@/components/ui/link";
import { useDictionary } from "@/hooks/use-dictionary";
import { defaultLocale } from "@/libs/i18n";
import { extractLocaleFromPathname } from "@/libs/utils/url";
import { ImageService } from "@/services/image";
import type { Project } from "@/types/entities";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";

import styles from "./featured-project-card.module.scss";

export type FeaturedProjectCardDictionary = {
    subtitle: string;
};

type Props = {
    project: Project;
};

const FeaturedProjectCard = forwardRef<
    HTMLLIElement,
    Props
>(({ project }, ref) => {

    const pathname = usePathname();

    const locale = extractLocaleFromPathname(pathname) || defaultLocale;

    const dico = useDictionary("featuredProjectCard", locale);

    project.skills.sort((a, b) => a.sort - b.sort);

    return (
        <li ref={ref} className={styles.card}>
            <div className={styles.description}>
                <div className={styles.title}>
                    <span>{dico.subtitle}</span>
                    <Link href={project.demoUrl} blank>
                        <h3>{project.title}</h3>
                    </Link>
                </div>
                <p>{locale === "en" ? project.descriptionEn : project.descriptionFr}</p>
                <div className={styles.logos}>
                    <div className={styles.skills}>
                        {project.skills.map(s => (
                            <Image
                                key={s.id}
                                src={ImageService.getImageUrl(s.image, "skills") ?? ""}
                                alt={locale === "en" ? s.image.altEn : s.image.altFr}
                                title={s.name}
                                width={36}
                            />
                        ))}
                    </div>
                    <div className={styles.links}>
                        <Link href={project.repoUrl} blank>
                            <FiGithub size={30} />
                        </Link>
                        <Link href={project.demoUrl} blank>
                            <FiExternalLink size={30} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.image}>
                <Link href={project.demoUrl} blank>
                    <Image
                        src={ImageService.getImageUrl(project.image, "projects") ?? ""}
                        alt={locale === "en" ? project.image.altEn : project.image.altFr}
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
