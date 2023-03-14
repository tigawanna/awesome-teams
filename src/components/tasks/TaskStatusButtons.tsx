import { MdCancel, MdDone } from "react-icons/md";
import { TasksResponse, statusColors } from "../../utils/api/tasks";

interface CreatedStatusProps {
    task: TasksResponse
    is_last: boolean
    toggleModal(is_last: boolean, next_status: TasksResponse['status']): void
}

export const CreatedStatus = ({ task, is_last, toggleModal }: CreatedStatusProps) => {
    if(!is_last){
        return null
    }
    if (task.type === "repairs") {
        return (
            <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  className='px-5 py-1 outline flex items-center justify-center gap-2 rounded-xl border
                        hover:border-green-400 hover:bg-green-600'
                        >
                    <h1 className="text-lg">{"Approve" }</h1><MdDone />
                </button>

                {
                    is_last ?
                        <button
                            style={{ backgroundColor: !is_last ? "green" : "", color: !is_last ? "white" : "" }}
                            onClick={() => toggleModal(is_last, "rejected")}
                            className="px-5 py-1 flex items-center bg-red-700justify-center gap-2 border
                             rounded-xl hover:bg-red-600 hover:text-white">
                            <h1 className="text-lg">{"reject"}</h1>
                            <MdCancel /></button> : null
                }
            </div>
        )
    }
    return (
        <button
            style={{ backgroundColor: !is_last ? "green" : "", color: !is_last ? "white" : "" }}
            className='px-5 outline flex items-center justify-center gap-2 rounded-xl 
            hover:outline-2 hover:outline-green-400'>
            <h1 className="text-lg">{"Mark Complete"}</h1><MdDone />
        </button>
    );
}


interface ApprovedStatusButtonsProps {
    task: TasksResponse
    is_last: boolean
    toggleModal(is_last: boolean, next_status: TasksResponse['status']): void
}

export const ApprovedStatus = ({is_last,task,toggleModal}:ApprovedStatusButtonsProps) => {
if(task.type !=="repairs"){
    return null
}
return (
 <div className='w-fit h-full flex flex-wrap items-center justify-center gap-2'>
<CreatedStatus task={task} is_last={false} toggleModal={toggleModal} />
<button  
className='px-5 py-[2px] outline flex items-center justify-center rounded-lg bg-green-700'>
<h1 className="text-lg">{"Approved"}</h1><MdDone />
</button>

    { is_last&&<button
            style={{ backgroundColor: !is_last ? "green" : "", color: !is_last ? "white" : "" }}
            onClick={() => toggleModal(is_last, "funded")}
            className='px-5 py-[2px] outline flex items-center justify-center rounded-lg border-2       
                hover:border-green-500 hover:bg-green-900'>
            <h1 className="text-lg">{"Fund"}</h1><MdDone />
        </button>}
 
 </div>
);
}


interface FundedStatusButtonsProps {
    task: TasksResponse
    is_last: boolean
    toggleModal(is_last: boolean, next_status: TasksResponse['status']): void
}

export const FundedStatus = ({is_last, task, toggleModal }: FundedStatusButtonsProps) => {
    if (task.type !== "repairs") {
        return null
    }
    return (
        <div className='w-fit h-full flex flex-wrap items-center justify-center gap-2'>
            <ApprovedStatus task={task} is_last={false} toggleModal={toggleModal}/>

            <button
            className='px-5 py-[2px] outline flex items-center justify-center rounded-lg bg-green-700'>
            <h1 className="text-lg">{"Funded"}</h1><MdDone />
            </button>

            { is_last && <button
                style={{ backgroundColor: !is_last ? "green" : "", color: !is_last ? "white" : "" }}
                onClick={() => toggleModal(is_last, "in_progress")}
                className='px-5 py-1 outline flex items-center justify-center gap-2 rounded-xl border
                        hover:border-green-400 hover:bg-green-600'>

                <h1 className="text-lg">{"Mark In Progress" }</h1><MdDone />
            </button>}

        </div>
    );
}


interface InProgressStatusButtonsProps {
    task: TasksResponse
    is_last: boolean
    toggleModal(is_last: boolean, next_status: TasksResponse['status']): void
}

export const InProgressStatus = ({ is_last, task, toggleModal }: InProgressStatusButtonsProps) => {
    if (task.type !== "repairs") {
        return null
    }
    return (
        <div className='w-fit h-full flex flex-wrap items-center justify-center gap-2'>
            <FundedStatus task={task} is_last={false} toggleModal={toggleModal} />
            <button
              className={`px-5 py-[2px] outline flex items-center justify-center rounded-lg bg-green-700`}>
                <h1 className="text-lg">{"In Progress"}</h1><MdDone />
            </button>
            {is_last && <button
                style={{ backgroundColor: !is_last ? "green" : "", color: !is_last ? "white" : "" }}
                onClick={() => toggleModal(is_last, "completed")}
                className={
                    `px-5 py-1 outline flex items-center justify-center gap-2 rounded-xl border
                        hover:border-green-400 hover:bg-green-600`}>

                <h1 className="text-lg">{"Mark Completed"}</h1><MdDone />
            </button>}

        </div>
    );
}
interface CompletedStatusButtonsProps {
    task: TasksResponse
  
    toggleModal(is_last: boolean, next_status: TasksResponse['status']): void
}

export const CompletedStatus = ({ task, toggleModal }: CompletedStatusButtonsProps) => {
    return (
        <div className='w-fit h-full flex flex-wrap items-center justify-center gap-2'>
            <InProgressStatus task={task} is_last={false} toggleModal={toggleModal} />
            <button
            style={{ border: `1px solid ${statusColors[task.status]}` }}
            className={`px-5 py-[2px] outline flex items-center justify-center rounded-lg bg-purple-700`}>
                <h1 className="text-lg">{"Completed"}</h1><MdDone />
            </button>

        </div>
    );
}
