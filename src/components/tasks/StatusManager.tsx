import { useMachine } from "@xstate/react";
import { TasksResponse } from "../../utils/api/tasks";
import { AppUser } from "../../utils/types/base";


interface StatusManagerProps {
user:AppUser
task:TasksResponse
}

export const StatusManager = ({task,user}:StatusManagerProps) => {
console.log("task",task)

type TasKHeirachy={
[key in TasksResponse['status']]:
    {
    prev_status?: TasksResponse['status'],
    next_status?:TasksResponse['status']
    }

}
const tasks_status: Pick<TasKHeirachy,"created"|"completed"> = {
        "created": { next_status: "approved" },
        "completed": { prev_status: "in_progress" }
    }

const repair_tasks:TasKHeirachy={
    "created":{next_status:"approved"},
    "approved":{prev_status:"created",next_status:"funded"},
     "cancelled":{prev_status:"created"},
     "funded":{prev_status:"approved",next_status:"in_progress"},
     "in_progress":{prev_status:"funded",next_status:"completed"},
     "completed":{prev_status:"in_progress"}
}

// const task_heirachy:TasKHeirachy[]=[
//     {prev_status:"created",status:'approved',next_status:'funded'},
//     { prev_status: "approved", status: 'funded', next_status: 'in_progress' },
//     { prev_status: "funded", status: 'in_progress', next_status: 'completed' },
// ]


if(task.type==="repairs"){
    return (

        <div className='w-full h-full flex flex-wrap items-center justify-center gap-2'>
         
         <div className="w-fit p-2 border flex rounded-xl gap-2">
            <button 
            className="w-full border bg-green-700 hover:bg-green-500 rounded-xl px-2">Approve</button>
            <button 
            className="w-full border bg-red-700 hover:bg-red-500 rounded-xl px-2">cancel</button>
            </div>
            <button className="w-fit p-2 border rounded-xl"> fund </button>

            <button
                className="w-fit p-2 border rounded-xl">mark as in progress</button>

            <button
                className="w-fit p-2 border rounded-xl"> mark as completed</button>

        </div>
    );
}


}
