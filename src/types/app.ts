export type Falsy = false | 0 | 0n | "" | null | undefined;

export type PaginationState<E> = {
    data: E[];
    page: number;
    isLastPage: boolean;
    isLoadingMore: boolean;
};
