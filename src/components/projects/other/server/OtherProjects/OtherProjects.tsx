import { Title } from "@/components/common/server";
import { OtherProjectsWrapper } from "@/components/projects/other/client";
import { ProjectService } from "@/services";
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
