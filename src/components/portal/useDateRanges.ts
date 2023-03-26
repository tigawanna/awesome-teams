import { useEffect, useState } from "react";
import { StaffLeaveMutationFields } from "../../utils/api/staff";



interface DateRangeHook {
input: StaffLeaveMutationFields;
setInput: React.Dispatch<React.SetStateAction<StaffLeaveMutationFields>>;
}

export function useDateRanges(props:DateRangeHook){
    
    const {input,setInput}=props
 
    const plus_days = new Date();
    plus_days.setDate(plus_days.getDate() + 3);

    const [dateRange, setDateRange] = useState(()=>{
    return [
        input.leave_start !== ""?new Date(input.leave_start):new Date(),
        input.leave_end !== ""?new Date(input.leave_end):plus_days
    ]
  
    })
    
    useEffect(()=>{
        setDateRange(()=>{
            return [
                input.leave_start !== ""?new Date(input.leave_start):new Date(),
                input.leave_end !== ""?new Date(input.leave_end):plus_days
            ]
        })
    },[input])

    function updateDateRange(ranges:Date[]){
        // console.log("ranges ====  ",ranges)
        setDateRange(ranges)
        setInput(prev => ({ ...prev, leave_start: ranges[0].toISOString().split('T')[0],
        leave_end: ranges[1].toISOString().split('T')[0] }))

    }

    return {dateRange, setDateRange, updateDateRange}
}
