
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppUser } from '../types/base';


export const useAuthGuard = (user:AppUser,test_mode:boolean) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.email && !test_mode) {
            navigate("/auth");
        }
    }, [user?.email]);
};
