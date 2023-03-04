import React from "react";
import Select from 'react-select'

interface FormSelectProps<T> {
    label: string;
    prop: keyof T;
    error: { name: string; message: string };
    input: T;
    setInput: React.Dispatch<React.SetStateAction<T>>
    select_options: { value: string; label: string }[];
    styles?: React.CSSProperties | undefined
}


type  SelectedOption = { value: string; label: string } | null;

export const FormSelect = <T,>({ error,prop,input,label,setInput,select_options,styles}: FormSelectProps<T>) => {
    const isError = (err: typeof error, prop: keyof T) => {
        if (err.name === prop && err.message !== "") {
            return true;
        }
        return false;
    };
    
    const handleSelectChange = (e:SelectedOption)=>{
        if(e){
            setInput({...input,[prop]:e.value})
        }
    }

    return (
        <div 
        style={styles ?? { width: "100%" }}
        className="flex flex-col items-center justify-center w-full">
            <label className="text-md capitalize  w-[90%] flex items-start">
                {label}
            </label>
            <Select
                options={select_options}
                defaultValue={select_options[0]}
                className="w-[90%] p-[6px] m-1 border border-black
                dark:border-white h-10 rounded-sm   dark:bg-slate-700
                focus:border-2 dark:focus:border-4 focus:border-purple-700 dark:focus:border-purple-600 "
                onChange={(e) => {
                    if (e) {
                        handleSelectChange(e)
                    }
                }}
            />

            {isError(error, prop) ? (
                <div className="text-base  text-red-600">{error.message}</div>
            ) : null}
        </div>
    );
};
