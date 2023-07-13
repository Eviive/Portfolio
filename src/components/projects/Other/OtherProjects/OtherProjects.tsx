import { Title } from "@/components/common/client";
import { OtherProjectCard } from "@/components/projects/Other";
import { GridLayout } from "@/layouts";
import { ProjectService } from "@/services";
import type { FC } from "react";

import styles from "./other-projects.module.scss";

export const OtherProjects: FC = async () => {

    const otherProjectsPage = await ProjectService.findAllNotFeaturedPaginated();

    return (
        <>
            <Title title="My Other Projects" />
            <GridLayout className={styles.projects} size="300px">
                {otherProjectsPage.content
                    .sort((a, b) => a.sort - b.sort)
                    .map((project, i) => (
                        <OtherProjectCard key={i} project={project} />
                    ))
                }
            </GridLayout>
        </>
    );
};
