import { isNotNullOrUndefined } from "@/libs/utils/assertion";
import { request } from "@/services/client";
import type { Page, Project } from "@/types/entities";
import type { SearchParamsRecord } from "@/types/utils";

const URL = "project";

const findAllFeatured = () => request<Project[]>(`/${URL}/featured`);

const findAllNotFeatured = (page?: number | string | null) => {
    const searchParams: SearchParamsRecord = {};

    if (isNotNullOrUndefined(page)) {
        searchParams.page = page.toString();
    }

    searchParams.size = "6";

    return request<Page<Project>>(`/${URL}/not-featured`, searchParams);
};

const findAllNotFeaturedFromNext = (page?: number) => {
    const searchParams: SearchParamsRecord = {};

    if (isNotNullOrUndefined(page)) {
        searchParams.page = page.toString();
    }

    return request<Page<Project>>(`/api/${URL}/not-featured`, searchParams, {
        fetchFromNext: true
    });
};

export const ProjectService = {
    findAllFeatured,
    findAllNotFeatured,
    findAllNotFeaturedFromNext
};
