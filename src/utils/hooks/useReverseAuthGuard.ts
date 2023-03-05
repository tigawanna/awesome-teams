import { useNavigate, useSearchParams } from "react-router-dom";
import { AppUser } from "../types/base";
import { useEffect } from "react";



export const useReversedAuthGuard = (user:AppUser,test_mode:boolean) => {
    
const [searchBarParams, setSearchBarParams] = useSearchParams();
const navigate = useNavigate();
const navigate_to = searchBarParams.get('callbackUrl')
 
useEffect(()=>{
    if(user?.email){
    if(navigate_to){
    navigate(navigate_to)
    }
    else{
        navigate(-1)
    }
    }
   },[user?.email])
}
