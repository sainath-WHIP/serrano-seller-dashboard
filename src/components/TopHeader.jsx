import { useNavigate } from "react-router-dom";
import profile from "../assets/serrano.png";
import { shopLogOutUrl } from "../networking/apiEndPoints";
import { useState } from "react";
import { LogoutShopAlert } from "./CustomAlerts";

const TopHeader = ({ profileDropdownOpen, toggleProfileDropdown }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    setModalOpen(true);
  };

  return (
    <div className="px-10 py-2 bg-[#ccc] ">
      {/* Search Bar */}
      <div className="flex justify-between items-center  ">
        <div />
        <div className="flex items-center">
          <img
            src={profile}
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer "
            onClick={toggleProfileDropdown}
          />
          {profileDropdownOpen && (
            <div className="absolute top-[50px] right-5 bg-white border rounded-lg">
              <ul>
                <li className="hover:bg-slate-50 w-full px-4 rounded-lg">
                  <button onClick={() => navigate("/profile")}>Profile</button>
                </li>
                <li className="hover:bg-slate-50 w-full px-4 rounded-lg">
                  <button onClick={() => logoutHandler()}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>

        
      </div>
      <div>
          <LogoutShopAlert
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            api={shopLogOutUrl}
          />
        </div>
    </div>
  );
};

export default TopHeader;
