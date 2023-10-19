import { useNavigate } from "react-router-dom";
import profile from "../assets/serrano.png";
import axios from "axios";
import { server } from "../server";
import { LoadSellerFail } from "../redux/slices/sellerSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const TopHeader = ({ profileDropdownOpen, toggleProfileDropdown }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    // setPressed(false);
    try {
      await axios
        .get(server + "/shop/logout")
        .then((res) => {
          console.log("response from logout api", res);
          dispatch(LoadSellerFail());
          localStorage.setItem("token", "");
          localStorage.setItem("shopId", "");
          toast(res?.data?.message);
        })
        .catch((error) => {
          console.log("error from logout api");
        });
    } catch (error) {
      alert("error catch");
    }
  };

  return (
    <div className="px-10 py-2 bg-[#ccc] ">
      {/* Search Bar */}
      <div className="flex justify-between items-center  ">
        {/* <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-lg w-[40%]  outline-none"
        /> */}
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
                  <button onClick={() => navigate("/profile")}>
                    Profile
                  </button>
                </li>
                <li className="hover:bg-slate-50 w-full px-4 rounded-lg">
                  <button onClick={() => logoutHandler()}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
