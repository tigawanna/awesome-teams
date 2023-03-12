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
        console.log("record  ===== ",resultList,props)
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
