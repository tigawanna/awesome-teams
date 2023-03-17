import { TasksResponse } from "../../utils/api/tasks";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime)
interface TaskDeadlineProps {
task: TasksResponse
}

export function TaskDeadline({task}:TaskDeadlineProps){
    if(!task.deadline || task.deadline ==""){
        return null
    }
return (
 <div className='w-full h-full p-1 m-2 flex items-center justify-center gap-2 border-t '>
        <h1 className="font-bold">Deadline</h1>
        <h1 className='text-sm '>{dayjs(task.deadline).format('dddd DD-MMM-YYYY')}</h1>
        <h1 className='text-sm text-accent'>{dayjs().to(dayjs(task.deadline))}</h1>
        </div>
);
}
