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
 <div className='w-full h-full flex items-center justify-center'>
 <div className="w-full flex items-center justify-center">
            <img
                src={makeImageUrl('staff', user?.id as string, user.avatar)}
                alt="staff avatar"
                height={"100"}
                width={"auto"}
                className="max-h-[200px] rounded-lg aspect-square"
            />
            <div className="h-full flex flex-col  justify-start">
                <h1 className="text-xl font-bold ">{user.name}</h1>
                <h1 className="text-lg font-serif">{user.email}</h1>
                <h1 className="w-fit p-1 border rounded-lg">{user.type}</h1>

            </div>
 </div>
 </div>
);
}
