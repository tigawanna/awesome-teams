import { approveLeave, StaffLeaveResponse } from "../../utils/api/staff";

import { AppUser } from "../../utils/types/base";
import { ReactCalender } from "../../shared/extra/ReactCalender";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { concatErrors } from "../../utils/utils";
import { useStroreValues } from "../../utils/zustand/store";
import { ConsentModal } from "./ConsentModal";


import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
dayjs.extend(relativeTime)

interface StaffLeavesRowProps {
    leave: StaffLeaveResponse
    page_idx:number
    user:AppUser
}

export function StaffLeaveCard({leave,user}:StaffLeavesRowProps){

const [error,setError] = useState<{name:string,message:string}>({name:'',message:''})
const [open,setOpen] = useState(false)
const store = useStroreValues()

const mutation = useMutation({
    mutationFn: (input:StaffLeaveResponse) => approveLeave(input),
    meta: {
      invalidates: ['staff_leaves',' ']
    },
    onSuccess: (data, variables, context) => {
        store.updateNotification({type:"success",message:"leave request successfully approved"})
    },
    onError(error, variables, context) {
        setError({ name: "main", message: concatErrors(error) });
    }
})
function leaveStatusColors(status:StaffLeaveResponse['leave_request_status']){
if(status==="pending"){
return ""
}
else if(status==="approved"){
return "green"
}
else if(status==="rejected"){
return "red"
}

}
return (
 <div 
  className = {
    user?.id === leave.leave_requested_by ?
    `w-full  h-full text-lg
    flex items-center justify-center border border-accent
    shadow-md shadow-accent  `
    :`w-full h-full flex items-center justify-center border border-shadow 
    
    `
    }

 >
    
        <div className='w-full flex flex-wrap items-start justify-start gap-2 m-2'>
        <Link to={`${leave.id}`} 
                className="hover:outline hover:outline-purple-500 rounded-lg 
                w-full   h-full flex flex-wrap items-start justify-start gap-2 m-2">

            <div className=" h-full border shadow-lg flex items-center justify-center gap-1 p-1 rounded-lg">
                <h3 className="text-sm font-bold">Type:</h3>
                <h3 className="">{leave.leave_type}</h3>
            </div>

                <div className=" h-full  border shadow-lg flex items-center justify-center gap-1 p-1 rounded-lg">
                <h3 className="text-sm font-bold">By:</h3>
                <h3 className="">{leave.expand.leave_requested_by.name}</h3>
            </div>

                <div className="border flex items-center justify-center gap-1 p-1 rounded-lg">
                <h3 className="text-xs md:text-sm font-bold">Created:</h3>
                <h1 className='text-xs'>{dayjs(leave.created).format('dddd DD-MMM-YYYY')}</h1>
                <h1 className='text-xs'>{dayjs().to(dayjs(leave.created))}</h1>
            </div>

                <div className="border flex items-center justify-center gap-1 p-1 rounded-lg">
                <h3 className="text-xs md:text-sm font-bold">From:</h3>
                <h1 className='text-xs'>{dayjs(leave.leave_start).format('dddd DD-MMM-YYYY')}</h1>
                <h1 className='text-xs'>{dayjs().to(dayjs(leave.leave_start))}</h1>
            </div>

                <div className=" border flex items-center justify-center gap-1 p-1 rounded-lg">
                <h3 className="text-xs md:text-sm font-bold">To:</h3>
                <h1 className='text-xs'>{dayjs(leave.leave_end).format('dddd DD-MMM-YYYY')}</h1>
                <h1 className='text-xs'>{dayjs().to(dayjs(leave.leave_end))}</h1>
            </div>

            <div 
            style={{
            backgroundColor:leaveStatusColors(leave.leave_request_status)
            }}
            className="min-w-[20%] h-full border shadow-lg flex items-center justify-center gap-1 p-1 rounded-lg">
                <h3 className="text-sm font-bold">Status:</h3>
                <h3 className="">{leave.leave_request_status}</h3>
            </div>
        </Link> 

         <div className="w-full  dark:text-black flex flex-col items-center justify-center gap-1 p-1 rounded-lg">
          <ReactCalender 
            minDate={new Date(leave.leave_start)}
            maxDate={new Date(leave.leave_end)}
            />

          
            {user?.type==="manager"&& leave.leave_request_status==="pending" &&
                    <button
                        onClick={() => setOpen(true)}
                        className="w-fit px-5 py-2 bg-accent rounded-lg text-lg">
                        aprrove/reject
                    </button>
            }
 
        </div>

<ConsentModal
error={error}
handleAccept={() => {
    if(user && user.type ==="manager"){
    mutation.mutate({...leave,leave_request_status:'approved',
        leave_approved_by:user.id,leave_approved_on:new Date().toISOString()})
    setOpen(false)
    }
    else{
        setError({name:"main",message:"Mangers only can approve/reject leaves"})
        setOpen(false)
    }
}}
handleReject={() => {
    if (user && user.type === "manager") {
        mutation.mutate({ ...leave,leave_request_status:"rejected",
        leave_rejected_by:user.id,leave_rejected_on: new Date().toISOString() })
        setOpen(false)
    }
    else {
        setError({ name: "main", message: "Mangers only can approve/reject leaves" })
      
    }
}}
open={open}
prompt={`Are you sure you want to approve ${leave.leave_type} leave request from ${leave.expand.leave_requested_by.name}?`}
setOpen={setOpen}

/>
 
</div>

 </div>
);
}
