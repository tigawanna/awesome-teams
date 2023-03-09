import { useEffect, useState } from "react";
import { TasksResponse } from "../../utils/api/tasks";


export function useTaskRepairStatus(status:TasksResponse['status']){
const repair_steps:TasksResponse['status'][] = ["approved","funded","in_progress","completed"]

  const curr_status_idx = repair_steps.indexOf(status);
    const endIndex = curr_status_idx + 2;


 const [taskSlice, setTaskSlice] = useState<TasksResponse["status"][]>(()=>{
    // console.log("end index  === ",repair_steps )
    if(status === "cancelled") return ['cancelled']
    return repair_steps.slice(0, endIndex) 
 });
return {taskSlice,last_item:taskSlice.slice(-1)[0]}
}
