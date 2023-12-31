import { ProjectService } from "@/services";
import type { RouteHandler } from "@/types/app";
import type { Page, Project } from "@/types/entities";
import { NextResponse } from "next/server";

export const GET: RouteHandler<Page<Project>> = async req => {

    const page = req.nextUrl.searchParams.get("page");

    const projectsPage = await ProjectService.findAllNotFeaturedPaginated(page);

    return NextResponse.json(projectsPage);
};
