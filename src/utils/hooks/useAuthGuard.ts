
import { useEffect } from 'react';
import { createSearchParams, useNavigate, useNavigation } from 'react-router-dom';
import { AppUser } from '../types/base';
import { useLocation } from 'react-router-dom';


export const useAuthGuard = (user:AppUser,test_mode:boolean) => {

    const location = useLocation()
    const navigate = useNavigate();

// navigation.state
   useEffect(() => {
        if (!user?.email ) {
            navigate({
               pathname: '/auth',
               search: createSearchParams({
                callbackUrl:location.pathname
                }).toString()
            })
        }
    }, [user?.email]);
};
