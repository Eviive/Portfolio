export type RevalidateRequest = {
    path?: string;
    secret?: string;
};

export type RevalidateResponse = {
    revalidated: boolean;
    timestamp: string;
};
