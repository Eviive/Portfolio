"use client";

import type { FeaturedProjectCardDictionary } from "@/components/projects/featured/featured-project-card";
import { FeaturedProjectCard } from "@/components/projects/featured/featured-project-card";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import type { Project } from "@/types/entities";
import type { FC } from "react";

import styles from "./featured-projects-wrapper.module.scss";

type Props = {
    projects: Project[];
    cardDict: FeaturedProjectCardDictionary;
};

export const FeaturedProjectsWrapper: FC<Props> = ({ projects, cardDict }) => {

    const refs = useScrollReveal({
        multiple: true,
        intervalDelay: 0
    });

    return (
        <ul className={styles.featured}>
            {projects.map((project, i) => (
                <FeaturedProjectCard
                    key={project.id}
                    ref={el => {
                        refs.current[i] = el;
                    }}
                    project={project}
                    dict={cardDict}
                />
            ))}
        </ul>
    );
};
