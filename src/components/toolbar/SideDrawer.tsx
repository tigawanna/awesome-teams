import React from 'react'
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai'
import { IconContext } from "react-icons/lib";
import { TheIcon } from '../../shared/wrappers/TheIcon';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
            minWidth: '200px',
            top:0,
            bottom:0,
            left:0,
            right:'auto',
            overflow: 'hidden',
            WebkitOverflowScrolling: 'touch',
            border:'',
            // borderRadius: styles?.content_border_radius ?? '5%',
            outline: 'none',
            backgroundColor: '',
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
        <div className=" flex justify-start items-center fixed top-[1%] left-[2%] z-50 gap-3">
            <TheIcon Icon={FaBars} iconAction={() => closeModal()} size='30px' />
            <Link to='/' className='text-2xl font-bold'>AWESOME</Link>
        </div>
            <div onClick={(event) => event.stopPropagation()}
                className="fixed right-[2%] top-[2%] w-full flex justify-end">
                <IconContext.Provider value={{ size: '20' }}>
                    <AiOutlineClose onClick={closeModal} />
                </IconContext.Provider>
            </div>

            <div onClick={(event) => event.stopPropagation()}
                className="h-full w-[70%] md:w-[20%]
                fixed left-0 right-auto top-[8%] ">
                {children}
            </div>

        </Modal>

);
}




