import './style.scss'
import utility from 'src/utils/utility'
import { useNavigate } from 'react-router-dom'
import { AppSpan, AppTitle, Button, CustomContainer, Form, FormGroup, GridContainer } from 'src/style'


const SignIn: React.FC = () => {
    const navigate = useNavigate()

    function handleLogin() {
        navigate('/user/user-view')
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
                            name='email'
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Password</label>
                        <input
                            placeholder='***********'
                            name='password'
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