import './style.scss'
import { useState } from 'react'
import utility from 'src/utils/utility'
import { useNavigate } from 'react-router-dom'
import { AbsoluteContainer, AppSpan, AppTitle, Button, CustomContainer, Form, FormGroup, GridContainer } from 'src/style'
import { AddDetails, UserDetails } from 'src/component'
import { FiLogOut } from 'react-icons/fi'


const UserView: React.FC = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState<any>([])
    const [showAddDetails, setShowAddDetails] = useState(false)
    
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
                            onClick={() => navigate('/')}
                        >
                            <FiLogOut />
                        </Button>
                    </AbsoluteContainer>
                    { userData ?
                        <CustomContainer>
                            <AppTitle align='center' textSize='2.5' fontWeight='600'>My Account</AppTitle>
                            <CustomContainer topMargin='2'>
                                <UserDetails/>
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
                            <AppTitle align='center' textSize='2.5' fontWeight='600'>Hi, Ridwan, Welcome</AppTitle>
                            <Button
                                width='15' topMargin='3'
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
                    data={userData}
                    close={() => setShowAddDetails(false)}
                />
            }
        </>
    )       
}

export default utility.routeData('user-view', 'UserView', <UserView/>)