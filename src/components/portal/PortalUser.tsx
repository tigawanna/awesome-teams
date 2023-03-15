import { makeImageUrl } from "../../utils/pb/config";
import { AppUser } from "../../utils/types/base";

interface PortalUserProps {
user:AppUser
}

export const PortalUser = ({user}:PortalUserProps) => {
 if(!user){
return <div className="h-full flex items-center justify-center">No User</div>
 }   
return (
 <div className='w-full min-h-screen '>
   
   <div className="w-fit p-2 
   flex flex-col items-center justify-center 
   border rounded-xl gap-1 ">
            <img
                src={makeImageUrl('staff', user?.id as string, user.avatar)}
                alt="staff avatar"
                height={"100"}
                width={"auto"}
                className="max-h-[300px] rounded-lg aspect-square"
            />
            <div className="w-full flex flex-col  justify-start items-start ">
                <h1 className="text-xl font-bold ">{user.name}</h1>
                <h1 className="text-lg font-serif">{user.email}</h1>
                <h1 className="border rounded-lg">{user.type}</h1>

            </div>
 </div>
 <div>
    
 </div>
 </div>
);
}
