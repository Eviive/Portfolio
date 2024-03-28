"use client";

import { Title } from "@/components/common/server";
import type { FeaturedProjectsDictionary } from "@/components/projects/featured";
import { FeaturedProjectCard } from "@/components/projects/featured";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Project } from "@/types/entities";
import type { FC } from "react";

import styles from "./featured-projects-wrapper.module.scss";

type Props = {
    projects: Project[];
    dico: FeaturedProjectsDictionary;
};

export const FeaturedProjectsWrapper: FC<Props> = ({ projects, dico }) => {

    const refs = useScrollReveal({
        multiple: true,
        intervalDelay: 0
    });

    return (
        <>
            <Title title={dico.title} />
            <ul className={styles.featured}>
                {projects.map((project, i) => (
                    <FeaturedProjectCard
                        key={project.id}
                        ref={el => refs.current[i] = el}
                        project={project}
                    />
                ))}
            </ul>
        </>
    );
};
