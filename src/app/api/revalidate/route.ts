import { toLocalDate } from "@/libs/utils/date";
import type { RevalidateRequest, RevalidateResponse } from "@/types/api";
import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<NextResponse<RevalidateResponse>> => {
    let reqBody: RevalidateRequest;

    try {
        reqBody = await req.json();
    } catch (error) {
        return buildRevalidateResponse(false, {
            status: 400,
            statusText: "Bad Request"
        });
    }

    if (!process.env.REVALIDATE_SECRET || reqBody.secret !== process.env.REVALIDATE_SECRET) {
        return buildRevalidateResponse(false, {
            status: 401,
            statusText: "Unauthorized"
        });
    }

    revalidatePath(reqBody.path ?? "/");

    return buildRevalidateResponse(true);
};

const buildRevalidateResponse = (
    revalidated: boolean,
    init?: ResponseInit
): NextResponse<RevalidateResponse> => {
    return NextResponse.json(
        {
            revalidated,
            timestamp: toLocalDate(new Date()).toISOString()
        },
        init
    );
};
