import { FeaturedProjectsWrapper } from "@/components/projects/featured/featured-projects-wrapper";
import { Title } from "@/components/ui/title";
import { getDictionary } from "@/libs/utils/i18n";
import { ProjectService } from "@/services/project";
import type { DictionaryWithTitle } from "@/types/i18n";
import type { FC } from "react";

export type FeaturedProjectsDictionary = DictionaryWithTitle;

export const FeaturedProjects: FC = async () => {
    const featuredProjects = await ProjectService.findAllFeatured();

    featuredProjects.sort((a, b) => a.sort - b.sort);

    const dict = getDictionary("featuredProjects");
    const cardDict = getDictionary("featuredProjectCard");

    return (
        <>
            <Title title={dict.title} />
            <FeaturedProjectsWrapper projects={featuredProjects} cardDict={cardDict} />
        </>
    );
};
