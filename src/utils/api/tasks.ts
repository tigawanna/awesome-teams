// interface TodoTasksDetails{
//   id: string
//   collectionId: string
//   collectionName: string
//   created: string
//   updated: string

import { pb } from "../pb/config"


//   title: string
//   description: string

//     completed: boolean;
//     created_by:string
//     updated_by:string
//      status:"in_progress" | "completed" | "cancelled";
//     deadline:string;

// }

// interface RepairsTaskRDetails {
//   id: string
//   collectionId: string
//   collectionName: string
//   created: string
//   updated: string


//   title: string
//   description: string
//     completed: boolean;
//     status: "submited" | "approved" | "funded" |"in_progress" | "completed" | "cancelled";
    
//     approved_on?:string,
//     funded_on?:string,
//     completed_on?:string,
//     quotation?:string
//     deadline: string;

// }


// interface RecurringTaskDetails{
//   id: string
//   collectionId: string
//   collectionName: string
//   created: string
//   updated: string


// title: string
// description: string
// completed: boolean;
// completed_on:string
// marked_completed_by:string;
// status: "in_progress" | "completed" | "cancelled";
// frequency?:"daily"|"weekly"|"monthly"|"yearly"|"calculated"
// }

export interface TasksResponse {
  id: string
  collectionId: string
  collectionName: string
  created: string
  updated: string


  title: string
  description: string

  type:"todo" |"repairs" | "maintenance" | "recurring" | "other";
  status: "submited" | "approved" | "funded" |"in_progress" | "completed" | "cancelled";
  frequency?:"once"|"daily"|"weekly"|"monthly"|"yearly"|"calculated"

  created_by: string
  updated_by?: string

  approved_on?: string
  approved_by?: string

  funded_on?: string
  funded_by?: string
  
  
  completed_on?: string
  marked_completed_by?: string
  
  quotation?: string
  deadline?: string
  should_email:boolean

}


export type TaskMutationFields = Omit<TasksResponse, 'id' | 'collectionId' | 'collectionName' | 'created' | 'updated'>
//  export type TodoTaskSubType = Omit<TasksResponse, 'id' | 'collectionId' | 'collectionName' | 'created' | 'updated' |
//  'approved_by'|'approved_on'|'funded_by'|'funded_on'|'quotaion'|''>
//export type ReapirsTaskSubType = Pick<TasksResponse, 'id'| 'collectionId' | 'collectionName' | 'created' | 'updated' | 'approved_by'|'approved_on'|'funded_by'|'funded_on'|'quotaion'>

export type TaskResponeseSubType = Pick<TasksResponse, 'id' | 'collectionId' | 'collectionName' | 'created' | 'updated'
|'title'|'description'|'status'|'frequency'|'completed_on'|'marked_completed_by'|'deadline'>



export const getTasks = async(keyword?:string)=> {
try {
    const res = await pb.collection('tasks').getList<TasksResponse>(1, 5, {
      filter: `title  ~ "${keyword}"`,
      sort: '-created',
     
  })
  console.log("keyword  ===== ",keyword)
  console.log("tasks response  === ",res)
  return res
} catch (error) {
    console.log("error getting tasks ===== ", error);
  throw error;
}
}

export const addTask = async (data: TaskMutationFields) => {
try {
    const record = await pb.collection('tasks').create(data);
    return record as unknown as TasksResponse;
} catch (error) {

  console.log("error adding new task ===== ", error);
  throw error;
}
}
