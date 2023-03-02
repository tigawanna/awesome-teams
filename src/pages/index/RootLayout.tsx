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
    <div className="w-full h-full dark:bg-slate-900 ">

      <div
        className="h-10 w-full  bg-slate-500 dark:bg-slate-700
         bg-opacity-70 dark:bg-opacity-90 max-h-[50px] p-1 
         fixed top-0 z-40 text-white"
      >
      <Toolbar user={user} />
        <ReactProgress isAnimating={navigation.state === "loading"} key={location.key} />
      </div>
      <main className=" w-full  mt-10 min-h-screen bg-red-900 ">
        <Outlet />
        </main>

    </div>
  );
};
