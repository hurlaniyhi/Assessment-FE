import './style.scss'
import { useContext, useEffect, useState } from 'react'
import utility from 'src/utils/utility'
import { useNavigate } from 'react-router-dom'
import ApiContext from 'src/provider/API/call-service'
import { AbsoluteContainer, AppSpan, AppText, AppTitle, Button, CustomContainer, FlexColumn, FlexRow, GridContainer } from 'src/style'
import { UserComparison, UserDetails } from 'src/component'
import { FiLogOut, FiUser } from 'react-icons/fi'
import { IUserData } from 'src/model'
//import {users} from 'src/utils/mockData'

const AdminView: React.FC = () => {
    const navigate = useNavigate()
    const {API} = useContext(ApiContext)
    const [users, setUsers] = useState<Array<IUserData>|null>(null)
    const [toggleInfoDisplay, setToggleInfoDisplay] = useState<any>({})
    const [showComparison, setShowComparison] = useState(false)

    useEffect(() => {
        handleFetchUsers()
    }, [])

    async function handleFetchUsers() {
        const response = await API.getUsers()
        if (response) setUsers(response)
    }

    
    return (
        <>
            <GridContainer
                height='100' hUnit='%' 
            >
                <CustomContainer
                    padding='4' bgColor='#ffffff' width='45'
                    radius='1.2' bottomPadding='3' minHeight='20'
                    topPadding='5' height='95' hUnit='%'
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
                    <GridContainer>
                        <AppTitle align='center' textSize='2.5' fontWeight='600'>All Users</AppTitle>
                        <AppSpan color='rgba(0,0,0, 0.5)'>Click a user to view details</AppSpan>     
                    </GridContainer>
                       
                    { users ?
                        <CustomContainer 
                            topMargin='2' bottomMargin='2' overflow='auto'
                            className='user-list-content-wrapper'
                        >   
                            {
                                users?.map((item: IUserData, index: number) => {
                                    const bgColor = toggleInfoDisplay[index] ? '#E7F6F5' : '#ffffff'
                                    const borderColor = toggleInfoDisplay[index] ? '#0D968F' : '#EAECF0'
                                    const color = toggleInfoDisplay[index] ? '#085B56' : '#344054'
                                    return (
                                        <CustomContainer key={index}>
                                            <GridContainer 
                                                padding='1' height='5' radius='0.8' leftPadding='2'
                                                rightPadding='2' borderColor={borderColor} 
                                                bgColor={bgColor} topMargin='1.5'
                                                className='user-name-wrapper'
                                                onClick={() => setToggleInfoDisplay({...toggleInfoDisplay, [index]: !toggleInfoDisplay[index]})}
                                            >
                                                <FlexRow>
                                                    <AppSpan textSize='1.7' color={color}>
                                                        <FiUser />
                                                    </AppSpan>
                                                    <AppText color={color} fontWeight='600' leftMargin='1.5'>{item.name}</AppText>
                                                </FlexRow>
                                            </GridContainer>
                                            { toggleInfoDisplay[index] &&
                                                <CustomContainer topMargin='2' bottomMargin='2'>
                                                    <UserDetails data={item}/>
                                                </CustomContainer>
                                            }
                                        </CustomContainer>
                                    )
                                })
                            }
                            { users.length > 1 &&
                                <GridContainer alignItems='end' topMargin='3'>
                                    <Button
                                        width='14' height="4" borderColor='#0D968F'
                                        hoverBgColor='#ffffff' hoverColor='#0D968F'
                                        onClick={() => setShowComparison(true)}
                                    >
                                        Compare Users
                                    </Button>
                                </GridContainer>
                            }
                        </CustomContainer>
                        :
                        <FlexColumn minHeight='40'>
                            <AppTitle align='center' textSize='2.5' fontWeight='600'>Hi, Ridwan, Welcome</AppTitle>
                            <AppSpan color='rgba(0,0,0, 0.5)'>No user record is found</AppSpan>
                        </FlexColumn>
                    }
                </CustomContainer>
            </GridContainer>
            { showComparison &&
                <UserComparison
                    data={users}
                    close={() => setShowComparison(false)}
                />
            }
        </>
    )       
}

export default utility.routeData('admin-view', 'AdminView', <AdminView/>)