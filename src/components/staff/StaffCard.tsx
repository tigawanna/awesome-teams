import { StaffResponse } from "../../utils/api/staff";
import { makeImageUrl } from "../../utils/pb/config";

interface StaffCardProps {
    staff: StaffResponse
    page_idx: number
}

export const StaffCard = ({staff,page_idx}:StaffCardProps) => {
return (
 <div className='h-full flex items-center justify-center'>
<div className="w-full flex flex-col items-center justify-center gap-1 m-2 rounded-lg shadow-xl">
<img 
src={makeImageUrl('staff',staff?.id as string,staff.avatar)}
alt="staff avatar"
height={"100"}
width={"auto"}
className="max-h-[200px] rounded-lg aspect-square"
/>
<div className="h-full flex flex-col  justify-start">
<h1 className="text-xl font-bold ">{staff.name}</h1>
<h1 className="text-lg font-serif">{staff.email}</h1>
<h1 className="w-fit p-1 border rounded-lg">{staff.type}</h1>
            
</div>
</div>
 </div>
);
}
