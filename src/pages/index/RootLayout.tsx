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
import { Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavElemets } from '../../components/toolbar/NavElemets';



interface RootLayoutProps {
  user: AppUser;
 
}

export const RootLayout = ({user}: RootLayoutProps) => {
useAuthGuard(user,false)
const navigation = useNavigation()
const location = useLocation()

// const [open,setOpen]=useState(false)
  const [opened, { open, close }] = useDisclosure(false);
return (
    <div className="w-full min-h-screen  dark:bg-slate-900 flex ">
    
    <div className=" flex justify-start items-center fixed md:hidden top-[1%] left-[1%] z-40 ">
      <TheIcon Icon={FaBars} iconAction={open} size='30px'/>
    </div>
    
    <ReactProgress isAnimating={navigation.state === "loading"} key={location.key} />

      
      <div
      className="h-screen w-[5%] sticky top-0 
         bg-opacity-70 dark:bg-opacity-90  p-1 hidden md:block
        text-white z-30"
      >
      <Toolbar user={user} />
   
      </div>


    <Drawer
      opened={opened}
      size="85%"
      onClose={close}
      title=""
      overlayProps={{ opacity: 0.5, blur: 4 }}
    >
    <NavElemets user={user}/>
    </Drawer>

      <main className=" w-full  h-full   mt-[7%] md:mt-0">
        <Outlet />
       </main>

    </div>
  );
};
