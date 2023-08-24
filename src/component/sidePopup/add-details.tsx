import { AppTitle, Button, CustomContainer, Form, FormGroup, GridContainer } from "src/style"
import { SidePopupLayout } from "src/component"

export const AddDetails: React.FC<any> = ({data, close}) => {
    return (
        <SidePopupLayout close={close}>
            <AppTitle textSize="2.2" fontWeight="700">{data ? 'Update' : 'Add'} Company Details</AppTitle>
            <CustomContainer topMargin="2.5">
                <Form>
                    <FormGroup>
                        <label>Name</label>
                        <input
                            placeholder='Enter your email'
                            name='email'
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Number Of Users</label>
                        <input
                            placeholder='Enter your No. of Users'
                            name='numberOfUsers'
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Number Of Products</label>
                        <input
                            placeholder='Enter your No. of Products'
                            name='numberOfProducts'
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Percentage</label>
                        <input
                            placeholder='Enter your No. of Products'
                            name='numberOfProducts'
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