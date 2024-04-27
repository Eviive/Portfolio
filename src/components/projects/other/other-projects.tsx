import { OtherProjectsWrapper } from "@/components/projects/other/other-projects-wrapper";
import { Title } from "@/components/ui/title";
import { getDictionary } from "@/libs/utils/i18n";
import { ProjectService } from "@/services/project";
import type { DictionaryWithTitle } from "@/types/i18n";
import type { FC } from "react";

export type OtherProjectsDictionary = DictionaryWithTitle;

export const OtherProjects: FC = async () => {
    const otherProjectsPage = await ProjectService.findAllNotFeatured();

    const dict = getDictionary("otherProjects");
    const wrapperDict = getDictionary("otherProjectsWrapper");

    return (
        <>
            <Title title={dict.title} />
            <OtherProjectsWrapper initialPage={otherProjectsPage} dict={wrapperDict} />
        </>
    );
};
