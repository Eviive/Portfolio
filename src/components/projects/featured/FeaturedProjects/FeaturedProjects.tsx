import { ScrollReveal } from "@/components/common/client";
import { Title } from "@/components/common/server";
import { FeaturedProjectCard } from "@/components/projects/featured";
import { ProjectService } from "@/services";
import type { DictionaryWithTitle } from "@/types/i18n";
import type { FC } from "react";

import styles from "./featured-projects.module.scss";

export type FeaturedProjectsDictionary = DictionaryWithTitle;

type Props = {
    dico: FeaturedProjectsDictionary
};

export const FeaturedProjects: FC<Props> = async ({ dico }) => {

    const featuredProjects = await ProjectService.findAllFeatured();

    featuredProjects.sort((a, b) => a.sort - b.sort);

    return (
        <>
            <Title title={dico.title} />
            <ul className={styles.featured}>
                <ScrollReveal
                    multiple
                    content={
                        featuredProjects.map(project => (
                            <FeaturedProjectCard key={project.id} project={project} />
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
