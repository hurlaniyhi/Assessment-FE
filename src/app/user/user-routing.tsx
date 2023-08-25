import { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AppInfoContext from 'src/provider/state-manager/appInfoProvider'
import './user.scss'

export const UserRoutes = () => {
    const navigate = useNavigate()
    const {recoverStatesData} = useContext(AppInfoContext)
    const [authToken, setAuthToken] = useState('')

    useEffect(() => {
        recoverStatesData()
        handleAuthResolve()
    }, [])

    async function handleAuthResolve() {
        const token = await localStorage.getItem('token')
        if (token) setAuthToken(token)
        else navigate('/')
    }
    
    return (
        <>
            { authToken ?
                <div className="user-container">
                    <div className="user-modules">
                        <Outlet/>
                    </div>
                </div>
                :
                null
            }
        </>
    )
}

export default {
    routeProps: {
        path: 'user',
        element: <UserRoutes/>
    },
    name: 'User'
}