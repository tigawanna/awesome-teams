import { useState } from "react";
import { TaskMutationFields, TasksResponse, addTask } from "../../utils/api/tasks";
import Select from 'react-select'
import { FormInput } from "../../shared/form/FormInput";
import { FormTextArea } from "../../shared/form/FormTextArea";
import { FormSelect } from "../../shared/form/FormSelect";
import { FormCheckBox } from "../../shared/form/FormCheckbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppUser } from "../../utils/types/base";
import { PlainFormButton } from "../../shared/form/FormButton";
import { concatErrors } from "../../utils/utils";
import { ListResult } from "pocketbase";


interface ToDoFormProps {
    updating?: boolean
    user: AppUser
}
// type TaskTypes = "todo" | "repairs" | "recurring" | "other"
interface TaskStatus {
    value: TaskMutationFields['status'],
    label: string
}
interface TaskFrequencyTypes {
    value: TaskMutationFields['frequency'],
    label: string
}

export const TaskForm = ({ updating,user }: ToDoFormProps) => {
    const queryClient = useQueryClient()
    const default_tasks: TaskMutationFields = {
        title: "",
        description: "",
        status: "submited",
        type: "todo",
        created_by: user?.id as string,
        should_email:false,
        quotation:"",
        deadline: new Date().toISOString().split('T')[0]
    }
    const [input, setInput] = useState<TaskMutationFields>(default_tasks)
    const [error, setError] = useState({ name: "", message: "" })
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
        { value: "cancelled", label: "Cancelled" },
        { value: "approved", label: "Approved" },
        { value: "funded", label: "Funded" },
    ] satisfies TaskStatus[]

    const task_frequency_options = [
        { value: "once", label: "Once" },
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'yearly', label: 'Yearly' },
        { value: "calculated", label: "Calculated" },
    ] satisfies TaskFrequencyTypes[]

  
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setInput((prev) => {
            return { ...prev, [e.target.id]: e.target.value };
        });
        if (error.message !== "" || error.name !== "") {
            setError({ name: "", message: "" });
        }
    };

    
    const mutation = useMutation({
        mutationFn:(input:TaskMutationFields) => addTask(input),
        onError(error, variables, context) {
            setError({ name: "", message:concatErrors(error)});
        },
        onSuccess(data, variables, context) {
         queryClient.setQueryData<ListResult<TasksResponse> | undefined>(['tasks'], (oldData)=>{
            if(data.id && oldData){
                return {
                ...oldData,
                items: [...oldData?.items,data]
             }
          }
           return oldData
         })
        },
    })
   
    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log("about to save ",input)
        mutation.mutate(input);
    };

    return (
    <div className='w-full min-h-screen  flex flex-col items-center justify-center bg-purple-900 
    scroll-bar overflow-y-scroll'>
            <Select
                options={task_type_options}
                defaultValue={task_type_options[0]}
                className="w-[90%] md:w-[60%] "
                onChange={(e) => {
                    if (e) {
                        setTaskType(e.value)
                    }
                }}
            />
            <form onSubmit={handleSubmit}
            className="w-full md:w-[60%] h-full flex flex-col items-center justify-center  p-2 ">

                {
                    updating ?
                        <FormSelect<TaskMutationFields>
                            error={error}
                            input={input}
                            label="Status"
                            prop="status"
                            select_options={status_options}
                            setInput={setInput}
                        />
                        : null
                }

                <FormSelect<TaskMutationFields>
                    error={error}
                    input={input}
                    label="Frequency"
                    prop="frequency"
                    select_options={task_frequency_options}
                    setInput={setInput}
                />
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
                <div className="w-[95%] flex items-center justify-center">
                    <FormInput<TaskMutationFields>
                        error={error}
                        handleChange={handleChange}
                        input={input}
                        label="Deadline"
                        prop="deadline"
                        type="date"
                        input_props={{
                            min: new Date().toISOString().split('T')[0],
                            max: new Date('2025').toISOString().split('T')[0],
                            style: {
                                width:'min-content'
                            }
                        }}
                    />
                    <FormCheckBox<TaskMutationFields>
                        error={error}
                        setInput={setInput}
                        input={input}
                        label="Send email"
                        prop="should_email"
                        input_props={{
                            checked: input.should_email,
                            style:{
                                width: "40%",
                            }
                        }}
                    />

                </div>
   

                <FormInput
                    error={error}
                    handleChange={handleChange}
                    input={input}
                    label="Google Doc Quotaion link"
                    prop="quotation"
                    type="url"
                />
      

                    <PlainFormButton
                    disabled={mutation.isPending}
                    isSubmitting={mutation.isPending}
                    label="Submit"
                    />

                <div className="m-1 w-[90%] flex  flex-col items-center justify-center">
                    {error?.message !== "" ? (
                        <div
                            className="m-1 w-full text-center  line-clamp-4 p-2 bg-red-100 border-2 
                        border-red-800 text-red-900  rounded-xl"
                        >
                            {error.message}
                        </div>
                    ) : null}
                </div>
            </form>




        </div>
    );
}
