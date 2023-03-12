import { useMachine } from "@xstate/react";
import { TasksResponse } from "../../utils/api/tasks";
import { repairTaskMachine } from "../../utils/api/machines/repairTaskMachine";




interface StateMachineProps {
task:TasksResponse
}

export const StateMachine = ({task}:StateMachineProps) => {


const [state,send]=useMachine(repairTaskMachine)

console.log("state   = ",state.machine?.states['approved'].after)

const states_obj=state.machine?.states
return (
 <div className='w-full h-full flex flex-col items-center justify-center '>
    {JSON.stringify(state.value)}

    state machine




            <div className='w-full h-full flex flex-wrap items-center justify-center gap-2'>
                {
                states_obj&&Object.entries(states_obj).map(([keys,values],key)=>{
                    // console.log("items   = ", values)
                        return(
                            <div key={key}
                            style={{filter:state.value === keys?"":"blur(1px)" }}
                            className='p-2 h-full flex flex-col items-center justify-center 
                            border rounded-lg'>
                                <h1 className=" text-xl ">{keys}</h1>
                                {
                                values.events.map((event,key)=>{
                                 return(
                                    <button key={key} 
                                    style={{backgroundColor:event==="reject"?"red":"green"}}
                                    className="w-full px-5 p bg-slate-600 rounded-lg m-2"
                                         onClick={() =>send(event)}>
                                         {event}
                                     </button>
                                 )
                                })

                                }
                     
                            </div>
                        )
                    })
            
             }

                
            </div>
 </div>
);
}
