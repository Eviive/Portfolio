export type Project = {
    id: number;
    title: string;
    descriptionEn: string;
    descriptionFr: string;
    creationDate: string;
    repoUrl: string;
    demoUrl: string;
    featured: boolean;
    sort: number;
    skills: Skill[];
    image: Image;
};

export type Skill = {
    id: number;
    name: string;
    sort: number;
    image: Image;
};

export type Image = {
    id: number;
    uuid?: string;
    altEn: string;
    altFr: string;
};

export type Page<E> = {
    content: E[];
    pageable: {
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        offset: number;
        pageSize: number;
        pageNumber: number;
        paged: boolean;
        unpaged: boolean;
    };
    last: boolean;
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
};
