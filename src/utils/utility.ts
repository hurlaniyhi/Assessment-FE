import { ReactElement } from "react"
import { IUser, RouteData } from "src/model"
import { userCredentials } from 'src/utils/mockData'
import access from "./localAccess"

const routeData = (path: string, name: string, component: ReactElement<any, any>): RouteData => {
    return { 
        routeProps: {
            path,
            element: component
        },
        name
    }
}

export const erroMessage = (text: any) => {
    const isOnline = access.getInternetStatus()
    return !isOnline ? 'No Internet Connection' : `Message: ${text || 'An error occured'}`
}

export const requestMessage = (resp: any, text = '') => {
    return resp.message || text || 'Something went wrong'
}

export const catchErrMsg = (err: any) => {
    let message = err?.response?.data?.message
    
    if (err.response?.status === 500) message = 'Something went wrong (Server)'
    return message 
}

export const countFormat = (val: number|string) => {
    var formatter = new Intl.NumberFormat('en-US')
    return formatter.format(Number(val))
}

const mockLogin = (payload: {email: string, password: string}) => {
    let isSuccessful = false
    let data = <IUser>{};

    for (let user of userCredentials) {
        if (user.email === payload.email && user.password === payload.password) {
            data = user
            isSuccessful = true
            break
        }
    }
    
    return {
        isSuccessful,
        data
    }
}

export default {
    routeData,
    mockLogin
}