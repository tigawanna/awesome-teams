import { useState } from "react";
import { TaskMutationFields } from "../../utils/api/tasks";
import Select from 'react-select'
import { FormInput } from "../../shared/form/FormInput";
import { FormTextArea } from "../../shared/form/FormTextArea";
import { FormSelect } from "../../shared/form/FormSelect";


interface ToDoFormProps {
updating?:boolean
}
// type TaskTypes = "todo" | "repairs" | "recurring" | "other"
interface TaskStatus{
    value:TaskMutationFields['status'],
    label:string
}
export const ToDoForm = ({updating}:ToDoFormProps) => {
const default_tasks:TaskMutationFields={
    title:"",
    description:"",
    status:"submited",
    type:"todo",
    created_by:''
}   
const [input,setInput]=useState<TaskMutationFields>(default_tasks)
const [error,setError]=useState({name:"",message:""})
const [taskType, setTaskType] = useState("todo")

const task_type_options = [
        { value: 'todo', label: 'ToDo' },
        { value: 'repairs', label: 'Repairs' },
        { value: 'recurring', label: 'Recurring' },
        { value: 'other', label: 'Other' },
]
const status_options = [
    { value: 'submited', label: 'Submited' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value:"cancelled",label:"Cancelled"},
    {value:"approved",label:"Approved"},
    {value:"funded",label:"Funded"},
] satisfies TaskStatus[]


const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setInput((prev) => {
            return { ...prev, [e.target.id]: e.target.value };
        });
        if (error.message !== "" || error.name !== "") {
            setError({ name: "", message: "" });
        }
};

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log("about to save ",input)
        // mutation.mutate(input);
    };

return (
 <div className='w-full min-h-screen  flex flex-col items-center justify-center bg-purple-900 
 scroll-bar overflow-y-scroll'>
        <Select 
        options={task_type_options}
        defaultValue={task_type_options[0]}
        className="w-[90%] md:w-[60%] "
        onChange={(e)=>{
        if(e){
            setTaskType(e.value)
        }
        }}
        />
    <form className="w-full md:w-[60%] h-full flex flex-col items-center justify-center  p-2 ">

{
    updating?<FormSelect<TaskMutationFields>
    error={error}
    input={input}
    label="Status"
    prop="status"
    select_options={status_options}
    setInput={setInput}
    />
    :null
}


        <FormInput
        error={error}
        handleChange={handleChange}
        input={input}
        label="Title"
        prop="title"
        type="text"
        />

        <FormTextArea
        error={error}
        handleChange={handleChange}
        input={input}
        label="Description"
        prop="description"
        />




    </form>




 </div>
);
}
