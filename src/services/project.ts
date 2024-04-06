import { isNotNullOrUndefined } from "@/libs/utils/assertion";
import { request } from "@/services/client";
import type { Page, Project } from "@/types/entities";
import type { SearchParamsRecord } from "@/types/utils";

const URL = "project";

const findAllFeatured = () => request<Project[]>(`/${URL}/featured`);

const findAllNotFeaturedPaginated = (
    page?: number | string | null,
    size?: number | string | null
) => {
    const searchParams: SearchParamsRecord = {};

    isNotNullOrUndefined(page) && (searchParams.page = page.toString());
    isNotNullOrUndefined(size) && (searchParams.size = size.toString());

    return request<Page<Project>>(`/${URL}/not-featured/paginated`, searchParams);
};

const findAllNotFeaturedPaginatedFromNext = (page?: number) =>
    request<Page<Project>>(
        `/api/${URL}/not-featured/paginated`,
        page ? { page: page.toString() } : undefined,
        { fetchFromNext: true }
    );

export const ProjectService = {
    findAllFeatured,
    findAllNotFeaturedPaginated,
    findAllNotFeaturedPaginatedFromNext
};
