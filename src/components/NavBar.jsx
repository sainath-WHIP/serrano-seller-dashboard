import { useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { MdOutlineDashboard } from "react-icons/md";
import { BsBag, BsBagPlus } from "react-icons/bs";
import { PiPackageDuotone } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "./DropDown";

const NavBar = () => {
  const [open, setOpen] = useState(true);

  const IsActiveLink = (path) => {
    const location = useLocation();
    return location.pathname === path;
  };

  const Dashboard = () => {
    return <MdOutlineDashboard size={23} />;
  };

  const ProductList = () => {
    return <BsBag size={22} />;
  };

  const Orders = () => {
    return <PiPackageDuotone size={25} />
  }

  const AddProducts = () => {
    return <BsBagPlus size={23} />
  }

  const menuItems = [
    { id: 1, label: "Dashboard", icon: Dashboard, link: "/dashboard" },
    { id: 2, label: "Shop Products", icon: ProductList, link: "/products" },
    { id: 3, label: "All Products", icon: AddProducts, link: "/all-products" },
    { id: 4, label: "Orders", icon: Orders, link: "/orders" },
  ];

  return (
    <>
      <div className="flex overflow-y-hidden overflow-x-hidden">
        <div
          className={`bg-[#000]  pt-3  ${
            open ? "w-[200px] pl-3" : "w-[75px]"
          } duration-700 text-gray-900 `}
        >
          <div className="">
            <div
              className="flex justify-end mb-5"
              onClick={() => setOpen(!open)}
            >
              <BiLeftArrowAlt
                className={`bg-[#fff] text-[#ff0000] text-3xl rounded-full border  cursor-pointer ${
                  !open && "rotate-180"
                }`}
              />
            </div>
          </div>

          <div className="flex flex-row gap-4 items-center mb-5">
            <div className={`px-1 ${open ? "ml-0" : "ml-3" } py-3.5 bg-[#fff] rounded-md`}>
              <p className="text-black font-bold text-[10px] tracking-wide  ">
                Serrano
              </p>
            </div>
            <h2
              style={{
                transitionDelay: `50ms`,
              }}
              className={`whitespace-pre duration-700 text-[#fff] font-semibold text-lg ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Seller
            </h2>
          </div>

          <div className="flex flex-col gap-3 overflow-x-hidden pb-20 overflow-y-auto h-[90%] ">
            {menuItems.map(({ label, icon: Icon, link, id, i }) => (
              <Link
                to={link}
                key={id}
                title={open ? "" : label}
                className={`
                  group flex items-center  gap-3.5 text-sm  p-1 rounded-md ${
                    IsActiveLink(link) ? "text-red-500 " : "text-[#fff]"
                  } ${open ? "pl-0": "pl-[22px]"}`}
              >
                <div>
                  <Icon />
                </div>
                <p
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-700  ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {label}
                </p>
              </Link>
            ))}
            <Dropdown open={open} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
