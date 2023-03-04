// interface TodoTasksDetails{
//   id: string
//   collectionId: string
//   collectionName: string
//   created: string
//   updated: string


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
  frequency?:"daily"|"weekly"|"monthly"|"yearly"|"calculated"

  created_by: string
  updated_by?: string
  approved_by?: string
  financed_by?: string
  marked_completed_by?: string

  approved_on?: string
  funded_by?:string
  funded_on?: string
  completed_on?: string
  quotaion?: string
  deadline?: string

}
export type TaskMutationFields = Omit<TasksResponse, 'id' | 'collectionId' | 'collectionName' | 'created' | 'updated'>
//  export type TodoTaskSubType = Omit<TasksResponse, 'id' | 'collectionId' | 'collectionName' | 'created' | 'updated' |
//  'approved_by'|'approved_on'|'funded_by'|'funded_on'|'quotaion'|''>
//export type ReapirsTaskSubType = Pick<TasksResponse, 'id'| 'collectionId' | 'collectionName' | 'created' | 'updated' | 'approved_by'|'approved_on'|'funded_by'|'funded_on'|'quotaion'>

export type TaskResponeseSubType = Pick<TasksResponse, 'id' | 'collectionId' | 'collectionName' | 'created' | 'updated'
|'title'|'description'|'status'|'frequency'|'completed_on'|'marked_completed_by'|'deadline'>


