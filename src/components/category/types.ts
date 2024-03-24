export interface ICategoryCreate {
    name: string;
    description: string;
}

export interface ICategoryItem {
    id: number;
    name: string;
    description: string;
}

export interface IGetCategories {
    slice: any;
    content: ICategoryItem[],
    totalElements: number
}

export interface ICategoryEdit {
    id: number;
    name: string;
    description: string;
}

export interface ICategorySearch{
    name: string,
    page: number,
    size: number
}