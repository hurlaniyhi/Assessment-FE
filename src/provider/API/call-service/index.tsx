import React, { useContext } from 'react'
import VisibilityContext from 'src/provider/state-manager/visibilityProvider'
import AppInfoContext from 'src/provider/state-manager/appInfoProvider'
import apiCaller from '../interceptor'
import { catchErrMsg, erroMessage, requestMessage } from 'src/utils/utility'
import { IUserData } from 'src/model'


const ApiContext = React.createContext<any>(null)

export const ApiProvider = (props: any) => {
    const {loader, notifier} = useContext(VisibilityContext)
    const {info, setInfoProperty} = useContext(AppInfoContext)
   
    async function getUserById(id: number) {
        try {
            loader(true)
            const { data } = await apiCaller.get('fetchCompanyById', {
                params: {id}
            })
            loader(false)

            if (data.status === 'error') {
                notifier.show(requestMessage(data))
                return null
            }
            else {
                setInfoProperty('profile', data.data)
                return data.data
            }
        }
        catch (err: any) {
            loader(false)
            notifier.show(erroMessage(catchErrMsg(err)))
            return null
        }
    }

    async function getUsers() {
        try {
            loader(true)
            const { data } = await apiCaller.get('fetchCompanies')
            loader(false)

            if (data.status === 'error') {
                notifier.show(requestMessage(data))
                return null
            }
            else {
                setInfoProperty('companies', data.data)
                return data.data
            }
        }
        catch (err: any) {
            loader(false)
            notifier.show(erroMessage(catchErrMsg(err)))
            return null
        }
    }

    async function addUserData(payload: IUserData) {
        try {
            loader(true)
            const { data } = await apiCaller.post('createCompany', payload)
            loader(false)

            if (data.status === 'error') {
                notifier.show(requestMessage(data))
                return null
            }
            else {
                setInfoProperty('profile', data.data)
                return data.data
            }
        }
        catch (err: any) {
            loader(false)
            notifier.show(erroMessage(catchErrMsg(err)))
            return null
        }
    }


    async function updateUserData(payload: IUserData) {
        try {
            loader(true)
            const { data } = await apiCaller.put(`/editCompany/${payload._id}`, payload)
            loader(false)

            if (data.status === 'error') {
                notifier.show(requestMessage(data))
                return null
            }
            else {
                setInfoProperty('profile', data.data)
                return data.data
            }
        }
        catch (err: any) {
            loader(false)
            notifier.show(erroMessage(catchErrMsg(err)))
            return null
        }
    }

    const callActions = {
        getUserById,
        getUsers,
        addUserData,
        updateUserData
    }

    return (
        <ApiContext.Provider value={{API: callActions}} >
            {props.children}
        </ApiContext.Provider>
    )
}

export default ApiContext
