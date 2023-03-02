import { Outlet,useLocation,useNavigation } from 'react-router-dom';
import { Toolbar } from '../../components/toolbar/Toolbar';
import { useAuthGuard } from './../../utils/hooks/useAuthGuard';
import { AppUser } from '../../utils/types/base';
import { ReactProgress } from '../../shared/loaders/ReactProgress';
import { FaBars } from 'react-icons/fa';
import { TheIcon } from '../../shared/wrappers/TheIcon';
import { useState } from 'react';
import { ProfileMenu } from '../../components/toolbar/ProfileMenu';
import { ReactModalWrapper } from '../../shared/wrappers/ReactModalWrapper';
import { Sidebar } from '../../components/toolbar/Sidebar';



interface RootLayoutProps {
  user: AppUser;
 
}

export const RootLayout = ({user}: RootLayoutProps) => {
useAuthGuard(user,false)
const navigation = useNavigation()
const location = useLocation()

const [open,setOpen]=useState(false)

return (
    <div className="w-full min-h-screen  dark:bg-slate-900 flex ">
    
    <div className=" flex justify-start items-center fixed top-2 left-5 z-40 ">
      <TheIcon Icon={FaBars} iconAction={() => setOpen(true)} size='30px'/>
    </div>
    
    <ReactProgress isAnimating={navigation.state === "loading"} key={location.key} />

      
      <div
      className="h-screen w-[5%]  bg-[#724923] sticky top-0
         bg-opacity-70 dark:bg-opacity-90  p-1 
          text-white z-30"
      >
      <Toolbar user={user} />
   
      </div>
    <ReactModalWrapper
      child={<Sidebar user={user} setOpen={setOpen} />}
      closeModal={() => setOpen(false)}
      isOpen={open}
      styles={{
        overlay_top: '0%',
        overlay_right: '0%',
        overlay_left: '0%',
        overlay_bottom: '0%',
        content_bottom: '20%',
        content_right: '0%',
        content_left: '0%',
        content_top: '0%'

      }}
    />

      <main className=" w-full  h-full  ">
        <Outlet />
       </main>

    </div>
  );
};
