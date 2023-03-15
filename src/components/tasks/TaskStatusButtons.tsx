import { MdCancel, MdDone } from "react-icons/md";
import { Staff, TasksResponse, statusColors } from "../../utils/api/tasks";
import { AppUser } from "../../utils/types/base";

interface CreatedStatusProps {
    task: TasksResponse
    is_last: boolean
    user:AppUser
    toggleModal(is_last: boolean, next_status: TasksResponse['status']): void
}

export const CreatedStatus = ({ task, is_last, toggleModal,user }: CreatedStatusProps) => {
    if(!is_last){
        return null
    }
    if (task.type === "repairs") {
        return (
            <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                    className=' px-5 py-[1px] outline flex items-center justify-center rounded-lg border       
                        hover:border-green-500 hover:bg-green-900 hover:text-white'
                        >
                    <h1 className="text-lg">{"Approve" }</h1><MdDone />
                </button>

                {
                    is_last ?
                        <div className="flex flex-col items-center justify-center">
                        <button
                            style={{ backgroundColor: !is_last ? "green" : "", color: !is_last ? "white" : "" }}
                            onClick={() => toggleModal(is_last, "rejected")}
                            disabled={canChangeStatus("rejected", user?.type as string)}
                            className="px-5 py-1 flex items-center bg-red-700justify-center gap-2 border
                             rounded-xl hover:bg-red-600 hover:text-white">
                            <h1 className="text-lg">{"reject"}</h1>
                            <MdCancel />
                            </button> 
                            <h3>by: {user?.name}</h3>
                          </div>
                            : null
                }
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center justify-center">
        <button
            disabled={canChangeStatus("completed", user?.type as string)}
            style={{ backgroundColor: !is_last ? "green" : "", color: !is_last ? "white" : "" }}
                className=' px-5 py-[1px] outline flex items-center justify-center rounded-lg border       
                hover:border-green-500 hover:bg-green-900 hover:text-white'>
            <h1 className="text-lg">{"Mark Complete"}</h1>
            <MdDone />
         </button>
        <h3>by: {user?.name}</h3>
        </div>
    );
}


interface ApprovedStatusButtonsProps {
    task: TasksResponse
    is_last: boolean
    user: AppUser
    toggleModal(is_last: boolean, next_status: TasksResponse['status']): void
}

export const ApprovedStatus = ({is_last,task,toggleModal,user}:ApprovedStatusButtonsProps) => {
if(task.type !=="repairs"){
    return null
}
return (
 <div className='w-fit h-full flex flex-wrap items-center justify-center gap-2'>
<CreatedStatus task={task} is_last={false} toggleModal={toggleModal} user={user}/>
<div className="flex flex-col items-center justify-center">
<button  
className='px-5 py-[2px] border flex items-center justify-center rounded-lg text-white bg-green-700'>
<h1 className="text-lg">{"Approved"}</h1><MdDone />
</button>
 <h3>by: {task.expand?.approved_by?.name}</h3>
</div>

    { is_last&&
            <div className="flex flex-col items-center justify-center">
            <button
            disabled={canChangeStatus("funded", user?.type as string)}
            style={{ backgroundColor: !is_last ? "green" : "", color: !is_last ? "white" : "" }}
            onClick={() => toggleModal(is_last, "funded")}
            className=' px-5 py-[1px] outline flex items-center justify-center rounded-lg border       
                hover:border-green-500 hover:bg-green-900 hover:text-white'>
            <h1 className="text-lg">{"Fund"}</h1><MdDone />
        </button>
            <h3>by: {user?.name}</h3>
            </div>
        }
 
 </div>
);
}


interface FundedStatusButtonsProps {
    task: TasksResponse
    is_last: boolean
    user: AppUser
    toggleModal(is_last: boolean, next_status: TasksResponse['status']): void
}

export const FundedStatus = ({is_last, task, toggleModal,user }: FundedStatusButtonsProps) => {
    if (task.type !== "repairs") {
        return null
    }
    return (
        <div className='w-fit h-full flex flex-wrap items-center justify-center gap-2'>
            <ApprovedStatus task={task} user={user} is_last={false} toggleModal={toggleModal}/>
            <div className="flex flex-col items-center justify-center">
            <button
            className='px-5 py-[2px] border flex items-center justify-center rounded-lg text-white bg-green-700'>
            <h1 className="text-lg">{"Funded"}</h1><MdDone />
            </button>
            <h3>by: {task.expand?.funded_by?.name}</h3>
            </div>

            { is_last && 
            <div className="flex flex-col items-center justify-center">
            <button
                disabled={canChangeStatus("in_progress", user?.type as string)}
                style={{ backgroundColor: !is_last ? "green" : "", color: !is_last ? "white" : "" }}
                onClick={() => toggleModal(is_last, "in_progress")}
                className='px-5 py-[1px] outline flex items-center justify-center rounded-lg border       
                hover:border-green-500 hover:bg-green-900 hover:text-white'>

                <h1 className="text-lg">{"Mark In Progress" }</h1><MdDone />
            </button>
            <h3>by: {user?.name}</h3>
            </div>
            }

        </div>
    );
}


interface InProgressStatusButtonsProps {
    task: TasksResponse
    is_last: boolean
    user: AppUser
    toggleModal(is_last: boolean, next_status: TasksResponse['status']): void
}

export const InProgressStatus = ({ is_last, task, toggleModal,user }: InProgressStatusButtonsProps) => {
    if (task.type !== "repairs") {
        return null
    }
    return (
        <div className='w-fit h-full flex flex-wrap items-center justify-center gap-2'>
            <FundedStatus user={user} task={task} is_last={false} toggleModal={toggleModal} />
            <div className="flex flex-col items-center justify-center">
                <button
                     
                    className={`px-5 py-[2px] border flex items-center justify-center rounded-lg text-white bg-green-700`}>
                    <h1 className="text-lg">{"In Progress"}</h1><MdDone />
                </button>
                <h3>by: {task.expand?.marked_in_progress_by?.name}</h3>
            </div>

            {is_last &&
            <div className="flex flex-col items-center justify-center"> 
            <button
                disabled={canChangeStatus("completed", user?.type as string)}
                style={{ backgroundColor: !is_last ? "green" : "", color: !is_last ? "white" : "" }}
                onClick={() => toggleModal(is_last, "completed")}
                className=' px-5 py-[1px] outline flex items-center justify-center rounded-lg border       
                hover:border-green-500 hover:bg-green-900 hover:text-white'
                >

                <h1 className="text-lg">{"Mark Completed"}</h1><MdDone />
            </button>
            <h3>by: {user?.name}</h3>
            </div>
            }

        </div>
    );
}
interface CompletedStatusButtonsProps {
    task: TasksResponse
    user: AppUser
   toggleModal(is_last: boolean, next_status: TasksResponse['status']): void
}

export const CompletedStatus = ({ task, toggleModal,user }: CompletedStatusButtonsProps) => {
    return (
        <div className='w-fit h-full flex flex-wrap items-center justify-center gap-2'>
            <InProgressStatus user={user} task={task} is_last={false} toggleModal={toggleModal} />

            <div className="flex flex-col items-center justify-center">
            <button
            style={{ border: `1px solid ${statusColors[task.status]}` }}
            className={`px-5 py-[2px] border flex items-center justify-center rounded-lg text-white bg-purple-700`}>
            <h1 className="text-lg">{"Completed"}</h1><MdDone />
            </button>
            <h3>by: {task.expand?.marked_completed_by?.name}</h3>
            </div>

        </div>
    );
}

interface RejectedStatusButtonsProps {
    task: TasksResponse
}

export const RejectedStatus = ({ task}: RejectedStatusButtonsProps) => {
    return (
        <div className='w-fit h-full flex flex-wrap items-center justify-center gap-2'>
    
            <div className="flex flex-col items-center justify-center">
                <button
                    
                    style={{ border: `1px solid ${statusColors[task.status]}` }}
                    className={`px-5 py-[2px] outline flex items-center justify-center rounded-lg text-white bg-red-700`}>
                    <h1 className="text-lg">{"Rejected"}</h1><MdDone />
                </button>
                <h3>by: {task.expand?.marked_completed_by?.name}</h3>
            </div>

        </div>
    );
}


function canChangeStatus(next_status: TasksResponse['status'],staff_type:Staff['type']){
    if ((next_status === "approved" || next_status === "rejected") && staff_type==="manager"){
        return true
    }
    if (next_status === "funded" && staff_type === "cashier") {
        return true
    }
    if (next_status === "created" || next_status === "in_progress" || next_status === "completed"){
        return true
    }
    return false
}
