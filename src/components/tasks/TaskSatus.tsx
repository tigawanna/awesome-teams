import { TasksResponse } from "../../utils/api/tasks";

interface TaskSatusProps {
    task: TasksResponse
}

export const TaskSatus = ({task}:TaskSatusProps) => {
const status:typeof task['status'][] = ["submited","in_progress","approved","funded","completed","cancelled"]
return (
 <div className='w-full h-full flex flex-wrap items-center justify-center gap-2'>
 {
     status.map((item,index)=>{
         return(
            <div className='h-full flex items-center justify-center border-2 border-red-800' key={index}>
                <div className="">
                    {item}
                </div>
            </div>
                 
     )
 })
 
 }
 </div>
);
}
