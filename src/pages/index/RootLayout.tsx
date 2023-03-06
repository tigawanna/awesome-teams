import { Link, Outlet,useLocation,useNavigation } from 'react-router-dom';
import { Toolbar } from '../../components/toolbar/Toolbar';
import { useAuthGuard } from './../../utils/hooks/useAuthGuard';
import { AppUser } from '../../utils/types/base';
import { ReactProgress } from '../../shared/loaders/ReactProgress';
import { FaBars } from 'react-icons/fa';
import { TheIcon } from '../../shared/wrappers/TheIcon';
import { NavElemets } from '../../components/toolbar/NavElemets';
import { useState } from 'react';
import { SideDrawer } from '../../components/toolbar/SideDrawer';


interface RootLayoutProps {
  user: AppUser;
 
}

export const RootLayout = ({user}: RootLayoutProps) => {
useAuthGuard(user,false)
const navigation = useNavigation()
const location = useLocation()

const [open,setOpen]=useState(false)
  // const [opened, { open, close }] = useDisclosure(false);
return (
    <div className="w-full min-h-screen  dark:bg-slate-900 flex ">
    
    <div className=" flex justify-start items-center fixed top-[1%] left-[2%] z-50 gap-3">
      <TheIcon Icon={FaBars} iconAction={()=>setOpen(!open)} size='30px'/>
      <Link to='/' className='text-2xl font-bold'>AWESOME</Link>
    </div>
    
    <div className='fixed top-0 right-0 left-0 z-40'>
    <ReactProgress isAnimating={navigation.state === "loading"} key={location.key} />
    </div>


      
      <div
      className="h-screen w-[7%] sticky top-[9%]
         bg-opacity-70 dark:bg-opacity-90  p-1 hidden md:block
        z-30"
      >
      <Toolbar user={user} />
     </div>

    
    <SideDrawer
     open={open}
     closeModal={()=>setOpen(false)}
     >
      <NavElemets user={user} />
     </SideDrawer>


    <main className=" w-full min-h-screen z-20 h-full mt-[15%]  sm:mt-[4%]">
        <Outlet />
       </main>

    </div>
  );
};
