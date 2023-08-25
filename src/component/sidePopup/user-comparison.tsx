import { AppSpan, AppText, AppTitle, CustomContainer, FlexRow, GridContainer } from "src/style"
import { SidePopupLayout } from "src/component"
import { countFormat, getCharToDispay } from "src/utils/utility"

export const UserComparison: React.FC<any> = ({data, close}) => {

    return (
        <SidePopupLayout close={close}>
            <CustomContainer>
                <AppTitle textSize="2.2" fontWeight="700">Users Comparison</AppTitle>
                <AppSpan color='rgba(0,0,0, 0.5)'>Scroll horizontally to see comparison</AppSpan> 
            </CustomContainer>

            <CustomContainer topMargin="5">
                <GridContainer className="x-scroll-container" overflow="auto">
                    <FlexRow>
                        <CustomContainer width="auto" rightMargin="1.5" topMargin="4">
                            <GridContainer 
                                padding="1" minHeight="5" alignItems="start"
                                bottomMargin="2"
                            >
                                <AppText color="#344054" fontWeight="600">Name</AppText>
                            </GridContainer>
                            <GridContainer 
                                padding="1" minHeight="5" alignItems="start"
                                bottomMargin="2"
                            >
                                <AppText color="#344054" fontWeight="600">Number of Users</AppText>
                            </GridContainer>
                            <GridContainer 
                                padding="1" minHeight="5" alignItems="start"
                                bottomMargin="2"
                            >
                                <AppText color="#344054" fontWeight="600">Number of Products</AppText>
                            </GridContainer>
                            <GridContainer 
                                padding="1" minHeight="5" alignItems="start"
                                bottomMargin="2"
                            >
                                <AppText color="#344054" fontWeight="600">Percentage</AppText>
                            </GridContainer>
                        </CustomContainer>
                        <CustomContainer width="22" rightMargin="1">
                            <AppTitle align="center" textSize="2" fontWeight="600">User A</AppTitle>
                            <CustomContainer 
                                borderColor="#EAECF0"
                                padding="3" topMargin="2"
                            >
                                <GridContainer 
                                    padding="1" radius="0.8" minHeight="5"
                                    bgColor="#E7F6F5" borderColor="#0D968F"
                                    bottomMargin="2"
                                >
                                    <AppText color="#085B56" fontWeight="600">{getCharToDispay(data[0]?.name, 18)}</AppText>
                                </GridContainer>
                                <GridContainer 
                                    padding="1" minHeight="5" bottomMargin="2"
                                >
                                    <AppText color="#0D968F" fontWeight="600" textSize="2">{countFormat(data[0]?.numberOfUsers)}</AppText>
                                </GridContainer>
                                <GridContainer 
                                    padding="1" radius="0.8" minHeight="5"
                                    bgColor="#E7F6F5" borderColor="#0D968F"
                                    bottomMargin="2"
                                >
                                    <AppText color="#085B56" fontWeight="600">{countFormat(data[0]?.numberOfProducts)}</AppText>
                                </GridContainer>
                                <GridContainer 
                                    padding="1" minHeight="5" bottomMargin="2"
                                >
                                    <AppText color="#344054" fontWeight="600" textSize="2">{data[0]?.percentage}%</AppText>
                                </GridContainer>
                            </CustomContainer>
                        </CustomContainer>
                        <CustomContainer width="22">
                            <AppTitle align="center" textSize="2" fontWeight="600">User B</AppTitle>
                            <CustomContainer 
                                borderColor="#EAECF0"
                                padding="3" topMargin="2"
                            >
                                <GridContainer 
                                    padding="1" minHeight="5" bottomMargin="2"
                                >
                                    <AppText color="#0D968F" fontWeight="600">{getCharToDispay(data[1]?.name, 18)}</AppText>
                                </GridContainer>
                                <GridContainer 
                                    padding="1" radius="0.8" minHeight="5"
                                    bgColor="#E7F6F5" borderColor="#0D968F"
                                    bottomMargin="2"
                                >
                                    <AppText color="#085B56">{countFormat(data[1]?.numberOfUsers)}</AppText>
                                </GridContainer>
                                <GridContainer 
                                    padding="1" minHeight="5" bottomMargin="2"
                                >
                                    <AppText color="#0D968F" fontWeight="600" textSize="2">{countFormat(data[1]?.numberOfProducts)}</AppText>
                                </GridContainer>
                                <GridContainer 
                                    padding="1" radius="0.8" minHeight="5"
                                    bgColor="#E7F6F5" borderColor="#0D968F"
                                    bottomMargin="2"
                                >
                                    <AppText color="#085B56">{data[1]?.percentage}%</AppText>
                                </GridContainer>
                            </CustomContainer>
                        </CustomContainer>
                    </FlexRow>
                </GridContainer>
            </CustomContainer>
        </SidePopupLayout>
    )
}