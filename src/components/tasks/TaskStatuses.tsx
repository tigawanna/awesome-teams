
import { TasksResponse } from "../../utils/api/tasks";
import { AppUser } from "../../utils/types/base";
import { MdDone, MdCancel } from 'react-icons/md'
import { useTaskRepairStatus } from "./useTaskRepairStatus";


interface TaskStatusesProps {
    task: TasksResponse
    user: AppUser
}

export const TaskStatuses = ({ task, user }: TaskStatusesProps) => {

    const tasks_steps = useTaskRepairStatus(task.status)
    const label_map: ButtonLabels = {
        "created": "create",
        "approved": "Approve",
        "cancelled": "rejected",
        "funded": "fund",
        "in_progress": "mark in progress",
        "completed": "mark completed"
    }


    if (task.type === "repairs") {

        return (
            <div className='w-full h-full flex flex-wrap items-center justify-center gap-2'>
            {
            tasks_steps.taskSlice.map((item, idx) => {
            const is_last = tasks_steps.last_item === item
            if (item === "approved") {
                return (
                    <div key={item} className="flex items-center justify-center gap-2 ">
                        <button style={{ backgroundColor: !is_last ? "green" : "" }}
                            className="px-5 shadow-lg outline flex items-center justify-center gap-2 rounded-xl
                            hover:outline-2 hover:outline-green-400">
                        <h1 className="text-lg">{is_last ? label_map[item] : item}</h1><MdDone />
                        </button>

                    {is_last ? <button className="px-5 flex items-center bg-red-700justify-center gap-2 rounded-xl hover:bg-red-600">
                    <h1 className="text-lg">{"reject"}</h1>
                        <MdCancel /></button> : null}</div>)
                    }
                    if (item === "cancelled") {
                    return (
                    <button className="px-5 flex items-center bg-red-700 justify-center gap-2 rounded-lg">
                    <h1 className="text-lg">{"rejected"}</h1></button>)
                     }
                    return (
                     <TaskStatusesButton
                                key={item}
                               is_last={is_last}
                                label={tasks_steps.last_item === item ? label_map[item] : item} />
                        )

                    })
                }
                </div>
                );
            }


    return (
        <div

            className='w-full h-full flex items-center justify-center'>
            <TaskStatusesButton
                is_last={task.status !== "completed"}
                label={task.status !== "completed" ? "mark completed" : "completed"} />
        </div>
    );
}


interface TaskStatusesButtonProps {
    label: string
    is_last?: boolean
}
type ButtonLabels = {
    [key in TasksResponse['status']]: string
}
export const TaskStatusesButton = ({ label,is_last }: TaskStatusesButtonProps) => {

    return (
        <button
            style={{ backgroundColor: !is_last ? "green" : "" }}
            className="px-5 outline flex items-center justify-center 
gap-2 rounded-xl hover:outline-2 hover:outline-green-400">
            <h1 className="text-lg">{label}</h1> <MdDone />
        </button>

    );
}
