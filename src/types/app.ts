import type { EmptyRecord, ParamsRecord, SearchParamsRecord } from "@/types/utils";
import type { NextRequest, NextResponse } from "next/server";

export type PropsWithParams<
    P = EmptyRecord,
    R extends ParamsRecord = never,
    S extends SearchParamsRecord = never
> = P & Params<R> & SearchParams<S>;

export type Params<P extends ParamsRecord = never> = {
    params: P;
};

export type SearchParams<P extends SearchParamsRecord = never> = {
    searchParams: P;
};

export type RouteHandler<B = never, P extends ParamsRecord = never> = (req: NextRequest, params: Params<P>) => Promise<NextResponse<B>> | NextResponse<B>;
