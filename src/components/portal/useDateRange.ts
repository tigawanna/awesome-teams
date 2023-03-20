import { useEffect, useState } from "react";
import { StaffLeaveMutationFields } from "../../utils/api/staff";

export function useDateRange(setInput:React.Dispatch<React.SetStateAction<StaffLeaveMutationFields>>){
const [date, setDate] = useState(new Date());
    useEffect(() => {
    // @ts-expect-error
    if(date&&date[0]&&date[1]){
    // @ts-expect-error
        setInput(prev=>({...prev,startDate:date[0].toISOString(),endDate:date[1].toISOString()}))
    }
    },[date])

    return {date,setDate}
}
