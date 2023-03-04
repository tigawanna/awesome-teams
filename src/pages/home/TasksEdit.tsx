import { TaskForm } from "../../components/tasks/TaskForm";
import { AppUser } from "../../utils/types/base";

interface TasksEditProps {
    user: AppUser
}

export const TasksEdit = ({user}:TasksEditProps) => {
return (
 <div className='w-full min-h-screen h-full flex items-center justify-center'>
    <TaskForm user={user}/>
 </div>
);
}
