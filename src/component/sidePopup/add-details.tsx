import { useContext, useEffect, useState } from "react"
import ApiContext from "src/provider/API/call-service"
import AppInfoContext from "src/provider/state-manager/appInfoProvider"
import { AppTitle, Button, CustomContainer, Form, FormGroup, GridContainer } from "src/style"
import { SidePopupLayout } from "src/component"
import { IUserData } from "@src/model"

export const AddDetails: React.FC<any> = ({data, getCurrentData, close}) => {
    const {API} = useContext(ApiContext)
    const {info: {userData}} = useContext(AppInfoContext)
    const [input, setInput] = useState({
        name: '', numberOfUsers: '', 
        numberOfProducts: '', percentage: ''
    })
    
    useEffect(() => {
        if (data) setInput(data)
    }, [])

    useEffect(() => {
        const {numberOfProducts, numberOfUsers} = input
        if (numberOfProducts && numberOfUsers) {
            const percentage = ((Number(numberOfProducts) / Number(numberOfUsers)) * 100).toFixed(3)
            setInput({
                ...input, 
                percentage: String(percentage)
            })
        }
    }, [input.numberOfUsers, input.numberOfProducts])

    function handleInput (e:React.ChangeEvent<HTMLInputElement>) {
        setInput({...input, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e: React.FormEvent<HTMLButtonElement | HTMLFormElement>) {
        e.preventDefault()
        const response = data ? 
            await API.updateUserData(input)
            : await API.addUserData({...input, companyAdminId: userData.uid})

        if (response) getCurrentData(response)
        close()
    }

    return (
        <SidePopupLayout close={close}>
            <AppTitle textSize="2.2" fontWeight="700">{data ? 'Update' : 'Add'} Company Details</AppTitle>
            <CustomContainer topMargin="2.5">
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <label>Name</label>
                        <input
                            placeholder='Enter Name'
                            name='name'
                            value={input.name}
                            onChange={handleInput}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Number Of Users</label>
                        <input
                            placeholder='Enter your No. of Users'
                            type='number'
                            name='numberOfUsers'
                            value={input.numberOfUsers}
                            onChange={handleInput}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Number Of Products</label>
                        <input
                            placeholder='Enter your No. of Products'
                            type='number'
                            name='numberOfProducts'
                            value={input.numberOfProducts}
                            onChange={handleInput}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Percentage</label>
                        <input
                            placeholder='Enter Percentage'
                            type='number'
                            name='percentage'
                            value={input.percentage}
                            onChange={handleInput}
                            disabled
                            required
                        />
                    </FormGroup>
                    <GridContainer alignItems="end">
                        <Button
                            width='10' height="4" borderColor='#0D968F'
                            hoverBgColor='#ffffff' hoverColor='#0D968F'
                        >
                            {data ? 'Update' : 'Submit'}
                        </Button>
                    </GridContainer>
                </Form>
            </CustomContainer>
        </SidePopupLayout>
    )
}