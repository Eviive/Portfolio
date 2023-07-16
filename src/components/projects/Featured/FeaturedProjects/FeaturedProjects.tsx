import { ScrollReveal } from "@/components/common/client";
import { Title } from "@/components/common/server";
import { FeaturedProjectCard } from "@/components/projects/featured";
import { ProjectService } from "@/services";
import type { FC } from "react";

import styles from "./featured-projects.module.scss";

export const FeaturedProjects: FC = async () => {

    const featuredProjects = await ProjectService.findAllFeatured();

    return (
        <>
            <Title title="Some projects I've built" />
            <ul className={styles.featured}>
                <ScrollReveal
                    multiple
                    content={
                        featuredProjects
                            .sort((a, b) => a.sort - b.sort)
                            .map((project, i) => (
                                <FeaturedProjectCard key={i} project={project} />
                            ))
                    }
                    options={{
                        intervalDelay: 0
                    }}
                />
            </ul>
        </>
    );
};
