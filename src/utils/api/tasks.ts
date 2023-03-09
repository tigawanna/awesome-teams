import { pb } from "../pb/config"


export interface Staff {
  avatar: string
  collectionId: string
  collectionName: string
  created: string
  email: string
  emailVisibility: boolean
  id: string
  name: string
  type: string
  updated: string
  username: string
  verified: boolean
  expand:{}
}

interface StaffExpand{
  created_by:Staff;
  funded_by?:Staff;
  approved_by?:Staff;
  marked_completed_by?:Staff;
}


export interface TasksResponse {
  id: string
  collectionId: string
  collectionName: string
  created: string
  updated: string
  

  title: string
  description: string

  type:"todo" |"repairs" | "maintenance" | "recurring" | "other";
  status: "created" | "approved" | "funded" |"in_progress" | "completed" | "cancelled";
  frequency?:"once"|"daily"|"weekly"|"monthly"|"yearly"|"never"

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
  
  expand?:StaffExpand
}


export type TaskMutationFields = Omit<TasksResponse, 'id' | 'collectionId' | 'collectionName' | 'created' | 'updated'>
//  export type TodoTaskSubType = Omit<TasksResponse, 'id' | 'collectionId' | 'collectionName' | 'created' | 'updated' |
//  'approved_by'|'approved_on'|'funded_by'|'funded_on'|'quotaion'|''>
//export type ReapirsTaskSubType = Pick<TasksResponse, 'id'| 'collectionId' | 'collectionName' | 'created' | 'updated' | 'approved_by'|'approved_on'|'funded_by'|'funded_on'|'quotaion'>

export type TaskResponeseSubType = Pick<TasksResponse, 'id' | 'collectionId' | 'collectionName' | 'created' | 'updated'
|'title'|'description'|'status'|'frequency'|'completed_on'|'marked_completed_by'|'deadline'>


type TaskStatusColor = {
  [key in TasksResponse['status']]: string
}
  export const statusColors:TaskStatusColor = {
        "created": "#330c4a",
        "approved": "#FFC107",
        "funded": "#00BCD4",
        "in_progress": "#22fa0a",
        "completed": "#d0aae6",
        "cancelled": "#F44336"
    } 



export const getOneTask = async(id?:string)=> {
try {
const record = await pb.collection('tasks').getFirstListItem<TasksResponse>(`id  = "${id}"`, {
    expand:'created_by,funded_by,marked_completed_by,approved_by'
});
  // console.log("record  ======= >>> ",record)
  return record
} catch (error) {
    console.log("error getting tasks ===== ", error);
  throw error;
}
}


export const getTasks = async(keyword?:string)=> {
try {
    const res = await pb.collection('tasks').getList<TasksResponse>(1, 10, {
      filter: `title  ~ "${keyword}"`,
      sort: '-created',
      expand:'created_by,funded_by,marked_completed_by,approved_by'
     
  })
  // console.log("keyword  ===== ",keyword)
  // console.log("tasks response  === ",res)
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
