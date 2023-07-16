import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type RevalidateRequest = {
    path?: string;
    secret?: string;
};

type RevalidateResponse = {
    revalidated: boolean;
    timestamp: number;
};

export const POST = async (req: NextRequest): Promise<NextResponse<RevalidateResponse>> => {
    let reqBody: RevalidateRequest;

    try {
        reqBody = await req.json();
    } catch (error) {
        return NextResponse.json({
            revalidated: false,
            timestamp: Date.now()
        }, {
            status: 400,
            statusText: "Bad Request"
        });
    }

    if (!process.env.REVALIDATE_SECRET || reqBody.secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({
            revalidated: false,
            timestamp: Date.now()
        }, {
            status: 401,
            statusText: "Unauthorized"
        });
    }

    revalidatePath(reqBody.path ?? "/");

    return NextResponse.json({
        revalidated: true,
        timestamp: Date.now()
    });
};
