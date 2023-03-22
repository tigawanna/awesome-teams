# Affirm

A task management toolf for small teams or small companies
The current implemenation is based on the the needs of a property management team but can be made as generic as needed

working in in property mangement role exposesd som eof the super specific issues that the app is trying to odder more elegant solutions to
- the ability to create/edit/update tasks with scoed roles for all the staff and still have everyone on the same page
- leave requset and a nice dashboard that allows you to pick days noy yet picked by other staff for your next leave


# The Stack 
 Front-end is in React , and given most of it will be behind a login screen it's all client rendered
    - vite and typescript
    - tailwindcss
    - react-router for the routing
   - react-query for erver state management
   - rect-select, react-calenedr , react-modal
   - dayjs for date formating
   - playwringth ror E2E tests

 Back-end is in [Pocketbase](https://pocketbase.io/) and open source BAAS written in Go , with JS and  Flutter SDKS.
 it's fast highly extensible with the hooks thye expose and has it all databse/storage/authentication + ouath provoders ...

# [Pages](src\routes\routes.tsx)
- [Home route](src\pages\home) : the default route , tasks will be loaded here
- [Auth route](src\pages\auth) : the login route
- [Portal route](src\pages\portal) : the portal route , leave requests will be done here 
- [Staff route](src\pages\staff): the staff page



# Models/Interfaces

[staff](src\utils\api\staff.ts)
```ts
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
```

[tasks](src\utils\api\tasks.ts)

```ts
export interface TasksResponse {
  id: string
  collectionId: string
  collectionName: string
  created: string
  updated: string
  

  title: string
  description: string

  type:"todo" |"repairs" | "maintenance" | "recurring" | "other";
  status: "created" | "approved" | "funded" |"in_progress" | "completed" | "rejected";
  frequency?:"once"|"daily"|"weekly"|"monthly"|"yearly"|"never"

  created_by: string
  updated_by?: string

  approved_on?: string
  approved_by?: string

  funded_on?: string
  funded_by?: string
  marked_in_progress_on?:string
  rejected_on?:string

  
  completed_on?: string
  marked_completed_by?: string
  rejected_by?:string
  marked_in_progress_by?:string

  
  quotation?: string
  deadline?: string
  should_email:boolean

  expand?:StaffExpand
}

```

# Notable moments

### react-query query invalidation

- tanstack-quert v5 beta , now lets you define 
query invalidation logic directily in the global query client config

```ts
const queryClient:QueryClient = new QueryClient({
  mutationCache:new MutationCache({
    onSuccess: async (data, variable, context, mutation) => {

      if (Array.isArray(mutation.meta?.invalidates)) {
        return queryClient.invalidateQueries({
          queryKey:mutation.meta?.invalidates
        })
      }
    }
  })
})

```
and now if we pass in a meta (array of stirings that we used as the queryKey)

```ts
const mutation = useMutation({
        mutationFn: (input:StaffLeaveMutationFields) => addStaffLeaveRequest(input),
        meta: {
            invalidates: ["staff_leaves", " "]
       },
        onError(error, variables, context) {
            setError({ name: "main", message: concatErrors(error) });
        },
        onSuccess(data, variables, context) {
        store.updateNotification({type:"success",message:"leave request successfully sent"})
            setOpen(false)
        },
})
```

we ca also define a finer invalidation that populates the cache with
the mutation response instaed if an entire refetch like is happening in the above code

```ts
const queryClient:QueryClient = new QueryClient({
  mutationCache:new MutationCache({
    onSuccess: async (data, variable, context, mutation) => {
      
      //  to update query cache list items by pocketbase pagianted list queries
      if (Array.isArray(mutation.meta?.updatelistitems)) {
        const update_list_key = mutation.meta?.updatelistitems as string[]
        return queryClient.setQueryData(update_list_key, (oldData?:ListResult<Record>) => {
          const q_data = data as Record
  
          if (q_data.id && oldData) {
            const updatedItems = oldData.items.map((item) => {
              if (item.id === q_data.id) {
                // Return the new object if the id matches
                return q_data;
              }
              // Otherwise, return the current item
              return item;
            });

            // Return the updated data with the new items array
            return {
              ...oldData,
              items: updatedItems,
            };
          }


          return oldData
        })
      }



    }
  })
})

```

### react query queries / infinite-queries

Every react-query function needs a queryKey and a queryFn that returns a promise

it can be expressed as 

```ts
const getStuff = async () => {
  try {
    const res = await fetch('https://dummyjson.com/todos')
    const stuff = await res.json()
    return stuff
  } catch (error) {
    throw error
  }
}

const query = useQuery({
    queryKey:['stuff'],
    queryFn:getStuff
})

```

oR to fetch one item from the api

```ts
const getStuff = async (id:number) => {
  try {
    const res = await fetch(`https://dummyjson.com/todos/${id}`)
    const stuff = await res.json()
    return stuff
  } catch (error) {
    throw error
  }
}
cost id  = 1

const query = useQuery({
    queryKey:['stuff',id],
    queryFn:()=>getStuff(id)
})
```

both n infifnte queries is valide but there's some extra params  that get injected into our callback function which would be easier to access/type properly using the d2dn method

```ts
type InjectedQueryFnProps = {
    queryKey: any[];
    signal: AbortSignal;
    pageParam: number;
    meta: Record<string, unknown> | undefined;
}

const getStuff = async (id:number,params:InjectedQueryFnProps) => {
  try {
    const res = await fetch(`https://dummyjson.com/todos/${id}`)
    const stuff = await res.json()
    return stuff
  } catch (error) {
    throw error
  }
}
cost id  = 1
const query = useInfiniteQuery({
    queryKey:['stuff',id],
    queryFn:(params:InjectedQueryFnProps)=>getStuff(id,params)
})
```

the pocketbase API also autogenerates REST APIS for you which include 
a paginated one which we can take advantage of in the above code example

```ts
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

```
with out writing anymore lofiv hitting the load more button loads cancats your list
of staff to the existing one for that infinite scroll 

### pocketbase 
