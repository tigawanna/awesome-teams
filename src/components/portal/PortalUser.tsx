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
 <div className='w-full min-h-screen flex flex-col md:flex-row gap-2'>
    
  
  
<div className='w-full flex flex-col items-center gap-2'>
<div className='w-[90%] md:w-[80%]  flex flex-col md:flex-row gap-2'>
    
    <div className="min-w-[30%]  w-full md:w-[50%]  h-fit  p-2 
    flex flex-col roundend-lg border-shadow
   items-center  justify-start gap-5">
            <img
                src={makeImageUrl('staff', user?.id as string, user.avatar)}
                alt="staff avatar"
                height={"100"}
                width={"auto"}
                className="w-full max-w-[60%] rounded-full aspect-square"
            />
            <div className="w-full p-2 flex flex-col  justify-start items-start   ">
                <h1 className="md:text-xl font-bold ">{user.name}</h1>
                <h1 className="md:text-lg font-serif">{user.email}</h1>
                <h1 className="px-2 border border-slate-400  rounded-lg">{user.type}</h1>
                </div>
    </div>

    <div className="w-full h-fit p-2 flex flex-wrap items-center border-shadow">
    <button
    className="px-2 py-1 bg-purple-800 text-white rounded-md"
    >Request Leave </button>
   </div>

</div>


</div>

 </div>
);
}
