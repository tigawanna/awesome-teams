import { TasksResponse } from "../../utils/api/tasks";


interface TaskCardProps {
    task: TasksResponse
}

export const TaskCard = ({ task }: TaskCardProps) => {
    const statusColors = {
        "submited": "#330c4a",
        "approved": "#FFC107",
        "funded": "#00BCD4",
        "in_progress": "#22fa0a",
        "completed": "#d0aae6",
        "cancelled": "#F44336"
    };

    return (
        <div
            style={{ border: `1px solid ${statusColors[task.status]}` }}
            className='h-full p-2 rounded-lg w-[95%] md:w-[40%] gap-2 
        flex flex-col  justify-center  '>

            <div className='h-full flex flex-col items-center justify-center line-clamp-4'>
                <h1
                    style={{ color: `${statusColors[task.status]}` }}
                    className='text-xl font-bold w-full px-1'>{task.title}</h1>
                <p className='text-sm'>{task.description}</p>
            </div>
            <div
                style={{ color: statusColors[task.status] }}
                className={''}>
                <p className=' px-1 rounded-xl font-bold font-mono '>{task.status}</p>
            </div>

        </div>
    );
}
