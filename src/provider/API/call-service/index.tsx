import React, { useContext } from 'react'
import VisibilityContext from 'src/provider/state-manager/visibilityProvider'
import AppInfoContext from 'src/provider/state-manager/appInfoProvider'
import apiCaller from '../interceptor'
import { catchErrMsg, erroMessage, requestMessage } from 'src/utils/utility'
import { IUserData } from 'src/model'
import axios from 'axios'


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

    async function uploadToCloudinary (data: any, cloudName: string, id: string) {
        try {
            loader(true)
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, data)
            loader(false)
            console.log({imageurl: response.data})
            return updateUserData({_id: id, logo: response.data.secure_url})
        }
        catch (err: any) {
            loader(false)
            notifier.show(`Document could not be uploaded`)
            return null
        }
    }

    const callActions = {
        getUserById,
        getUsers,
        addUserData,
        updateUserData,
        uploadToCloudinary
    }

    return (
        <ApiContext.Provider value={{API: callActions}} >
            {props.children}
        </ApiContext.Provider>
    )
}

export default ApiContext
