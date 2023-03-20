import { useState } from "react";
import { ReactModalWrapper } from "../../shared/wrappers/ReactModalWrapper";
import { makeImageUrl } from "../../utils/pb/config";
import { AppUser } from "../../utils/types/base";
import { LeaveForm } from "./LeaveForm";
import { LeaveList } from "./LeaveList";

interface PortalUserProps {
user:AppUser
}

export default function PortalUser({user}:PortalUserProps){
const [open,setOpen]=useState(false)

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
                    <button
                        onClick={() => setOpen(true)}
                        className="px-2 py-1 bg-purple-800 text-white rounded-md"
                    >Request Leave
                    </button>
    </div>

    <div className="w-full h-fit p-2 flex flex-wrap items-center border-shadow">
        <LeaveList user={user}/>
    </div>

</div>


</div>
    <ReactModalWrapper
            child={
                <div className='z-50'>
                    <LeaveForm user={user} setOpen={setOpen}/>
                </div>
            }
            closeModal={() => setOpen(false)}
            delay={0}
            isOpen={open}

            styles={{
                overlay_top: '0%',
                overlay_right: '0%',
                overlay_left: '0%',
                overlay_bottom: '0%',
                content_bottom: '2%',
                content_right: '2%',
                content_left: '2%',
                content_top: '2%'

            }} />
    </div>


);
}
