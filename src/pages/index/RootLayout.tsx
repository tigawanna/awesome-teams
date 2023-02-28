import { Outlet,useLocation,useNavigation } from 'react-router-dom';
import { Toolbar } from '../../components/toolbar/Toolbar';

import { useAuthGuard } from './../../utils/hooks/useAuthGuard';
import { ReactProgress } from './../../shared/loaders/ReactProgress';
import { AppUser } from '../../utils/types/base';



interface RootLayoutProps {
  user: AppUser;
 
}

export const RootLayout = ({user}: RootLayoutProps) => {
useAuthGuard(user,false)
const navigation = useNavigation()
  const location = useLocation()

  // console.log(" transitiononig ?=== >", navigation.state === "loading")

  return (
    <div className="w-full h-full dark:bg-slate-900 ">

      <div
        className="h-14 w-full  bg-slate-500 dark:bg-slate-700
         bg-opacity-70 dark:bg-opacity-90 max-h-[50px] p-1 
         sticky top-0 z-40 text-white"
      >
        <Toolbar user={user} />
        <ReactProgress isAnimating={navigation.state === "loading"} key={location.key} />
      </div>
      <main className=" w-full sticky mt-2 top-12 overflow-y-scroll ">
        <Outlet />
        {/* <button
          onClick={() => goToTop()}
          className='w-full p-6 rounded-xl bg-red-700'>go to top </button> */}
      </main>

    </div>
  );
};
