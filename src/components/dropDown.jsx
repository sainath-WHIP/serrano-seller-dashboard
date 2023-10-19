import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiGearLight } from "react-icons/pi";
const Dropdown = ({open}) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleNavigation = (route) => {
    navigate(route);
    setExpanded(false);
  };

  return (
    <div className="relative">
      <div onClick={handleToggle} className="cursor-pointer">
        {!open === true && (
          <p className="p-1" title="Settings">
            <PiGearLight size={23} color="white" />
          </p>
        )}
        <div className="flex  gap-3.5 group p-1 items-center duration-700">
          <PiGearLight
            size={23}
            color="white"
            className={` duration-700  ${
              !open && "opacity-0 translate-x-28 overflow-hidden  "
            }`}
          />
          <p
            className={`text-[#fff] text-sm  duration-700  ${
              !open && "opacity-0 translate-x-28 overflow-hidden "
            }`}
          >
            Settings
          </p>
        </div>
      </div>
      {expanded && (
        <div className="absolute">
          <div className=" bg-white rounded-md px-16 py-1 flex justify-center mb-1 mt-2" onClick={() => handleNavigation("/profile")}> <p className="cursor-pointer text-[#000] text-sm font-semibold ">Profile</p></div>
          <div className=" bg-white rounded-md  py-1 flex justify-center" onClick={() => handleNavigation("/change-password")}>
            <p className="text-[#000] text-sm font-semibold cursor-pointer">Change Password</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Dropdown;