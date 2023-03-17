import { MdCancel, MdDone } from "react-icons/md";
import { Staff, TasksResponse, statusColors } from "../../utils/api/tasks";
import { AppUser } from "../../utils/types/base";

interface CreatedStatusProps {
    task: TasksResponse
    is_last: boolean
    user:AppUser
    toggleModal(is_last: boolean, next_status: TasksResponse['status'],message:string): void
}

export const CreatedStatus = ({ task, is_last, toggleModal,user }: CreatedStatusProps) => {
    if(!is_last){
        return null
    }
    if (task.type === "repairs") {
        return (
            <div className="flex flex-wrap items-center justify-center gap-2">
                <ActionButton
                    is_last={is_last}
                    next_state="approved"
                    toggleModal={toggleModal}
                    has_authority={"manager"}
                    user={user}
                />


                {
                    is_last ?
                        <ActionButton
                            is_last={is_last}
                            next_state="rejected"
                            toggleModal={toggleModal}
                            has_authority={"manager"}
                            user={user}
                        />
                        
    

                            : null
                }
            </div>
        )
    }
    return (
        <ActionButton
            is_last={is_last}
            next_state="completed"
            toggleModal={toggleModal}
            user={user}
        />
    );
}


interface ApprovedStatusButtonsProps {
    task: TasksResponse
    is_last: boolean
    user: AppUser
    toggleModal(is_last: boolean, next_status: TasksResponse['status'], message: string): void
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
<h3>on: {task.approved_on ?? "--:--:--"}</h3>
</div>

    { is_last&&
            <ActionButton
                is_last={is_last}
                next_state="funded"
                toggleModal={toggleModal}
                has_authority={"cashier"}
                user={user}
            />
            }
 
 </div>
);
}


interface FundedStatusButtonsProps {
    task: TasksResponse
    is_last: boolean
    user: AppUser
    toggleModal(is_last: boolean, next_status: TasksResponse['status'], message: string): void
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
                <h3>on: {task.funded_on ?? "--:--:--"}</h3>
            </div>

            { is_last && 
                <ActionButton
                    is_last={is_last}
                    next_state="in_progress"
                    toggleModal={toggleModal}
                    user={user}
                />
            }

        </div>
    );
}


interface InProgressStatusButtonsProps {
    task: TasksResponse
    is_last: boolean
    user: AppUser
    toggleModal(is_last: boolean, next_status: TasksResponse['status'], message: string): void
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
                <h3>on: {task.marked_in_progress_on ?? "--:--:--"}</h3>
            </div>

            {is_last &&
            <ActionButton
    
            is_last={is_last}
            next_state="completed"
            toggleModal={toggleModal}
            user={user}
            />

            }

        </div>
    );
}
interface CompletedStatusButtonsProps {
    task: TasksResponse
    user: AppUser
    toggleModal(is_last: boolean, next_status: TasksResponse['status'], message: string): void
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
            <h3>on: {task.completed_on ?? "--:--:--"}</h3>
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
                <h3>on: {task.rejected_on??"--:--:--"}</h3>
            </div>

        </div>
    );
}


interface ActionButtonProps {
    next_state: TasksResponse['status']
    has_authority?:Staff['type']
    user: AppUser
    is_last: boolean
    toggleModal(is_last: boolean, next_status: TasksResponse['status'], message: string): void
}


type StatusMap = {
    [key in TasksResponse['status']]:string 
}

export function ActionButton({is_last,toggleModal,user,next_state,has_authority}:ActionButtonProps){
   
    const statusMap:StatusMap={
    "created":"Approve",
    "approved":"Approve",
    "funded":"Fund",
    "in_progress": "Mark in progress",
    "completed":"Mark Completed",
    "rejected":"Reject"
   } 


return (
    <div className="flex flex-col items-center justify-center">
        <button
            disabled={!canChangeStatus(next_state, user?.type as string)}
            style={{
                backgroundColor: !is_last ? "green" : "", color: !is_last ? "white" : "",
                filter: !canChangeStatus(next_state, user?.type as string) ? "brightness(0.5)" : ""
            }
            }
            onClick={() => toggleModal(is_last, next_state, statusMap[next_state])}
            className=' px-5 py-[1px]  flex items-center justify-center rounded-lg border       
                hover:border-green-500 hover:bg-green-600 hover:text-white '
        >
        <h1 className="text-lg">{statusMap[next_state]}</h1><MdDone />
        </button>
           <h3 className="text-xs">
              {!canChangeStatus(next_state, user?.type as string) ? `${has_authority} only action` : user?.name}
            </h3>
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
