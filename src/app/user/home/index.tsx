import './style.scss'
import { useContext, useEffect, useState } from 'react';
import utility from 'src/utils/utility'
import AppInfoContext from 'src/provider/state-manager/appInfoProvider';
import { AdminView, UserView } from 'src/component';

const Home: React.FC = () => {
    const {info: {userData}} = useContext(AppInfoContext)
    const [userType, setUserType] = useState('')

    useEffect(() => {
        setUserType(userData.userId)
    }, [userData])

    return (
        <>
            {
                userType === '1' ?
                    <AdminView />
                    : userType ? 
                        <UserView />
                        : null
            }
        </>
    );
}

export default utility.routeData('home', 'User Home', <Home/>)