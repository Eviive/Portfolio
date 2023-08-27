import { ProjectService } from "@/services";
import type { RouteHandler } from "@/types/app";
import type { Page, Project } from "@/types/entities";
import { NextResponse } from "next/server";

export const dynamicParams = false;

type PaginatedProjectsParams = {
    page: string;
};

const paginatedProjectsQuery = (page?: number | string | null) => ProjectService.findAllNotFeaturedPaginated(page);

export const generateStaticParams = async (): Promise<PaginatedProjectsParams[]> => {
    const projectsPage = await paginatedProjectsQuery(),
          params: PaginatedProjectsParams[] = [];

    for (let i = 0; i < projectsPage.totalPages; i++) {
        params[i] = { page: (i + 1).toString() };
    }

    return params;
};

export const GET: RouteHandler<PaginatedProjectsParams> = async (_, { params: { page } }): Promise<NextResponse<Page<Project>>> => {

    const projectsPage = await paginatedProjectsQuery(page);

    return NextResponse.json(projectsPage);
};
