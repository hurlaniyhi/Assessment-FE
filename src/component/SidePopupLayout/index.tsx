import { Button, FlexRow, SidePopup, SidePopupContainer } from "src/style";
import { RiCloseFill } from "react-icons/ri";

export const SidePopupLayout: React.FC<any> =({children, overflow, close}) => {
    
    return (
        <>
            <SidePopupContainer onClick={close} />
            <SidePopup data-aos="slide-left" overflow={overflow || 'auto'}>
                <FlexRow justifyContent="flex-end" bottomMargin="3">
                    <Button 
                        titleSize="2" fontWeight="500"
                        width='3.5' shadow='none'
                        height='3.5'
                        radius='0.6'
                        bgColor='#ffffff'
                        hoverBgColor='rgba(234, 236, 240, 0.5)'
                        borderColor='none'
                        color='#000000'
                        //hoverColor='#B42318'
                        onClick={close}
                    >
                        <RiCloseFill style={{fontSize: '2.5rem', marginBottom: '0.3rem'}} />
                    </Button> 
                </FlexRow>
                {children}
            </SidePopup>
        </>
    )
}