import { Image } from "@/components/common/client";
import { Link } from "@/components/common/server";
import { useDictionary } from "@/hooks/useDictionary";
import { ImageService } from "@/services";
import type { Project } from "@/types/entities";
import type { FC } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";

import styles from "./featured-project-card.module.scss";

export type FeaturedProjectCardDictionary = {
    subtitle: string;
};

type Props = {
    project: Project;
};

export const FeaturedProjectCard: FC<Props> = ({ project }) => {

    const dico = useDictionary("featuredProjectCard");

    project.skills.sort((a, b) => a.sort - b.sort);

    return (
        <div className={styles.card}>
            <div className={styles.description}>
                <div className={styles.title}>
                    <span>{dico.subtitle}</span>
                    <Link href={project.demoUrl} blank>
                        <h3>{project.title}</h3>
                    </Link>
                </div>
                <p>{project.description}</p>
                <div className={styles.logos}>
                    <div className={styles.skills}>
                        {project.skills.map(s => (
                            <Image
                                key={s.id}
                                src={ImageService.getImageUrl(s.image) ?? ""}
                                alt={s.image.alt}
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
                        src={ImageService.getImageUrl(project.image) ?? ""}
                        alt={project.image.alt}
                        width={1080}
                        height={675}
                    />
                </Link>
            </div>
        </div>
    );
};
