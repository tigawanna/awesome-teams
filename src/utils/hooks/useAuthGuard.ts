
import { useEffect } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';
import { AppUser } from '../types/base';
import { useLocation } from 'react-router-dom';


export const useAuthGuard = (user:AppUser,test_mode:boolean) => {

    const navigation = useNavigation()
    const location = useLocation()
    const navigate = useNavigate();


    // const resy = useResolvedPath('/auth')
  

    // console.log("navigation ======>>> ",navigation)
    console.log("location ======>>> ",location)
    // console.log(" window location ======>>> ",window.location)

    useEffect(() => {
        if (user?.email ) {
        // const url = new URL('/auth',window.location);
        // url.searchParams.set("callbackUrl", location.pathname+location.search);
        // console.log("url ====",url)
            navigate('/auth',{
                state:{origin:window.location.origin}
            });
        }
    }, [user?.email]);
};
