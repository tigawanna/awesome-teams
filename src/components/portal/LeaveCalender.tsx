import Calendar, { CalendarTileProperties,  } from 'react-calendar';
import { isWithinInterval } from "date-fns";

interface LeaveCalenderProps {
taken_leave_ranges: string[][] | undefined

rngs: {
    dateRange: Date[];
    setDateRange: React.Dispatch<React.SetStateAction<Date[]>>;
    updateDateRange: (ranges: Date[]) => void;
}

}

export function LeaveCalender({taken_leave_ranges,rngs}:LeaveCalenderProps){
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

return (
    <div className='w-full h-full flex dark:text-black  flex-col items-center justify-center gap-1'>
        <Calendar
            
            value={rngs.dateRange as [Date | null, Date | null]}
            onChange={rngs.updateDateRange}
            selectRange={true}
            tileDisabled={tileDisabled}
        />
 </div>
);
}







