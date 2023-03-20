import { IconContext } from "react-icons";
import { ReactModalWrapper } from "../../shared/wrappers/ReactModalWrapper";


interface ConsentModalProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    prompt: string
    handleAccept: (item:any) => void
    handleReject: (item:any) => void
    error:{name:string,message:string}
    accept_buytton_label?:string
    reject_buytton_label?:string
}

export function ConsentModal({
    prompt,handleAccept,handleReject,open,setOpen,error,accept_buytton_label,reject_buytton_label
}:ConsentModalProps){



return (
    <ReactModalWrapper
        child={
            <div className="w-full  h-full flex flex-col items-center justify-center ">

                <IconContext.Provider value={{ size: "40px" }}>
                    <div className="w-full md:w-[60%] h-full md:min-hh-fit md:max-h-[60%]   flex flex-col items-center justify-evenly 
                         rounded-2xl shadow-xl bg-slate-500 bg-opacity-60">

                        <h1 className="w-full p-2  text-semi bold  flex flex-col items-center justify-center">
                            {prompt}
                        </h1>

                        <div className="flex  items-center justify-center gap-5">
                            <button
                                onClick={handleAccept}
                                className="px-6 py-1 text-2xl text-white  rounded-full shadow-lg 
                                border-2 hover:bg-green-500 hover:text-white">
                                {accept_buytton_label ?? "confirm"}
                            </button>
                            <button
                                onClick={handleReject}
                                className="px-6 py-1 text-2xl  rounded-full bg-red-600 hover:bg-red-500 text-white">
                                {reject_buytton_label??"reject"}
                            </button>
                        </div>

                        <div className="m-1 w-[90%] flex  flex-col items-center justify-center">
                            {error?.message !== "" ? (
                                <div
                                    className="m-1 w-full text-center  line-clamp-4 p-2 bg-red-100 border-2 
                        border-red-800 text-red-900  rounded-xl"
                                >
                                    {error.message}
                                </div>
                            ) : null}
                        </div>
                    </div>

                </IconContext.Provider>

            </div>
        }
        closeModal={() => setOpen(false)}
        isOpen={open}
        styles={{
            overlay_top: '0%',
            overlay_right: '0%',
            overlay_left: '0%',
            overlay_bottom: '0%',
            content_bottom: '20%',
            content_right: '10%',
            content_left: '10%',
            content_top: '10%',


        }}
    />
);
}
