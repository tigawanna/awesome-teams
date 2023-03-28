import { Outlet,useLocation,useNavigation } from 'react-router-dom';
import { Toolbar } from '../../components/toolbar/Toolbar';
import { useAuthGuard } from './../../utils/hooks/useAuthGuard';
import { AppUser } from '../../utils/types/base';
import { ReactProgress } from '../../shared/loaders/ReactProgress';
import { NavElemets } from '../../components/toolbar/NavElemets';
import { useState } from 'react';
import { SideDrawer } from '../../components/toolbar/SideDrawer';
import { HeaderToggle } from '../../components/index/HeaderToggle';



interface RootLayoutProps {
  user: AppUser;
 
}

export const RootLayout = ({user}: RootLayoutProps) => {
useAuthGuard(user,false)
const navigation = useNavigation()
const location = useLocation()

const [open,setOpen]=useState(false)
  // useBodyScrollLock(open)
  // const [opened, { open, close }] = useDisclosure(false);
return (
    <div className="w-full min-h-screen  dark:bg-slate-900 flex ">
    
    <HeaderToggle setOpen={setOpen}/>
    
    <div className='fixed top-0 right-0 left-0 z-40'>
    <ReactProgress isAnimating={navigation.state === "loading"} key={location.key} />
    </div>


      
      <div
      className="h-screen w-[5%] fixed top-[10%]
         bg-opacity-80 dark:bg-opacity-90  p-1 hidden md:block
        z-30"
      >
      <Toolbar user={user} />
     </div>

    
    <SideDrawer
     open={open}
     closeModal={()=>setOpen(false)}
     >
      <NavElemets user={user} closeModal={() => setOpen(false)}  />
     </SideDrawer>



      <main className=" w-full  min-h-screen z-20 h-full mt-[15%] sm:ml-[8%] sm:mt-[10%] md:mt-[8%]">
        <Outlet />
        </main>

    </div>
  );
};
