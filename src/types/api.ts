export interface RevalidateRequest {
    path?: string;
    secret?: string;
}

export interface RevalidateResponse {
    revalidated: boolean;
    timestamp: string;
}
