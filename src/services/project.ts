import { request } from "@/services/client";
import type { Page, Project } from "@/types/entities";

const URL = "project";

const findAllFeatured = () => request<Project[]>(`/${URL}/featured`);

const findAllNotFeaturedPaginated = (page?: number) => request<Page<Project>>(`/${URL}/not-featured/paginated`, page !== undefined
    ? { page: page.toString() }
    : undefined
);

export const ProjectService = {
    findAllFeatured,
    findAllNotFeaturedPaginated
};
