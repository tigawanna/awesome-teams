import Calendar, { CalendarTileProperties, OnChangeDateCallback, OnChangeDateRangeCallback } from 'react-calendar';
import { isWithinInterval } from "date-fns";



interface LeaveCalenderProps {
minDate:Date
maxDate:Date
taken_leave_ranges: string[][] | undefined
date:Date
setDate: React.Dispatch<React.SetStateAction<Date>>
rngs: {
    dateRange: Date[];
    setDateRange: React.Dispatch<React.SetStateAction<Date[]>>;
    updateDateRange: (ranges: Date[]) => void;
}

}

export function LeaveCalender({minDate,maxDate,taken_leave_ranges,date,setDate,rngs}:LeaveCalenderProps){

    const dateRange = getDateRange(minDate,maxDate);

    // function tileClassName({ date, view }: CalendarTileProperties) {

    //     if (view === 'month') {
    //     if (dateRange.find(dDate => isSameDay(dDate, date))) {
    //             return 'leave_selected-tile';
    //     }
    //         return "leave_normal-tiles"
    //  }
    // return ""
    // }

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
console.log("date",date)
return (
    <div className='w-full h-full flex dark:text-black  flex-col items-center justify-center gap-1'>
        <Calendar
            value={rngs.dateRange as [Date | null, Date | null]}
            onChange={rngs.updateDateRange}
            selectRange={true}
      
            // minDate={minDate}
            // maxDate={maxDate}
            // tileClassName={tileClassName}
            tileDisabled={tileDisabled}
        />
 </div>
);
}






function getDateRange(start: Date, end: Date): Date[] {
    const dateArray = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
        dateArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
}
