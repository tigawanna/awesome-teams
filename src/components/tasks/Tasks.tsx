import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../utils/api/tasks";
import { QueryStateWrapper } from "../../shared/wrappers/QueryStateWrapper";
import { TaskCard } from "./TaskCard";
import { useEffect, useState } from "react";
import { TheIcon } from "../../shared/wrappers/TheIcon";
import { FaSearch } from "react-icons/fa";
import { useDebouncedValue } from "../../utils/hooks/useDebouncedValue";

interface TasksProps {

}

export const Tasks = ({ }: TasksProps) => {

const [keyword, setKeyword] = useState(" ");
const value = useDebouncedValue(keyword, 2000);


    const query = useQuery({
        queryKey: ['tasks', value],
        queryFn: () => getTasks(value),
    })

    function handleChage(e: any) {
        setKeyword(e.target.value)
    }

    const tasks = query.data

    // useEffect(()=>{
    // if (keyword && keyword.length > 3 && tasks?.items.length === 0){
    //     console.log("re-fetching")
    //     setFetchKeyword(keyword)
    //    } 
    // },[tasks,keyword])

    console.log(" fetch keyword", keyword)
    // console.log("keyword  ===== ",keyword)
    return (

        <div className='w-full min-h-screen flex  items-center justify-center '>

            <div className="w-[90%] md:w-[60%] fixed top-10 border shadow-xl z-50 flex rounded-lg gap-2">
                <input className="p-1 md:p-2 w-full" value={keyword} onChange={handleChage} />
                <TheIcon Icon={FaSearch} size="25" iconstyle="m-2" />
            </div>
            <QueryStateWrapper query={query} length={tasks && tasks?.totalItems}>
                <div className=' flex flex-wrap items-start justify-center gap-2 m-5 mt-14'>
                    {
                        tasks && tasks.items.map((task) => {
                            return (<TaskCard key={task.id} task={task} />)
                        }
                        )
                    }
                </div>
            </QueryStateWrapper>
            {
                keyword && keyword.length > 3 && tasks?.items.length === 0 && (
                    <div className='w-full h-full flex items-center justify-center'>
                        Items not found in current list
                    </div>
                )

            }

        </div>

    );
}
