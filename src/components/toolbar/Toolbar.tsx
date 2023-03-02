import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { ProfileMenu } from './ProfileMenu';
import { ReactModalWrapper } from './../../shared/wrappers/ReactModalWrapper';
import { TheIcon } from './../../shared/wrappers/TheIcon';
import { AppUser } from "../../utils/types/base";

interface ToolbarProps {
  user: AppUser
}

export const Toolbar = (
  {
    user
  }: ToolbarProps
) => {

const [isOpen, setIsOpen] = React.useState(false);
const avatar = user?.avatar
console.log("profile ===",user)

return (
    <div className="w-full h-full flex flex-col justify-start items-center">





      <div className="flex justify-start items-center">
        <div className="m-1 w-fit h-full p-1 flex justify-center items-center ">
          <Link to="/">
            <div className="w-fit p-1 flex justify-center items-centertext-white  ">
              <TheIcon
                Icon={AiOutlineHome}
                size={"25"}
                color={""}
                iconstyle={""}
              />
            </div>
          </Link>
        </div>
      </div>

       <ReactModalWrapper
       child={
       <ProfileMenu user={user} setIsOpen={setIsOpen}/>}
       closeModal={()=>setIsOpen(false)}
       isOpen={isOpen}
       styles={{
        overlay_top:'0%',
        overlay_right:'0%',
        overlay_left:'0%',
        overlay_bottom:'0%',
        content_bottom:'20%',
        content_right:'0%',
        content_left:'60%',
        content_top:'0%'

      }}
       />

    <div className="h-full flex flex-col justify-center items-center gap-2
          rounded-xl  font-bold dark:font-normal ">

        <div className="w-full  h-full flex justify-center items-center
         hover:text-blue-700">
        <Link to="/">main</Link>
       </div>


      <div className="w-full h-full flex justify-center items-center 
      hover:text-rose-700">
          <Link to="/test">test</Link>
      </div> 


      <div className="w-full  h-full flex justify-center items-center 
      hover:text-rose-700">
        <Link to="/about">About</Link>
      </div> 
     </div>
      
      <div className="w-fit h-full flex justify-end items-center">

      <div className="  rounded-md  flex justify-center items-center w-16 h-full  aspect-square">
          {!avatar ? (
              <TheIcon
               Icon={FaUserCircle}
                size={"25"}
                color={""}
                iconAction={() => setIsOpen(true)}
              />
         
          ) : (
            <img
              src={avatar}
              alt={""}
              className="rounded-[50%] hover:rounded-sm max-h-[40px] h-10 w-10
              border-2 border-slate-900 dark:border-slate-100 aspect-square"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
      </div>

    </div>
  );
};
