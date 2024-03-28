import { FeaturedProjectsWrapper } from "@/components/projects/featured/client/FeaturedProjectsWrapper/FeaturedProjectsWrapper";
import { ProjectService } from "@/services";
import type { DictionaryWithTitle } from "@/types/i18n";
import type { FC } from "react";

export type FeaturedProjectsDictionary = DictionaryWithTitle;

type Props = {
    dico: FeaturedProjectsDictionary;
};

export const FeaturedProjects: FC<Props> = async ({ dico }) => {

    const featuredProjects = await ProjectService.findAllFeatured();

    featuredProjects.sort((a, b) => a.sort - b.sort);

    return (
        <FeaturedProjectsWrapper projects={featuredProjects} dico={dico} />
    );
};
