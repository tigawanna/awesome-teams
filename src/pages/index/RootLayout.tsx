import { Outlet,useLocation,useNavigation } from 'react-router-dom';
import { Toolbar } from '../../components/toolbar/Toolbar';
import { useAuthGuard } from './../../utils/hooks/useAuthGuard';
import { AppUser } from '../../utils/types/base';
import { ReactProgress } from '../../shared/loaders/ReactProgress';



interface RootLayoutProps {
  user: AppUser;
 
}

export const RootLayout = ({user}: RootLayoutProps) => {
useAuthGuard(user,false)
const navigation = useNavigation()
const location = useLocation()

return (
    <div className="w-full h-screen overflow-hidden dark:bg-slate-900 flex ">
    <ReactProgress isAnimating={navigation.state === "loading"} key={location.key} />
      
      <div
      className="h-screen w-[5%]  bg-[#724923]
         bg-opacity-70 dark:bg-opacity-90  p-1 
          text-white z-40"
      >
      <Toolbar user={user} />
   
      </div>
      <main className=" w-full  p-1 h-full">
        <Outlet />
       </main>

    </div>
  );
};
