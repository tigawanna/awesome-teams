import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime)

interface DateOutputProps {
the_date?:string
}

export function DateOutput({the_date}:DateOutputProps){
if(!the_date){
        return <h1 className='text-xs'>--:--:--</h1>
}
return (
 <div className='w-full h-full  flex flex-col items-center justify-center gap-1'>
    <h1 className='text-xs '>{dayjs(the_date).format('dddd DD-MMM-YYYY')}</h1>
    <h1 className='text-xs '>{dayjs().to(dayjs(the_date))}</h1>
 </div>
);
}
