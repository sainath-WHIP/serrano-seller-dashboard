import { PiPackageDuotone } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { useState, useEffect } from "react";
import orderList from "../../jsons/orderList.json";
import Layout from "../../components/Layout";
import product from "../../assets/Profile.jpg";
// import { ApiGet } from "../../common/apiCalls";
import { getOrdersUrl } from "../../server";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
  const [search, setSearch] = useState("");
  const [newlist, setNewList] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);

  const pageSize = 30;
  const lastIndex = currentpage * pageSize;

  const firstIndex = lastIndex - pageSize;

  const records = newlist.slice(firstIndex, lastIndex);

  const nPage = Math.ceil(newlist.length / pageSize);

  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const totalRecords = nPage * pageSize;

  console.log(
    lastIndex,
    firstIndex,
    records,
    nPage,
    numbers,
    totalRecords,
    "lastIndex",
    "firstIndex",
    "records",
    "nPage",
    "numbers",
    "totalRecords"
  );

  const prePage = () => {
    if (currentpage !== firstIndex) {
      setCurrentPage(currentpage - 1);
    }
  };

  const changeCpage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentpage !== lastIndex) {
      setCurrentPage(currentpage + 1);
    }
  };

  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  const filteredList = orders.filter((item) => {
    let { user, cart, status } = item;
    let { name, phoneNumber } = user;
    const lowerCaseSearch = search.toLowerCase();
    console.log('user from filtered List consst ', user, status)
    if (search === "") {
      return item;
    } else if (
      // id.toLowerCase().includes(search?.toLowerCase()) ||
      user && user?.name && user?.name.toLowerCase().includes(lowerCaseSearch) ||
      user && user?.phoneNumber && user?.phoneNumber.toLowerCase().includes(lowerCaseSearch) ||
      status && status.toLowerCase().includes(lowerCaseSearch)
    ) {
      return item;
    }
  });

  const fetchData = async () => {
    await axios.get(getOrdersUrl, { withCredentials: true }).then((res) => {
      console.log("response orders ", res?.data?.orders);
      setOrders(res?.data?.orders);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setNewList(filteredList);
  }, [search]);

  const Total_Income = () => {
    return <GiMoneyStack size={27} color="white" />;
  };

  const Daily_Income = () => {
    return <GiTakeMyMoney size={27} color="white" />;
  };

  const Orders = () => {
    return <PiPackageDuotone size={26} color="white" />;
  };

  const Labels = [
    {
      id: 1,
      title: "Total Income",
      amount: "11,22,345",
      icon: Total_Income,
      background: "bg-black",
    },
    {
      id: 2,
      title: "Daily Income",
      amount: "22,345",
      icon: Daily_Income,
      background: "bg-lime-500",
    },
    {
      id: 3,
      title: "All Orders",
      amount: "1,22,345",
      icon: Orders,
      background: "bg-red-600",
    },
    {
      id: 4,
      title: "New Orders",
      amount: "22,345",
      icon: Orders,
      background: "bg-blue-600",
    },
  ];

  return (
    <Layout>
      <div className="">
        <h1 className="text-black font-semibold text-lg mb-3 ">Orders</h1>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-1   gap-4 mb-10">
        {Labels.map(({ id, title, amount, icon: Icon, background }) => (
          <div
            className="bg-[#fff] flex items-center gap-6 p-6 rounded-md break-all shadow-xl"
            key={id}
          >
            <div className={`${background} p-2 rounded-md`}>
              <Icon />
            </div>
            <div className="">
              <p className="font-normal text-base">{title}</p>
              <p className="font-bold">{amount}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end items-end mb-8">
        <div className="rounded-md px-4 py-1 border border-black  w-[30%]">
          <input
            className="text-base mb-1 bg-transparent   text-black focus:outline-none placeholder-black"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-4">
        <div className="overflow-x-scroll">
          <table className="w-full bg-[#fff] rounded-lg overflow-hidden mb-2">
            <thead className="">
              <tr className=" text-gray-700 text-sm font-medium">
                <th className="px-6 py-4 text-left text-sm font-bold">Order Id</th>
                <th className="px-6 py-4 text-left text-sm font-bold">CreatedAt</th>
                <th className="px-6 py-4 text-left text-sm font-bold">User Name</th>
                <th className="px-6 py-4 text-left text-sm font-bold">User Number</th>
                <th className="px-6 py-4 text-left text-sm font-bold">User Address</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => (
                <Tr {...item} key={item._id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between mt-2">
        <div className="flex gap-3">
          <button
            onClick={prePage}
            className={`flex items-center px-4 py-2 text-sm font-semibold text-black bg-white   ${currentpage === 1 ? "hidden" : ""
              }`}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5 mr-2"
              fill="black"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            Prev
          </button>
          <p className="text-sm text-black flex justify-center items-center ">
            <span className="">Page</span>
            <span className="font-medium ml-1">{currentpage}</span>
            <span className="ml-1">of</span>
            <span className="font-medium ml-1">{nPage}</span>
          </p>
          <button
            onClick={nextPage}
            className={`flex items-center px-4 py-2 text-sm font-semibold text-black bg-white   ${currentpage === nPage ? "hidden" : ""
              }`}
          >
            Next
            <svg
              aria-hidden="true"
              className="w-5 h-5 ml-2"
              fill="black"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;

function Tr({
  _id,
  user,
  createdAt,
  status,
}) {
  return (
    <tr className="text-black text-sm font-normal border-b border-[#999999] text-left">
      <td className="px-6 py-4 whitespace-nowrap hover:underline"><Link to={`/orders/${_id}`}>{_id}</Link></td>
      <td className="px-6 py-4 whitespace-nowrap">{createdAt}</td>
      <td className="px-6 py-4 whitespace-nowrap">{user?.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{user?.phoneNumber}</td>
      <td className="px-6 py-4 whitespace-nowrap">{user?.addresses[0]?.address1}, {user?.addresses[0]?.address2}, {user?.addresses[0]?.city}, {user?.addresses[0]?.country}, {user?.addresses[0]?.zipCode}</td>
      <td
        className={`px-6 py-2 whitespace-nowrap font-medium capitalize ${status === "Processing" ? " text-red-600"
          :
          status === "Confirmed" ? " text-yellow-500" :
            "text-green-700"
          }`}
      >
        {status}
      </td>
    </tr>
  );
};
