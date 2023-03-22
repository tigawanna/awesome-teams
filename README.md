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

<details>
<summary>Expand staff interface </summary>

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


</details >

[tasks](src\utils\api\tasks.ts)

<details>
<summary> Click to expand task interface</summary>

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
</details>

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

## react query 
### queries / infinite-queries

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

## pocketbase 

### GET requests
they can be of three types

```ts

// fetch a paginated records list
const resultList = await pb.collection('tasks').getList(1, 50, {
    filter: 'created >= "2022-01-01 00:00:00" && someField1 != someField2',
});

// you can also fetch all records at once via getFullList
const records = await pb.collection('tasks').getFullList({
    sort: '-created',
});

// or fetch only the first record that matches the specified filter
const record = await pb.collection('tasks').getFirstListItem('someField="test"', {
    expand: 'relField1,relField2.subRelField',
})
```
all the methods support generics and will give you a typed response which is awesome


```ts

interface TaskResponse{
id:string,
......
}
// fetch a paginated records list
const resultList = await pb.collection('tasks').getList<TaskResponse>(1, 50, {
    filter: 'created >= "2022-01-01 00:00:00" && someField1 != someField2',
});

// you can also fetch all records at once via getFullList
const records = await pb.collection('tasks').getFullList<TaskResponse>({
    sort: '-created',
});

// or fetch only the first record that matches the specified filter
const record = await pb.collection('tasks').getFirstListItem<TaskResponse>('someField="test"', {
    expand: 'relField1,relField2.subRelField',
})

```

- image thumbnail generation: 
    this is a sidenote but if you have a media heavy app you can use pocketbase's ability to return an image thumbnail by adding thb='100x100' to the query string , thus allows you to load a poor quality image as the placeholder while the main image loads

## App features

### Task management
You can add a task of type TODO or repair .
the main difference is that Reairs need approval and funding steps while todos can only be marked complete
the approve/reject process is reserved for mangers only and funding is for cashiers , the respective buttons will be disabled with messages indicating who can perfom that task

Logged in as caretaker
![approve reject as caretaker](docs\images\approve_recject.png)

logged in as manager
![approve reject as manager](docs\images\manager_approve.png)

This is also enforcedin the backed using Pocketbases BeforeUpdateRecordHook

<details>
<summary>VClick to expand code snippet</summary>


```go
// record_update_handler.go

package main

import (
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
)



func handleRecordUpdate(e *core.RecordUpdateEvent) error {
	
	// ignore checks if an admin is logged in 
		admin, _ := e.HttpContext.Get(apis.ContextAdminKey).(*models.Admin)
    	if admin != nil {
        	return nil
    	}

	//  before updating tasks  tasks collecton
	if e.Record.Collection().Name == "tasks" {
		
// check for the user logged in 
	 authRecord, _ := e.HttpContext.Get(apis.ContextAuthRecordKey).(*models.Record)
		if authRecord == nil {
			return apis.NewForbiddenError("Only auth records can access this endpoint", nil)
	 }


		// validating that mangers only are approving/rejecting
		if authRecord.GetString("type") != "manager" && 
				(e.Record.GetString("status") == "approved" || e.Record.GetString("status") == "rejected") {
			return apis.NewBadRequestError("Approving/Rejecting is a Manager only action.", nil)
		}
		// validating that cashiers only are funding
		if authRecord.GetString("type") != "cashier" && e.Record.GetString("status") == "funded" {
			return apis.NewBadRequestError("Funding is a Cashier only action.", nil)
		}
	}

	//  checks for staff_details collection
	if e.Record.Collection().Name == "staff_details" {
		

	 authRecord, _ := e.HttpContext.Get(apis.ContextAuthRecordKey).(*models.Record)
		if authRecord == nil {
			return apis.NewForbiddenError("Only auth records can access this endpoint", nil)
	 }


		// validating that mangers only are approving/rejecting
		if authRecord.GetString("type") != "manager" && 
				(e.Record.GetString("leave_request_status") == "approved" || 
					e.Record.GetString("leave_request_status") == "rejected") {
			return apis.NewBadRequestError("Approving/Rejecting is a Manager only action.", nil)
		}

		

	}

	return nil
}

```
</details>



### Staff management (Leave requests)
 under portal is a staff management page where you can requsets for a leave and your manager aacn then approve/reject it.
 It stops you from requesting a new leave if you already have a pending request

<details>
<summary>Click to expand code snippet</summary>

```go
// record_update_handler.go

package main

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
)

func handleRecordCreate(e *core.RecordCreateEvent , app *pocketbase.PocketBase) error {
	
	// Ignore checks if an admin is logged in 
	admin, _ := e.HttpContext.Get(apis.ContextAdminKey).(*models.Admin)
	if admin != nil {
		return nil
	}

	// Check for staff_details collection
	if e.Record.Collection().Name == "staff_details" {
		
		// Check if the user has requested any leaves with status equal to pending
		authRecord, _ := e.HttpContext.Get(apis.ContextAuthRecordKey).(*models.Record)
		if authRecord == nil {
			return apis.NewForbiddenError("Only auth records can access this endpoint", nil)
		}
		
		// Check if the user has requested any leaves with status equal to pending
		var total int
		err := app.DB().
			Select("count(*)").
			From("staff_details").
			AndWhere(dbx.HashExp{"leave_request_status": "pending"}).
			AndWhere(dbx.HashExp{"leave_requested_by":authRecord.GetId()}).
			Row(&total)

		if err != nil {
			return err
		}

		if total > 0 {
			return apis.NewBadRequestError("User already has pending leave requests", nil)
		}
	}

	return nil
}

```
</details>

it also makes use of React Calender to hightlight the days that have already been picked and disable them on the calender view

```ts
        function tileDisabled({ date, view }:CalendarTileProperties) {
        const disabledRanges=taken_leave_ranges?.map((range)=>{
            return [new Date(range[0]),new Date(range[1])]
          })

        if (view === 'month') {
            if(disabledRanges)
            return isWithinRanges(date, disabledRanges);
          
        }
        return false
    }

    function isWithinRange(date:Date, range:Date[]) {
        return isWithinInterval(date, { start: range[0], end: range[1] });
    }

    function isWithinRanges(date:Date, ranges:Date[][]){
        return ranges.some(range => isWithinRange(date, range));
    }
```

 then we passit into the calender

```tsx
        <Calendar
            value={rngs.dateRange as [Date | null, Date | null]}
            onChange={rngs.updateDateRange}
            selectRange={true}
            tileDisabled={tileDisabled}
        />
```

### [Custom Form Component](src\shared\form)
Forms can be quite messyy in react , so i made a bunch of custom inputs and a custom hook to tie them all together

community made solutions like [react-hook-form](https://react-hook-form.com/) always had gotchas that would bite you've already migrarted so much of your code to it. it's use of useRef made it bad for instances where i needed it to re-render the page on every keystroke , for example having a button that's disaled until something is typed into an inutbox took me forever to try to implemnt unsuccefully until i just reverted back to useStae based form management and it worked so i don't consider it anymore

```ts
import { UseMutationResult } from "@tanstack/react-query";
import { useState } from "react";



interface UseCustomFormProps<T,R> {
    initialValues:T;
    mutation:UseMutationResult<R, Error,T, unknown>
    inputValidation(inpt: T, setError: React.Dispatch<React.SetStateAction<{
        name: string;
        message: string;
    }>>): boolean
}

export function useCustomForm<T,R>({initialValues,mutation,inputValidation}:UseCustomFormProps<T,R>){
    const [input, setInput] = useState<T>(initialValues);
    const [error, setError] = useState({ name: "", message: "" })
    const [success, setSuccess] = useState<R|undefined>()
    
    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>){
        setInput((prev) => {
            return { ...prev, [e.target.id]: e.target.value };
        });
        if (error.message !== "" || error.name !== "") {
            setError({ name: "", message: "" });
        }
    };
    function handleSubmit(e: React.ChangeEvent<HTMLFormElement>){
        e.preventDefault();
        if(inputValidation(input,setError)){
          mutation.mutate(input, {
                onSuccess(data, variables, context) {
                    setSuccess(data)
                },
            });
        }
 
     
    };
    return { handleChange,handleSubmit,input, error, setError, setInput,success };
}

```
with this simple hook i got all the fuctionality i need for a simple form , 
as it turns out the more generic a solution the worse it can be for edge cases.

the hook also takes in a generic type just like react hoo form to give you typesafety

## Others
- [custom hooks](src\utils\hooks)
  notable mentions :
   - [useAuthGuard](src\utils\hooks\useAuthGuard.ts)
   This hook is used on the route layout level , to redirect to the login page if the user is not logged in.
   it also stores their initial destination in a query param that will be used to redirect them back to whre they were headed before 
    - [useDebouncedvalues](src\utils\hooks\useDebouncedValue.ts)
    this hook is sued on the search bar input to delay the value change to avoid new network requests on every value changes
    -[useScrollToTop](src\utils\hooks\useScrollToTop.ts)
    this hook is used to scroll the view back to the top , this comes in handy in cases where one scrolls down a very long list and clicks on a link that takes them to another page with content spanning more than a the pages viewport, the browser will attempt to restore scroll position to the bottom on the page . this hook undoes that forcing the page to scroll to the top
    - [useDarkTheme](src\utils\hooks\useDarkTheme.ts)
    this hook helps to toggle darkmode on and off by adding/removing the "dark" class to the documnet
    - [useScrollLock](src\utils\hooks\useScrollLock.ts)
    used in modals to prevent the background page the modal is on top of ftom scrolling while the modal is open


- search bars for tasks and staff
- custom error concatinations
<details>
<summary>
expand code snippet
</summary>

```ts
export const concatErrors = (err_res: any) => {
  const errs = err_res?.data?.data;
  // //no-console("errs === ",err_res?.data?.message)
  if (errs && Object.keys(errs).length > 0) {
    const err_key = Object.keys(errs);
    // //no-console("errs keys",err_key)
    let err_str = "";
    err_key.forEach((key) => {
      err_str +=
        " - " + key + ":" + errs[key].message;
      ("");
    });
    return err_str;
  }
  if (err_res?.data?.message) {
    return err_res?.data?.message;
  }
  if (err_res.message) return err_res.message;

  return err_res;
};
```
</details>

### References

- [Front-end code](https://github.com/tigawanna/awesome-notes)
- [Tanstackquery beta V5](https://tanstack.com/query/v5/docs/react/overview)
- [React calender Recipes](https://github.com/wojtekmaj/react-calendar/wiki/Recipes)
- [Custom pocketbase backeend code](https://github.com/tigawanna/devhub)
- [Using pocketbase as a framework](https://pocketbase.io/docs/use-as-framework)
- [Pocketbase discussions](https://github.com/pocketbase/pocketbase/discussions)
