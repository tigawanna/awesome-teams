import { Link } from "react-router-dom";
import { TasksResponse, statusColors } from "../../utils/api/tasks";
import dayjs from "dayjs";
import { TaskDeadline } from "./task-status/TaskDeadline";
import { AppUser } from "../../utils/types/base";
import { TaskOptions } from "./task-options/TaskOptions";

interface TaskCardProps {
    task: TasksResponse
    page_idx:number
    user:AppUser
}

export const TaskCard = ({ task,page_idx,user }: TaskCardProps) => {


    return (
        <div 
           style={{ border: `1px solid ${statusColors[task.status]}` }}
            className='h-full p-2 rounded-lg w-[95%] md:w-[40%] gap-2 
             flex flex-col flex-grow justify-center  border-shadow'
        >

        <Link
            to={{ pathname:`/${task.id}`,search:`?page_idx=${page_idx}`}}
            className='h-full p-2 rounded-lg w-full  gap-2 
         '  data-testid="task-card-link"
        >

            <div className='h-full flex flex-col items-center justify-center  gap-2'>
                <div className="w-full flex  gap-1 border-b p-1">

                <div className="w-full flex flex-col gap-[1px]">
                <h1 style={{ color: `${statusColors[task.status]}` }}
                    className='text-xl font-bold w-full px-[2px]'>{task.title}</h1>
                <h1 className='w-full text-accent text-sm'>by: {task.expand?.created_by.name}
                {'  ('}{task.expand?.created_by.type}{')'}
                </h1>
                </div>

                    <div className="w-full p-1 flex flex-col items-end justify-end">
                    <h1 
                    data-testid="task-card-link-type"
                    className='px-1 text-accent font-bold'>{task.type}</h1>
                    <h1 className='px-1 text-xs'>{dayjs(task.created).format('dddd DD-MMM-YYYY')}</h1>
                    </div>
                </div>
                <p className='w-[96%] text-sm line-clamp-4 p-1 '>{task.description}</p>
            </div>
            <div
                style={{ color: statusColors[task.status] }}
                className={''}>
                <p 
                data-testid="task-card-link-status"
                className=' px-1 rounded-xl font-bold font-mono '>{task.status}</p>
            </div>
            
        </Link>
            <div className='w-full flex justify-evenly items-center gap-2 border-t '>
            <TaskDeadline task={task} />
            <TaskOptions task={task} user={user}/>
            </div>
    </div>
     

    );
}
