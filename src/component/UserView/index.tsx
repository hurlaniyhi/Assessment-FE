import './style.scss'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppInfoContext from 'src/provider/state-manager/appInfoProvider'
import ApiContext from 'src/provider/API/call-service'
import { AbsoluteContainer, AppTitle, Button, CustomContainer, GridContainer } from 'src/style'
import { UserDetails } from 'src/component'
import { AddDetails } from 'src/popup'
import { FiLogOut } from 'react-icons/fi'
import { IUserData } from '@src/model'


export const UserView: React.FC = () => {
    const navigate = useNavigate()
    const {API} = useContext(ApiContext)
    const {info: {userData}, logout} = useContext(AppInfoContext)
    const [userDetails, setUserDetails] = useState<any>(null)
    const [showAddDetails, setShowAddDetails] = useState(false)

    useEffect(() => {
        if (userData?.uid) handleFetchUserDetails()
    }, [userData])

    async function handleFetchUserDetails() {
        const response = await API.getUserByAdminId(userData?.uid)
        if (response) setUserDetails(response)
    }

    async function handleLogout() {
        await logout()
        navigate('/')
    }
    
    return (
        <>
            <GridContainer
                height='100' hUnit='%' 
            >
                <CustomContainer
                    padding='4' bgColor='#ffffff' width='45'
                    radius='1.2' bottomPadding='3' minHeight='20'
                    topPadding='5'
                    shadow='0px 4px 8px 0px rgba(16, 24, 40, 0.1)'
                    className='form-wrapper'
                >
                    <AbsoluteContainer top='1' right='1.5'>
                        <Button
                            width='4' height='4' radius='10' bgColor='#ffffff'
                            hoverBgColor='#FB4E4E' hoverColor='#ffffff'
                            titleSize='2' bottomPadding='0.5' color='#FB4E4E'
                            onClick={handleLogout}
                        >
                            <FiLogOut />
                        </Button>
                    </AbsoluteContainer>
                    { userDetails ?
                        <CustomContainer>
                            <AppTitle align='center' textSize='2.5' fontWeight='600'>My Account</AppTitle>
                            <CustomContainer topMargin='2'>
                                <UserDetails data={userDetails}/>
                                <GridContainer>
                                    <Button
                                        width='10' topMargin='3'
                                        borderColor='#0D968F' height='4'
                                        hoverBgColor='#ffffff' hoverColor='#0D968F'
                                        onClick={() => setShowAddDetails(true)}
                                    >
                                        Edit Data
                                    </Button>
                                </GridContainer>
                            </CustomContainer>
                        </CustomContainer>
                        :
                        <GridContainer>
                            <AppTitle align='center' textSize='2.5' fontWeight='600'>Hi {userDetails?.name || userData?.email}, Welcome</AppTitle>
                            <Button
                                width='16' topMargin='3'
                                borderColor='#0D968F' height='4'
                                hoverBgColor='#ffffff' hoverColor='#0D968F'
                                onClick={() => setShowAddDetails(true)}
                            >
                                Add Company Data
                            </Button>
                        </GridContainer>
                    }
                </CustomContainer>
            </GridContainer>
            { showAddDetails &&
                <AddDetails
                    data={userDetails}
                    getCurrentData={(data: IUserData) => setUserDetails(data)}
                    close={() => setShowAddDetails(false)}
                />
            }
        </>
    )       
}
