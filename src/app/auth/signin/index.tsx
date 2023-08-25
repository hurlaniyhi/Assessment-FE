import './style.scss'
import { useContext, useEffect, useState } from 'react'
import utility from 'src/utils/utility'
import { useNavigate } from 'react-router-dom'
import AppInfoContext from 'src/provider/state-manager/appInfoProvider'
import VisibilityContext from 'src/provider/state-manager/visibilityProvider'
import { AppTitle, Button, CustomContainer, Form, FormGroup, GridContainer } from 'src/style'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from 'src/provider/config/firebase.config'


const SignIn: React.FC = () => {
    const navigate = useNavigate()
    const {setInfoProperty} = useContext(AppInfoContext)
    const {notifier, loader} = useContext(VisibilityContext)
    const [input, setInput] = useState({email: '', password: ''})
    const [authToken, setAuthToken] = useState('1')

    useEffect(() => {
        handleAuthResolve()
    }, [])

    async function handleAuthResolve() {
        const token = await localStorage.getItem('token')
        if (token) navigate('/user/home')
        else setAuthToken('')
    }

    function handleInput (e:React.ChangeEvent<HTMLInputElement>) {
        setInput({...input, [e.target.name]: e.target.value})
    }

    async function handleLogin(e: React.FormEvent<HTMLButtonElement | HTMLFormElement>) {
        e.preventDefault()

        try {
            loader(true)
            const {user} = await signInWithEmailAndPassword(auth, input.email, input.password)
            loader(false)
            if (user) {
                console.log({userDetails: user})
                const token = await user.getIdToken()
                await Promise.all([
                    setInfoProperty('token', token),
                    setInfoProperty('userData', user)
                ])
                navigate('/user/home')
            }
        }
        catch (err: any) {
            loader(false)
            console.log({firebaseError: err.message})
            notifier.show(err.message)
        }
    }
    
    return (
        <>
            { !authToken ?
                <GridContainer
                    height='100' hUnit='%' 
                >
                    <CustomContainer
                        padding='4' bgColor='#ffffff' width='45'
                        radius='1.2' bottomPadding='3'
                        shadow='0px 4px 8px 0px rgba(16, 24, 40, 0.1)'
                        className='form-wrapper'
                    >
                        <AppTitle align='center' textSize='2.5' fontWeight='600'>Login</AppTitle>
                        <Form topMargin='3' onSubmit={handleLogin}>
                            <FormGroup>
                                <label>Email</label>
                                <input
                                    placeholder='Enter your email'
                                    type='email'
                                    name='email'
                                    value={input.email}
                                    onChange={handleInput}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Password</label>
                                <input
                                    placeholder='***********'
                                    type='password'
                                    name='password'
                                    value={input.password}
                                    onChange={handleInput}
                                    required
                                />
                            </FormGroup>
                            <Button
                                width='100' sizeUnit='%' topMargin='3'
                                borderColor='#0D968F' titleSize='1.6'
                                hoverBgColor='#ffffff' hoverColor='#0D968F'
                            >
                                Sign in
                            </Button>
                        </Form>
                    </CustomContainer>
                </GridContainer>
                :
                null
            }
        </>
    )       
}

export default utility.routeData('/', 'SignIn', <SignIn/>)