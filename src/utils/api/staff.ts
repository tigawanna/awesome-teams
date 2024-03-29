// fetch a paginated records list

import { pb } from "../pb/config";

export interface StaffResponse {
  id: string
  collectionId: string
  collectionName: string
  username: string
  verified: boolean
  emailVisibility: boolean
  email: string
  created: string
  updated: string
  name: string
  type: string
  avatar: string
}

type InjectedQueryFnProps = {
    queryKey: any[];
    signal: AbortSignal;
    pageParam: number;
    meta: Record<string, unknown> | undefined;
}

export async function getStaff(props: InjectedQueryFnProps, keyword?: string) {
    try {
        const resultList = await pb.collection('staff').getList<StaffResponse>(props.pageParam,50, {
            filter: `name ~"${keyword}"`,
            sort: '-created',
        
        });
      
        return resultList
    } catch (error) {
        throw error;
    }


}

export async function getStaffById(id: string) {
    try {
        const record = await pb.collection('staff').getFirstListItem<StaffResponse>(`id="${id}"`, {
            // expand: 'relField1,relField2.subRelField',
        });

        return record
    } catch (error) {
        throw error;
    }
}

export async function addStaff(data:StaffResponse){
    try {
    const record = await pb.collection('staff').create<StaffResponse>(data);
        return record
    } catch (error) {
        throw error;
    }

}

export async function updateStaff(id: string,data:StaffResponse) {
try {
    const record = await pb.collection('staff').update<StaffResponse>(id, data);
    return record
} 
catch (error) {
    throw error
}
}

export async function deleteStaff(id: string) {
    try{
        await pb.collection('staff').delete('RECORD_ID');
    }
    catch(error){
        throw error
    }
}


export interface StaffLeaveResponse {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string

    leave_type: "sick" | "annual" | "maternity" | "other";
    leave_reason: string
    leave_start: string
    leave_end: string
    leave_requested_by: string
    leave_approved_by: string
    leave_approved_on?: string

    leave_rejected_on?: string
    leave_rejected_by?: string


    leave_request_status: "approved" | "rejected" | "pending";
    remaining_leave_days: number
    remaining_sick_leave_days: number

    expand:StaffLeaveResponseExpand
}

interface StaffLeaveResponseExpand{
    leave_approved_by:StaffResponse;
    leave_requested_by:StaffResponse;
}


export interface StaffLeaveMutationFields {
    leave_type: "sick" | "annual" | "maternity" | "other";
    leave_reason: string
    leave_start: string
    leave_end: string
    leave_requested_by: string
    leave_approved_by?: string
    leave_approved_on?:string
    leave_rejected_on?:string
    leave_rejected_by?:string


    leave_request_status: "approved" | "rejected" | "pending";
    remaining_leave_days: number
    remaining_sick_leave_days: number
}


export async function addStaffLeaveRequest(data: StaffLeaveMutationFields) {
   try {
    const record = await pb.collection('staff_details').create<StaffLeaveResponse>(data);
     return record
   } catch (error) {
    throw error;
   }
}

export async function updateStaffLeaveRequest(data : StaffLeaveResponse) {
    try {
        const record = await pb.collection('staff_details').update<StaffLeaveResponse>(data.id, data);
        return record
    } catch (error) {
        throw error;
    }
}

export async function searchForRequestedStaffLeave(staff_id:string) {
    try {
        const record = await pb.collection('staff_details')
            .getFirstListItem<StaffLeaveResponse>(`leave_requested_by="${staff_id}"`, {
                sort: '-created',
                expand:'leave_approved_by,leave_requested_by'
        });
        return record
    } catch (error) {
        throw error;
    }
}

export async function getStaffLeaveByID(leave_id: string) {
    try {
        const record = await pb.collection('staff_details')
            .getFirstListItem<StaffLeaveResponse>(`id="${leave_id}"`, {
                sort: '-created',
                expand: 'leave_approved_by,leave_requested_by'
            });
        return record
    } catch (error) {
        throw error;
    }
}
export async function getStaffLeaves(props:InjectedQueryFnProps,filter_params:string) {
    try{
        const resultList = await pb.collection('staff_details').getList<StaffLeaveResponse>(props.pageParam, 50, {
            filter:filter_params,
            sort: '-created',
            expand: 'leave_approved_by,leave_requested_by'
        });
        return resultList
    }catch(error){
        throw error
    }
}

export async function getStaffLeavesFullList(filter_params:string) {
    try {
        const resultList = await pb.collection('staff_details').getFullList<StaffLeaveResponse>({
            filter: filter_params,
            sort: '-created',
            expand: 'leave_approved_by,leave_requested_by'
        });
        return resultList
    } catch (error) {
        throw error
    }
}

export async function approveLeave(leave_request:StaffLeaveResponse){
try{
    const record = await pb.collection('staff_details').update<StaffLeaveResponse>(leave_request.id,leave_request,{
        sort: '-created',
        expand:'leave_approved_by,leave_requested_by'
    })
    return record
}
catch(error){
throw error
}
}
