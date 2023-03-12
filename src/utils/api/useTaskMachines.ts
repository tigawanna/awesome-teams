import { TasksResponse } from "./tasks";
import { repairTaskMachine } from "./machines/repairTaskMachine";


export const useTaskMachines = (task:TasksResponse) => {
if(task.type === "repairs"){
    
}
// return otherTaskMachine
return repairTaskMachine
}
