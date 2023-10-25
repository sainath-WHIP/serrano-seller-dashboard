import React, { useEffect, useRef, useState } from "react";
import { GiMoneyStack, GiTakeMyMoney } from "react-icons/gi";
import { AiOutlineShop } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import Layout from "../../components/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loadnig from "../../components/Loading";
import { HiOutlineUserGroup } from "react-icons/hi";
import { ApiGet } from "../../networking/apiCalls";
import { getShopProductsUrl } from "../../networking/apiEndPoints";
import Moment from "react-moment";

const Total_Income = () => {
  return <GiMoneyStack size={27} color="white" />;
};
const Daily_Income = () => {
  return <GiTakeMyMoney size={27} color="white" />;
};
const All_Users = () => {
  return <HiOutlineUserGroup size={27} color="white" />;
};
const All_Shops = () => {
  return <AiOutlineShop size={27} color="white" />;
};

const Labels = [
  {
    id: 1,
    title: "Total Income",
    amount: "11,22,345",
    icon: Total_Income,
    background: "bg-gray-600",
  },
  {
    id: 2,
    title: "Daily Income",
    amount: "22,345",
    icon: Daily_Income,
    background: "bg-orange-600",
  },
  {
    id: 3,
    title: "All Users",
    amount: "1,22,345",
    icon: All_Users,
    background: "bg-purple-600",
  },
  {
    id: 4,
    title: "All Shops",
    amount: "22,345",
    icon: All_Shops,
    background: "bg-red-600",
  },
];

function ShopAllProducts() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [array, setArray] = useState([]);
  const [newlist, setNewList] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [sortByNameAsc, setSortByNameAsc] = useState(true);
  const [sortByIdAsc, setSortByIdAsc] = useState(true);
  const [sortByCreatedAtAsc, setSortByCreatedAtAsc] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();
  const searchRef = useRef();
  const pageSize = 6;

  // deleting Seller
  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `https://api.serrano.in/api/v2/admin/products/${id}`,
        { withCredentials: true }
      );
      console.log("Productid", id);
      if (response.status === 200) {
        console.log("Product deleted successfully.", id);

        toast(response?.data?.message);
      } else {
        toast(response?.data?.message);

        console.error("Failed to delete seller. Status code:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setLoading(true);
        const data = await ApiGet(getShopProductsUrl)
        const result = await data.json();
        console.log("all products data", result?.products);
        setArray(result?.products);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    const filteredList = array.filter((item) => {
      const { name, category } = item;
      const lowerCaseSearch = search.toLowerCase();

      if (search === "") {
        return true;
      }

      // Check if name contains the search query (if name is available)
      if (name && name.toLowerCase().includes(lowerCaseSearch)) {
        return true;
      }

      // Check if category contains the search query (if email is available)
      if (category && category.toLowerCase().includes(lowerCaseSearch)) {
        return true;
      }

      // If neither name nor email matches the search query, exclude the item
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
  const modalDeleteHandler = (id) => {
    setSelectedProductId(id);
    setModalOpen(true);
    console.log("selectedProductId", selectedProductId);
  };
  const handleClearClick = () => {
    setSearch("");
    searchRef.current.value = ""; // Clear the input field's value
  };

  // Sort by Shop Name
  const sortByName = () => {
    setSortByNameAsc(!sortByNameAsc);
    const sortedList = newlist.slice().sort((a, b) => {
      if (sortByNameAsc) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setNewList(sortedList);
  };

  // Sort by Shop Id
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
        return record.category === statusFilter;
      }
    });
    setNewList(filteredList);
  }, [statusFilter]);

  return (
    <Layout>
      {loading === true ? (
        <Loadnig />
      ) : (
        <>
          <div className="">
            <div className="">
              <h1 className="text-black font-semibold text-lg mb-3 ">
                Products
              </h1>
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
            <div className="flex justify-end items-center  mb-6 gap-10">
              <select
                name="category"
                className="block text-sm font-medium cursor-pointer capitalize bg-[#fff] border border-gray-400  rounded-md py-1.5 px-5 outline-none"
                value={statusFilter}
                onChange={handleStatusChange}
              >
                <option className="text-sm font-medium capitalize text-gray-600">
                  all
                </option>
                <option className="text-sm font-medium capitalize text-gray-600">
                  wine
                </option>
                <option className="text-sm font-medium capitalize text-gray-600">
                  liquor
                </option>
                <option className="text-sm font-medium capitalize text-gray-600">
                  beer
                </option>
                <option className=" text-md font-medium capitalize text-gray-600">
                  extras
                </option>
              </select>
              <div className="rounded-md bg-[#fff] px-4 py-1.5 border border-gray-400 w-[30%] flex justify-center items-center">
                <input
                  className="text-sm bg-[#fff] text-black placeholder-black outline-none w-full"
                  type="text"
                  ref={searchRef}
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value.trim())}
                />
                {search.length > 0 && (
                  <p onClick={handleClearClick}>
                    <RxCross2 className={"text-[#ff0000] text-xl"} />
                  </p>
                )}
              </div>
            </div>
            {array.length === 0 ?
              <>
                <div className="flex justify-center mt-10">
                  <p className="text-gray-700 text-base font-medium">Please go to the <Link to={"/all-products"} className="text-blue-600 hover:underline"> All Products</Link> page to add products.</p>
                </div>
              </> : 
              <>
                <div>
                  <div className="overflow-x-scroll mb-4">
                    <table className="w-full bg-[#fff] rounded-xl mb-2 overflow-hidden">
                      <thead className="">
                        <tr className=" text-black text-sm font-bold ">
                          <th className="px-6 py-4 text-left">
                            Product Id{" "}
                            <button onClick={sortById}>
                              {sortByIdAsc ? <span>▲</span> : <span>▼</span>}
                            </button>
                          </th>
                          <th className="px-6 py-4 text-left">
                            CreatedAt{" "}
                            <button onClick={sortByCreatedAt}>
                              {sortByCreatedAtAsc ? <span>▲</span> : <span>▼</span>}
                            </button>
                          </th>
                          <th className="px-6 py-4 text-left">Image</th>
                          <th className="px-6 py-4 text-left">
                            Product Name{" "}
                            <button onClick={sortByName}>
                              {sortByNameAsc ? <span>▲</span> : <span>▼</span>}
                            </button>
                          </th>
                          <th className="px-6 py-4 text-left">Category</th>
                          <th className="px-6 py-4 text-left">Price</th>
                          <th className="px-6 py-4 text-left">Stock</th>
                          <th className="px-6 py-4 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {currentRecords &&
                          currentRecords.map((item, id) => {
                            return (
                              <Tr
                                {...item}
                                key={id}
                                _id={item._id}
                                pstock={item.pstock}
                                sellerId={seller._id}
                                deleteProduct={deleteProduct}
                                modalDeleteHandler={modalDeleteHandler}
                              />
                            )
                          })}
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
    </Layout>
  );
};

export default ShopAllProducts;

function Tr({
  _id,
  name,
  category,
  originalPrice,
  stock,
  images,
  createdAt,
  formVisiblehandler,
  pstock,
  sellerId
}) {
  const navigate = useNavigate();
  const action = "update";
  const navigateToProductDetails = (productId) => {
    navigate(`/all-products/${action}/${productId}`);
  };
  // const stockInfo = pstock.find(stock => stock.shop === sellerId);

  return (
    <tr className="text-black text-sm font-normal bg-white border-b border-gray-400  text-left text-[15px]">
      <td className="px-6 py-4 whitespace-nowrap ">{_id}</td>
      <td className="px-6 py-4 whitespace-nowrap "><Moment format="YYYY-MM-DD HH:mm:ss">{createdAt}</Moment></td>
      <td className="px-6 py-4 whitespace-nowrap">
        <a target="_blank" rel="noreferrer" href={images}>
          <img
            src={images[0]}
            alt="shop image"
            className="cursor-pointer w-18 h-11"
          />
        </a>
      </td>
      <td className="px-6 py-4 whitespace-nowrap capitalize">{name}</td>
      <td className="px-6 py-4 whitespace-nowrap capitalize">{category}</td>
      <td className="px-6 py-4 break-words">{originalPrice}</td>
      <td
        className={` px-6 py-4  font-semibold  capitalize ${
          stock >= 100 ? "text-lime-600" : "text-red-600"
        }`}
      >
        {pstock[0].stock}
      </td>
      <td className=" px-6 ">
        <div className="">
          <div onClick={formVisiblehandler}>
            <button
              className="px-3 py-1 rounded-md bg-green-500 text-white shadow-md"
              title="Edit"
              onClick={() => navigateToProductDetails(_id)}
            >
              Update
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};
