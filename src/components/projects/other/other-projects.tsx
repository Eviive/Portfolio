import { OtherProjectsWrapper } from "@/components/projects/other/other-projects-wrapper";
import { Title } from "@/components/ui/title";
import { ProjectService } from "@/services/project";
import type { DictionaryWithTitle } from "@/types/i18n";
import type { FC } from "react";

export type OtherProjectsDictionary = DictionaryWithTitle;

type Props = {
    dico: OtherProjectsDictionary;
};

export const OtherProjects: FC<Props> = async ({ dico }) => {

    const otherProjectsPage = await ProjectService.findAllNotFeaturedPaginated();

    return (
        <>
            <Title title={dico.title} />
            <OtherProjectsWrapper initialPage={otherProjectsPage} />
        </>
    );
};
