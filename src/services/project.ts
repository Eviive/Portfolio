import { isNotNullOrUndefined } from "@/libs/utils";
import { request } from "@/services/client";
import type { Page, Project } from "@/types/entities";

const URL = "project";

const findAllFeatured = () => request<Project[]>(`/${URL}/featured`);

const findAllNotFeaturedPaginated = (page?: number | string | null, size?: number | string | null) => {
    const searchParams: Partial<Record<"page" | "size", string>> = {};

    isNotNullOrUndefined(page) && (searchParams.page = page.toString());
    isNotNullOrUndefined(size) && (searchParams.size = size.toString());

    return request<Page<Project>>(`/${URL}/not-featured/paginated`, searchParams);
};

const findAllNotFeaturedPaginatedFromNext = (page: number = 1) => request<Page<Project>>(
    `/api/project/not-featured/${page}`,
    undefined,
    { fetchFromNext: true }
);

export const ProjectService = {
    findAllFeatured,
    findAllNotFeaturedPaginated,
    findAllNotFeaturedPaginatedFromNext
};
