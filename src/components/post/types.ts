export interface IPostCreate {
    title: string;
    shortDescription: string;
    description: string;
    meta: string;
    published: boolean;
    categoryId: number;
}

export interface IPostItem {
    id: number;
    title: string;
    shortDescription: string;
    description: string;
    meta: string;
    urlSlug: string;
    published: boolean;
    postedOn: Date;
    modified: Date;
    categoryId: number;
}

export interface IGetPosts {
    slice: any;
    content: IPostItem[],
    totalElements: number
}

export interface IPostEdit {
    id: number;
    title: string;
    shortDescription: string;
    description: string;
    meta: string;
    published: boolean;
    categoryId: number;
}

export interface IPostSearch{
    title: string,
    page: number,
    size: number
}