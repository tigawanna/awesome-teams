import { useEffect, useState } from "react";
import { TasksResponse } from "../../utils/api/tasks";


export function useTaskRepairStatus(task:TasksResponse){
const repair_steps:TasksResponse['status'][] = ["approved","funded","in_progress","completed"]
const other_steps:TasksResponse['status'][] = ["approved","completed"]

  const curr_status_idx = repair_steps.indexOf(task.status);
  const endIndex = curr_status_idx + 2;


 const [taskSlice, setTaskSlice] = useState<TasksResponse["status"][]>(()=>{
   if(task.type === "repairs"){
    if(task.status === "rejected") return ['rejected']
    return repair_steps.slice(0, endIndex)
   }
   return other_steps.slice(0,endIndex)
 });

useEffect(()=>{
setTaskSlice((prev)=>{
   if(task.type === "repairs"){
    if(task.status === "rejected") return ['rejected']
    return repair_steps.slice(0, endIndex)
   }
   return other_steps.slice(0,endIndex)
})
 },[task])



return {taskSlice,last_item:taskSlice.slice(-1)[0]}
}
