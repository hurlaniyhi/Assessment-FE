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

export interface AuthModel {
    email: string,
    password: string,
}

export interface ValidatorResponse {
    isValidated: boolean,
    message: string
}

export interface IUser {
    email: string,
    password: string,
    id: string,
    userId: string
}

export interface IUserData {
    name: string,
    numberOfUsers: number,
    numberOfproducts: number,
    percentage: number,
    companyAdminId?: string,
    _id?: string,
    logo?: string
}