import { Title } from "@/components/common/server";
import { OtherProjectsWrapper } from "@/components/projects/other/client";
import { ProjectService } from "@/services";
import type { FC } from "react";

export const OtherProjects: FC = async () => {

    const otherProjectsPage = await ProjectService.findAllNotFeaturedPaginated();

    return (
        <>
            <Title title="My Other Projects" />
            <OtherProjectsWrapper initialPage={otherProjectsPage} />
        </>
    );
};
