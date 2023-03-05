import { TasksResponse } from "../../utils/api/tasks";
import { TaskSatus } from "./TaskSatus";

interface TaskCardProps {
    task: TasksResponse
}

export const TaskCard = ({task}:TaskCardProps) => {
return (
    <div className='h-full border p-2 rounded-lg w-[90%] md:w-[40%] gap-2 
        flex flex-col  justify-center  '>
    
     <div className='h-full flex flex-col items-center justify-center line-clamp-4'>
        <h1 className='text-xl font-bold w-full px-1'>{task.title}</h1>
            <p className=''>{task.description}</p>
     </div>
<TaskSatus task={task}/>

 </div>
);
}
