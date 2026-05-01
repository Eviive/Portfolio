export interface Project {
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
}

export interface Skill {
    id: number;
    name: string;
    sort: number;
    image: Image;
}

export interface Image {
    id: number;
    uuid?: string;
    altEn: string;
    altFr: string;
}

export interface Page<T> {
    content: T[];
    page: PageInfos;
}

interface PageInfos {
    number: number;
    size: number;
    numberOfElements: number;
    hasContent: boolean;
    first: boolean;
    last: boolean;
    next: boolean;
    previous: boolean;
    totalPages: number;
    totalElements: number;
}
