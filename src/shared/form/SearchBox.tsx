import { FaSearch } from "react-icons/fa";
import { TheIcon } from "../wrappers/TheIcon";

interface SearchBoxProps {
    keyword:string
    handleChage(e: React.ChangeEvent<HTMLInputElement>): void
    placeholder:string
}

export function SearchBox({keyword,handleChage,placeholder}:SearchBoxProps){
return (
    <div className="w-[70%] md:w-[40%] fixed top-12 border shadow-xl z-50 flex rounded gap-2">
        <input 
        data-testid="search-box"
        placeholder={placeholder??"filter"}
        className="p-1 w-full  md:text-xl dark:bg-slate-800 " 
        value={keyword} onChange={handleChage} />
        <TheIcon Icon={FaSearch} size="20" iconstyle="m-2" />
    </div>
);
}
