import type { ParamsRecord } from "@/types/utils";
import type { NextRequest, NextResponse } from "next/server";

export type PropsWithParams<
    P = never,
    R extends ParamsRecord = never,
    S extends ParamsRecord = never
> = P & Params<R> & SearchParams<S>;

export type Params<P extends ParamsRecord = never> = {
    params: P;
};

export type SearchParams<P extends ParamsRecord = never> = {
    searchParams: P;
};

export type RouteHandler<P extends ParamsRecord = never> = (req: NextRequest, params: Params<P>) => Promise<NextResponse> | NextResponse;
