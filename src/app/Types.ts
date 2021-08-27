export type Login = {
    user: User;
}

export type User = {
    id: string;
    email: string;
    name: string;
}

export type Place = {
    id: string;
    name: string;
}

export type Lock = {
    id: string;
    name: string;
    open: boolean;
    unlocked: boolean;
}

export type PlacePagination = {
    data: Place[];
    pagination: Pagination;
}

export type LockPagination = {
    data: Lock[];
    pagination: Pagination;
}

export type Pagination = {
    offset: number;
    limit: number;
    count: number;
}

export type Event = {
    id: string;
    createdAt: string;
    action: string;
    objectName: string;
    success: boolean;
    message: string;
}
