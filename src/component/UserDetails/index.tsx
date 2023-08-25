import { useContext, useEffect, useRef, useState } from "react"
import AppInfoContext from "src/provider/state-manager/appInfoProvider"
import { 
    AbsoluteContainer, AppSpan, AppText, Circle, 
    CustomContainer, FlexRow, GridContainer, Icon 
} from "src/style"
import { BsCamera } from 'react-icons/bs'
//import NoImg from 'src/assets/img/no-img.jpeg'
import UserIcon from 'src/assets/svg/user-icon'
import HandIcon from 'src/assets/svg/hand-icon'
import { countFormat, getUserType } from "src/utils/utility"
import { cloudinaryData } from "src/provider/config/constant"
import ApiContext from "src/provider/API/call-service"


export const UserDetails: React.FC<any> = ({data}) => {
    const {API} = useContext(ApiContext)
    const {info} = useContext(AppInfoContext)
    const [userData, setUserData] = useState<any>(null)
    const logoRef = useRef<any>(null)

    useEffect(() => {
        setUserData(data)
    }, [data])

    async function handleFile (e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files instanceof FileList) {
            const formData = new FormData()
            formData.append('file', e.target.files[0])
            formData.append('upload_preset', cloudinaryData.UPLOAD_PRESET)
            formData.append('cloud_name', cloudinaryData.CLOUND_NAME)

            const updatedData = await API.uploadToCloudinary(formData, cloudinaryData.CLOUND_NAME, data?._id)
            if (updatedData) setUserData(updatedData)
        }
    }
    
    return (
        <GridContainer>
            <Circle 
                size="15.3" overflow="hidden" bottomMargin="2.5" borderColor="#EAECF0"
                className="account-profile-pics"
                onClick={() => logoRef.current.click()}
            >
                { userData?.logo ?
                    <Icon src={userData.logo} minWidth='100' style={{objectFit: 'cover'}}/>
                    : (getUserType(info.userData.uid) === 'ADMIN' && <AppSpan>Click to Upload</AppSpan>)
                }
                { getUserType(info.userData.uid) === 'ADMIN' &&
                    <>
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
                        <input 
                            type="file" ref={logoRef} 
                            name='logo' 
                            onChange={handleFile} 
                            className="file-input" 
                        />
                    </>
                }
            </Circle>
            <CustomContainer 
                width="28.9" radius='1' borderColor="#E2E2E2" padding="1.5"
                className="account-data-container"
            >
                <FlexRow gap="1.5" width="25">
                    <UserIcon className='icon-component account-data-icon' />
                    <AppText fontWeight="600" color="#101828">{userData?.name}</AppText>
                </FlexRow>
                <FlexRow gap="1.5" width="25" topMargin="1.5">
                    <HandIcon className='icon-component account-data-icon' />
                    <AppText fontWeight="600" color="#101828">Number of Users: {countFormat(userData?.numberOfUsers)}</AppText>
                </FlexRow>
                <FlexRow gap="1.5" width="25" topMargin="1.5">
                    <HandIcon className='icon-component account-data-icon' />
                    <AppText fontWeight="600" color="#101828">Number of Product: {countFormat(userData?.numberOfProducts)}</AppText>
                </FlexRow>
                <FlexRow gap="1.5" width="25" topMargin="1.5">
                    <HandIcon className='icon-component account-data-icon' />
                    <AppText fontWeight="600" color="#101828">Percentage: {userData?.percentage}%</AppText>
                </FlexRow>
            </CustomContainer>
        </GridContainer>
    )
}