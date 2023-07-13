import { Title } from "@/components/common/client";
import { FeaturedProjectCard } from "@/components/projects";
import { ProjectService } from "@/services";
import type { FC } from "react";

import styles from "./featured-projects.module.scss";

export const FeaturedProjects: FC = async () => {

    const featuredProjects = await ProjectService.findAllFeatured();

    return (
        <>
            <Title title="Some Projects I've Built" />
            <ul className={styles.featured}>
                {featuredProjects
                    .sort((a, b) => a.sort - b.sort)
                    .map((project, i) => (
                        <FeaturedProjectCard key={i} project={project} />
                    ))
                }
            </ul>
        </>
    );
};
