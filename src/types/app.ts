export type Falsy = false | 0 | "" | null | undefined;

export type PaginationState<E> = {
    data: E[];
    page: number;
    isLastPage: boolean;
    isLoadingMore: boolean;
};
