import { useState, useEffect, useRef } from "react";
import Layout from "../../components/Layout";
import Cards from "../../components/Cards";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Loadnig from "../../components/Loading";
import { getOrdersUrl } from "../../networking/apiEndPoints";
import { ApiGet } from "../../networking/apiCalls";
import Moment from "react-moment";

function Dashboard() {
  const [search, setSearch] = useState("");
  const [array, setArray] = useState([]);
  const [newlist, setNewList] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const [sortByNameAsc, setSortByNameAsc] = useState(true);
  const [sortByIdAsc, setSortByIdAsc] = useState(true);
  const [sortByCreatedAtAsc, setSortByCreatedAtAsc] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const searchRef = useRef();
  const pageSize = 5;

  useEffect(() => {
    const getAllOrder = async () => {
      try {
        setLoading(true);
        const response = await ApiGet(getOrdersUrl)
        const data = await response.json();
        console.log("all orders data", data?.orders);
        setArray(data?.orders || []);
        // const orderData = data?.orders;
        // console.log("orderData", orderData);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    getAllOrder();
  }, []);

  useEffect(() => {
    const filteredList = array.reverse().filter((item) => {
      const { user, cart, status } = item;
      const lowerCaseSearch = search.toLowerCase();

      // If the search is empty, include the item in the result
      if (search === "") {
        return true;
      }

      // Check if user name contains the search query (if user name is available)
      if (
        user &&
        user.name &&
        user.name.toLowerCase().includes(lowerCaseSearch)
      ) {
        return true;
      }
      if (
        user &&
        user.phoneNumber &&
        user.phoneNumber.toString().toLowerCase().includes(lowerCaseSearch)
      ) {
        return true;
      }
      if (status && status.toString().toLowerCase().includes(lowerCaseSearch)) {
        return true;
      }

      return false;
    });

    setNewList(filteredList);
    setCurrentPage(1);
  }, [search, array]);

  const lastIndex = currentpage * pageSize;
  const firstIndex = lastIndex - pageSize;
  const currentRecords = newlist.slice(firstIndex, lastIndex);
  const totalRecords = newlist.length;

  const nPage = Math.ceil(totalRecords / pageSize);
  // const pageNumbers = [...Array(nPage).keys()].map((num) => num + 1);

  const prePage = () => {
    if (currentpage !== 1) {
      setCurrentPage(currentpage - 1);
    }
  };

  const nextPage = () => {
    if (currentpage < nPage) {
      setCurrentPage(currentpage + 1);
    }
  };

  const handleClearClick = () => {
    setSearch("");
    searchRef.current.value = ""; // Clear the input field's value
  };

  // Sort by Shop Name
  const sortByName = () => {
    setSortByNameAsc(!sortByNameAsc);
    const sortedList = newlist.slice().sort((a, b) => {
      const nameA = a.user?.name || "";
      const nameB = b.user?.name || "";

      if (nameA && nameB) {
        if (sortByNameAsc) {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      } else {
        return 0;
      }
    });
    setNewList(sortedList);
  };

  // Sort by Order Id
  const sortById = () => {
    setSortByIdAsc(!sortByIdAsc);
    const sortedList = newlist.slice().sort((a, b) => {
      if (sortByIdAsc) {
        return a._id - b._id;
      } else {
        return b._id - a._id;
      }
    });
    setNewList(sortedList);
  };

  //sort by created at
  const sortByCreatedAt = () => {
    setSortByCreatedAtAsc(!sortByCreatedAtAsc);
    const sortedList = newlist.slice().sort((a, b) => {
      if (sortByCreatedAtAsc) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    setNewList(sortedList);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  useEffect(() => {
    const filteredList = array.filter((record) => {
      if (statusFilter === "all") {
        return true;
      } else {
        return record.status === statusFilter;
      }
    });
    setNewList(filteredList);
  }, [statusFilter]);

  const navigateToOrderDetails = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  return (
    <Layout>
      <div className="">
        <h1 className="text-black font-semibold text-lg mb-3 ">Dashboard</h1>
      </div>
      <Cards />
      <div>
        {loading === true ? (
          <Loadnig />
        ) : (
          <>
            <div className="">
              <div className="flex justify-between items-center mt-10">
                <div className="">
                  <h1 className="text-black font-semibold text-lg mb-3 ">Recent orders</h1>
                </div>
                <div className="flex justify-end items-center mb-6 gap-10">
                  <select
                    name="category"
                    className="block text-sm font-medium bg-white cursor-pointer capitalize border border-gray-400 rounded-md py-1.5 px-5 outline-none"
                    value={statusFilter}
                    onChange={handleStatusChange}
                  >
                    <option className="text-sm font-medium capitalize text-gray-600">
                      all
                    </option>
                    <option className="text-sm font-medium capitalize text-gray-600">
                      Processing
                    </option>
                    <option className="text-sm font-medium capitalize text-gray-600">
                      Delivered
                    </option>
                  </select>

                  <div className="rounded-md px-4 py-1.5 border bg-white border-gray-400 w-[300px] flex justify-center items-center">
                    <input
                      className="text-sm bg-white text-black placeholder-black outline-none w-full"
                      type="text"
                      ref={searchRef}
                      placeholder="Search..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value.trim())}
                    />
                    {search.length > 0 && (
                      <p onClick={handleClearClick}>
                        <RxCross2 className={"text-[#ff0000] text-xl "} />
                      </p>
                    )}
                  </div>
                </div>
              </div>


              {array.length === 0 ?
                <>
                  <div className="flex justify-center mt-10">
                    <p className="text-gray-700 text-base font-medium">No Data Found...</p>
                  </div>
                </> :
                <>
                  <div>
                    <div className="overflow-x-scroll mb-4">
                      <table className="w-full bg-[#fff] rounded-xl mb-2 overflow-hidden">
                        <thead className="">
                          <tr className=" text-black text-sm font-bold">
                            <th className="px-6 py-4 text-left text-sm font-bold">
                              Order Id{" "}
                              <button onClick={sortById}>
                                {sortByIdAsc ? <span>▲</span> : <span>▼</span>}
                              </button>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-bold">
                              CreatedAt{" "}
                              <button onClick={sortByCreatedAt}>
                                {sortByCreatedAtAsc ? <span>▲</span> : <span>▼</span>}
                              </button>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-bold">
                              User Name{" "}
                              <button onClick={sortByName}>
                                {sortByNameAsc ? <span>▲</span> : <span>▼</span>}
                              </button>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-bold">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-bold">User Number</th>
                            <th className="px-6 py-4 text-left text-sm font-bold">User Address</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentRecords.map((order) => (
                            <tr
                              key={order._id}
                              className="text-black text-sm font-normal border-b border-[#999999] text-left"
                            >
                              <td
                                onClick={() => navigateToOrderDetails(order._id)}
                                className="px-6 py-4 whitespace-nowrap cursor-pointer hover:underline"
                              >
                                {order._id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Moment format="YYYY-MM-DD HH:mm:ss">{order.createdAt}</Moment>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap capitalize">
                                {order.user?.name}
                              </td>
                              <td
                                className={` px-6 py-4  font-semibold  capitalize ${order?.status === "Delivered"
                                  ? "text-green-600"
                                  : order?.status === "Processing"
                                    ? "text-yellow-500"
                                    : "text-red-600"
                                  }`}
                              >
                                {order.status}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap capitalize">
                                {order.user?.phoneNumber.toString().slice(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap capitalize">
                                {order.user?.addresses[0]?.address1},{" "}
                                {order.user?.addresses[0]?.address2},{" "}
                                {order.user?.addresses[0]?.city},{" "}
                                {order.user?.addresses[0]?.country},{" "}
                                {order.user?.addresses[0]?.zipCode}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="flex justify-center items-center ">
                      <p className="text-sm text-black ">
                        <span className="">Showing</span>
                        <span className="font-medium ml-1">{currentpage}</span>
                        <span className="ml-1">to</span>
                        <span className="font-medium ml-1">
                          {Math.min(lastIndex, totalRecords)}
                        </span>
                        <span className="ml-1">of</span>
                        <span className="font-medium ml-1">{totalRecords}</span>
                        <span className="ml-1">results</span>
                      </p>
                    </div>
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
                </>
              }

            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
