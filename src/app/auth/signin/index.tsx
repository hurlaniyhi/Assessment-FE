import './style.scss'
import { useContext, useState } from 'react'
import utility from 'src/utils/utility'
import { useNavigate } from 'react-router-dom'
import AppInfoContext from 'src/provider/state-manager/appInfoProvider'
import VisibilityContext from 'src/provider/state-manager/visibilityProvider'
import { AppSpan, AppTitle, Button, CustomContainer, Form, FormGroup, GridContainer } from 'src/style'


const SignIn: React.FC = () => {
    const navigate = useNavigate()
    const {setInfoProperty} = useContext(AppInfoContext)
    const {notifier} = useContext(VisibilityContext)
    const [input, setInput] = useState({email: '', password: ''})

    function handleInput (e:React.ChangeEvent<HTMLInputElement>) {
        setInput({...input, [e.target.name]: e.target.value})
    }

    async function handleLogin(e: React.FormEvent<HTMLButtonElement | HTMLFormElement>) {
        e.preventDefault()
        const {isSuccessful, data} = await utility.mockLogin(input)
        if (!isSuccessful) return notifier.show('Invalid email or password')

        await Promise.all([
            setInfoProperty('token', data.id),
            setInfoProperty('userData', data)
        ])
        if (data.userId === '1') navigate('/user/admin-view')
        else navigate('/user/user-view')
    }
    
    return (
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
    )       
}

export default utility.routeData('/', 'SignIn', <SignIn/>)