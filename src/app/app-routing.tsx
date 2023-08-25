import { useEffect, useContext } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import AppInfoContext from 'src/provider/state-manager/appInfoProvider'
import AOS from 'aos'
import 'aos/dist/aos.css'
import modules from 'src/app/app-module'
import userModules from 'src/app/user/user-module'
import Home from 'src/app/user/home'
import { ActivityStatus } from 'src/component'

export const AppRoutes = () => {

    const {recoverStatesData} = useContext(AppInfoContext)

    useEffect(() => {
        AOS.init({
            duration: 300,
            delay: 20,
            easing: 'linear'
        })
    }, [])

    useEffect(() => {
        recoverStatesData()
    }, [])

    return (
        <>
            <ActivityStatus />
            <Router>
                <Routes>
                    {
                        modules.map(module => (
                            module.name === 'User' ? 
                                <Route {...module.routeProps} key={module.name} >
                                    {
                                        userModules.map(userModule => (
                                            <Route {...userModule.routeProps} key={userModule.name}  />
                                        ))
                                    } 
                                      <Route index element={Home.routeProps.element} />
                                </Route> 
                            :
                                <Route {...module.routeProps} key={module.name}  />
                        ))
                    }
                    <Route path="*" element={<Navigate to="/" />}/>
                </Routes>
            </Router>
        </>
    )
}