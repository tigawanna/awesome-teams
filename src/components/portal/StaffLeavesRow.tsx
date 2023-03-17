import { StaffLeaveResponse } from "../../utils/api/staff";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime)

interface StaffLeavesRowProps {
    leave: StaffLeaveResponse
    page_idx:number
}

export function StaffLeavesRow({leave,page_idx}:StaffLeavesRowProps){
return (
 <div className='w-full h-full flex items-center justify-center border border-accent shadow-md shadow-accent '>
    
    <div className='w-full flex flex-wrap items-start justify-start gap-2 m-2'>
        <div className="w-[45%] h-full border shadow-lg flex items-center justify-center gap-1 p-1 rounded-lg">
                <h3 className="text-sm font-bold">Type:</h3>
                <h3 className="">{leave.leave_type}</h3>
        </div>

    <div className="w-[50%] h-full  border shadow-lg flex items-center justify-center gap-1 p-1 rounded-lg">
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
            <div className="border flex items-center justify-center gap-1 p-1 rounded-lg">
                <h3 className="text-xs md:text-sm font-bold">To:</h3>
                <h1 className='text-xs'>{dayjs(leave.leave_end).format('dddd DD-MMM-YYYY')}</h1>
                <h1 className='text-xs'>{dayjs().to(dayjs(leave.leave_end))}</h1>
         </div>
 
    
    </div>

 </div>
);
}
