import { AbsoluteContainer, AppSpan, AppText, Circle, CustomContainer, FlexRow, GridContainer, Icon } from "src/style"
import { BsCamera } from 'react-icons/bs'
import NoImg from 'src/assets/img/no-img.jpeg'
import UserIcon from 'src/assets/svg/user-icon'
import HandIcon from 'src/assets/svg/hand-icon'
import { countFormat } from "src/utils/utility"

export const UserDetails: React.FC<any> = ({data}) => {
    return (
        <GridContainer>
            <Circle 
                size="15.3" overflow="hidden" bottomMargin="2.5" borderColor="#EAECF0"
                className="account-profile-pics"
            >
                <Icon src={NoImg} noResize minWidth='100' style={{objectFit: 'cover'}}/>
                {/* <AppSpan>Click to Upload</AppSpan> */}
                <AbsoluteContainer 
                    height="full" width="100" sizeUnit="%" 
                    top="0" left="0"
                >
                    <GridContainer 
                        height="100" hUnit="%" bgColor="rgba(0, 0, 0, 0.4)"
                        className="profile-pics-upload-icon"
                    >
                        <AppSpan textSize="3.5" color="#ffffff" hoverColor="#0D968F">
                            <BsCamera />
                        </AppSpan>
                    </GridContainer>
                </AbsoluteContainer>
            </Circle>
            <CustomContainer 
                width="28.9" radius='1' borderColor="#E2E2E2" padding="1.5"
                className="account-data-container"
            >
                <FlexRow gap="1.5" width="25">
                    <UserIcon className='icon-component account-data-icon' />
                    <AppText fontWeight="600" color="#101828">{data?.name}</AppText>
                </FlexRow>
                <FlexRow gap="1.5" width="25" topMargin="1.5">
                    <HandIcon className='icon-component account-data-icon' />
                    <AppText fontWeight="600" color="#101828">Number of Users: {countFormat(data?.numberOfUsers)}</AppText>
                </FlexRow>
                <FlexRow gap="1.5" width="25" topMargin="1.5">
                    <HandIcon className='icon-component account-data-icon' />
                    <AppText fontWeight="600" color="#101828">Number of Product: {countFormat(data?.numberOfProducts)}</AppText>
                </FlexRow>
                <FlexRow gap="1.5" width="25" topMargin="1.5">
                    <HandIcon className='icon-component account-data-icon' />
                    <AppText fontWeight="600" color="#101828">Percentage: {data?.percentage}%</AppText>
                </FlexRow>
            </CustomContainer>
        </GridContainer>
    )
}