import { ReactElement } from "react";

export interface RouteData {
    routeProps: RouteProps;
    name: string;
}

export interface RouteProps {
    path: string;
    element: ReactElement<any, any>
}

export interface Action<T> {
    type: string,
    payload: T
}

export interface KeyValuePayload {
    key: string,
    value: any
}

export interface IUser {
    email: string,
    password: string,
    id: string,
    uid: string
}

export interface IUserData {
    name?: string,
    numberOfUsers?: number,
    numberOfProducts?: number,
    percentage?: number,
    companyAdminId?: string,
    _id?: string,
    logo?: string
}