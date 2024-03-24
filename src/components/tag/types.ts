export interface ITagCreate {
    name: string;
    description: string;
}

export interface ITagItem {
    id: number;
    name: string;
    description: string;
}

export interface IGetTags {
    slice: any;
    content: ITagItem[],
    totalElements: number
}

export interface ITagEdit {
    id: number;
    name: string;
    description: string;
}

export interface ITagSearch{
    name: string,
    page: number,
    size: number
}