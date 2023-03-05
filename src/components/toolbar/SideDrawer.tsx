import React from 'react'
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai'
import { IconContext } from "react-icons/lib";

interface SideDrawerProps {
open: boolean;
closeModal: () => void;
children: React.ReactNode;
}

export const SideDrawer = ({
    open,
    closeModal,
    children

}:SideDrawerProps) => {

    const { isMobile } = useCheckInMobile()
    const adjustSize = (size: string, mobile_size: string) => {
        return isMobile ? mobile_size : size
    }
    interface ModalStyles {
        overlay: React.CSSProperties,
        content: React.CSSProperties
    }
    const customStyles: ModalStyles = {
        overlay: {
            position: 'fixed',
            zIndex: 9999999,
            top:0,
            left:0,
            right:0,
            bottom:0,
            // backgroundColor: styles?.overlay_bg_color ?? 'rgba(255, 255, 255, 0.75)',

        },
        content: {
            position: 'absolute',
            minWidth: '300px',
            top:0,
            bottom:0,
            left:0,
            right:'auto',
            overflow: 'hidden',
            WebkitOverflowScrolling: 'touch',
            border:'',
            // borderRadius: styles?.content_border_radius ?? '5%',
            outline: 'none',
            // backgroundColor: styles?.content_bg_color ?? "",

        }
    };




return (

        <Modal
            isOpen={open}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={true}
            appElement={document.getElementById('root') as HTMLElement}
            style={customStyles}
            // closeTimeoutMS={delay*1000}
            contentLabel="Sidebabr Modal"


        >
            <div onClick={(event) => event.stopPropagation()}
                className="fixed right-[2%] top-[2%] w-full flex justify-end">
                <IconContext.Provider value={{ size: '20' }}>
                    <AiOutlineClose onClick={closeModal} />
                </IconContext.Provider>
            </div>

            <div onClick={(event) => event.stopPropagation()}
                className="h-full w-full  scroll-bar">
                {children}
            </div>

        </Modal>

);
}


const useCheckInMobile = () => {
    const [width, setWidth] =
        React.useState<number>(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    React.useEffect(() => {
        window.addEventListener(
            "resize",
            handleWindowSizeChange
        );
        return () => {
            window.removeEventListener(
                "resize",
                handleWindowSizeChange
            );
        };
    }, []);

    const isMobile = width <= 700;
    return { width, isMobile };
};
