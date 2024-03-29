import { ProfileMenu } from './ProfileMenu';
import { ReactModalWrapper } from './../../shared/wrappers/ReactModalWrapper';
import { TheIcon } from './../../shared/wrappers/TheIcon';
import { AppUser } from "../../utils/types/base";
import { useState } from 'react';
import { FaTasks, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { makeImageUrl } from '../../utils/pb/config';
import { MdNotifications, MdOutlineDashboard } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import { GrTest } from 'react-icons/gr';
import { useDarkTheme } from '../../utils/hooks/useDarkTheme';
import { useAlertStore } from '../../utils/zustand/alert';





interface NavElemetsProps {
user:AppUser
closeModal?: () => void
}

export const NavElemets = ({user,closeModal}:NavElemetsProps) => {



const [isOpen, setIsOpen] = useState(false);
const avatar = makeImageUrl('staff', user?.id as string, user?.avatar as string);
const {modeIcon,theme,toggleTheme} = useDarkTheme()

const alerts  = useAlertStore()



return (
    <div className='w-full mx-5 h-screen dark:text-white
    flex flex-col justify-start'>



        <ReactModalWrapper
            child={
            <ProfileMenu user={user} setIsOpen={setIsOpen} />}
            closeModal={() => setIsOpen(false)}
            isOpen={isOpen}

            styles={{
                overlay_top: '0%',
                overlay_right: '0%',
                overlay_left: '0%',
                overlay_bottom: '0%',
                content_bottom: '10%',
                content_right: '0%',
                content_left: '50%',
                content_top: '0%',
                
            

            }}
        />

        <div 
        onClick={() => closeModal?.()} 
        className="h-[50%] flex flex-col justify-evenly items-center gap-2
        rounded-xl  font-bold dark:font-normal ">
            <IconContext.Provider value={{
                size: '1.5rem',
            }}>
            <div className="w-full  flex justify-center items-center
            hover:text-blue-700">
                    <Link
                  
                    className='w-fit h-fit flex items-center justify-center gap-2'
                    to="/"><FaTasks/>
                    <h3 className='text-sm font-normal'>Tasks</h3>
                    </Link>
            </div>

            <div className="w-full   flex justify-center items-center
         hover:text-blue-700">
            <Link 
            className='w-fit h-fit flex items-center justify-center gap-2'
            to="/staff"><RiTeamFill/>
            <h3 className='text-sm font-normal'>Staff</h3>
            </Link>
            </div>


            <div className="w-full  flex justify-center items-center
         hover:text-blue-700">
                <Link 
                className='w-fit h-fit flex items-center justify-center gap-2'
                to="/portal"><MdOutlineDashboard/>
                        <h3 className='text-sm font-normal'>Portal</h3>
                </Link>
            </div>
                <div className="w-full  flex justify-center items-center
         hover:text-blue-700">
                    <Link
                        className='w-fit h-fit flex items-center justify-center gap-1'
                        to="/notification">
                            <MdNotifications />
                         {alerts.alert_count > 0 ?<div>{alerts.alert_count}</div>:null}
                        <h3 className='text-sm font-normal'>Alerts</h3>
                    </Link>
                </div>

            {/* <div className="w-full  flex justify-center items-center 
              hover:text-rose-700">
            <Link 
            className='w-fit h-fit flex items-center justify-center gap-2'
            to="/test"><GrTest/>
            <h3 className='text-sm font-normal'>Test</h3>
            </Link>
            </div> */}


            {/* <div className="w-full  h-full flex justify-center items-center 
      hover:text-rose-700">
                <Link to="/about">About</Link>
            </div> */}
        </IconContext.Provider>
        </div>

        <div className="h-[35%]   flex flex-col justify-end items-center">

            <div className="w-fit h-full p-1 mx-5 flex justify-center items-center   ">
                <TheIcon
                    Icon={modeIcon}
                    size={"30"}
                    iconAction={toggleTheme}
                />
            </div>
            <div className="  rounded-md  flex justify-center items-center w-16 h-full  aspect-square">
                {!avatar ? (
                    <TheIcon
                        Icon={FaUserCircle}
                        size={"25"}
                        color={""}
                        iconAction={() => setIsOpen(true)}
                        data-testid="open-user-menu"
                    />

                ) : (
                    <img
                        src={avatar}
                        alt={""}
                        data-testid="open-user-menu"
                        className="rounded-full  h-[40px] hover:border-accent
                        border-2 border-slate-900 dark:border-slate-100 aspect-square"
                        onClick={() => setIsOpen(true)}
                    />
                )}
            </div>
        </div>
 </div>
);
}


