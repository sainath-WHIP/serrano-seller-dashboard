import React, { useEffect, useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { GiMoneyStack, GiTakeMyMoney } from "react-icons/gi";
import { AiOutlineShop } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
// import ProductList from "../jsons/productList.json";
import Layout from "../../components/Layout";
import product from "../../assets/Profile.jpg";
import { Link } from "react-router-dom";

export default function Products() {
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

  const [showmodal, setShowModal] = useState(false);
  const [response, setResponse] = useState([]);
  const [array, setArray] = useState([]);
  const [inputdata, setInputdata] = useState({
    productName: "",
    address: "",
    shopName: "",
    number: "",
    status: "",
    productStatus: "",
    category: "",
    ownerName: "",
    originalPrice: "",
    discountPrice: "",
    stock: "",
    description:""
  });
  const [index, setIndex] = useState();
  const [bolin, setBolin] = useState(false);
  const {
    productName,
    address,
    shopName,
    number,
    status,
    productStatus,
    category,
    ownerName,
  } = inputdata;

  function data(e) {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value });
  }

  function addinputdata() {
    if (
      productName === "" &&
      address === "" &&
      shopName === "" &&
      number === "" &&
      status === "" &&
      productStatus === "" &&
      category === "" &&
      ownerName === ""
    ) {
      alert("Please Fill The Form");
    } else {
      setArray([
        ...array,
        {
          productName,
          address,
          shopName,
          number,
          status,
          productStatus,
          category,
          ownerName,
        },
      ]);
      // console.log(inputdata)
      setInputdata({
        productName: "",
        address: "",
        shopName: "",
        number: "",
        status: "",
        productStatus: "",
        category: "",
        ownerName: "",
      });
    }
  }

  // deleting row
  function deletedata(id) {
    console.log(id, "this index row want to be delete");
    let total = [...response];
    total.splice(id, 1);
    setResponse(total);
  }

  // updatedata
  function updatedata(id) {
    let {
      address,
      shopName,
      number,
      status,
      productName,
      productStatus,
      category,
      ownerName,
    } = array[id]; //this perticular index no row data shoud be update so we get this index no row data in pname or sname
    setInputdata({
      address,
      shopName,
      number,
      status,
      productName,
      productStatus,
      category,
      ownerName,
    });
    setBolin(true);
    setIndex(id);
  }

  //know add data at perticular index means update it on that index
  function updateinfo() {
    let total = [...array];
    total.splice(index, 1, {
      productName,
      address,
      shopName,
      number,
      status,
      productStatus,
      category,
      ownerName,
    });
    setArray(total);
    setBolin(false);
    setInputdata({
      productName: "",
      address: "",
      shopName: "",
      number: "",
      status: "",
      productStatus: "",
      category: "",
      ownerName: "",
    });
  }

  const formVisiblehandler = (e) => {
    setShowModal(!showmodal);
  };

  const [search, setSearch] = useState("");
  const [newlist, setNewList] = useState([]);

  const [currentpage, setCurrentPage] = useState(1);
  const pageSize = 30;
  const lastIndex = currentpage * pageSize;

  const firstIndex = lastIndex - pageSize;

  const records = newlist.slice(firstIndex, lastIndex);

  const nPage = Math.ceil(newlist.length / pageSize);

  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const totalRecords = nPage * pageSize;


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

  const filteredList = response.filter((item) => {
    let {
      productName,
      id,
      address,
      shopName,
      number,
      status,
      productStatus,
      category,
      ownerName,
      name,
    } = item;
    console.log("fileterd", name);
    if (search === "") {
      return item;
    } else if (
      // id.toLowerCase().includes(search?.toLowerCase()) ||
      name.toLowerCase().includes(search?.toLowerCase()) ||
      category.toLowerCase().includes(search?.toLowerCase())
      // ownerName.toLowerCase().includes(search?.toLowerCase()) ||
      // category.toLowerCase().includes(search?.toLowerCase()) ||
      // productName.toLowerCase().includes(search?.toLowerCase()) ||
      // number.toLowerCase().includes(search?.toLowerCase()) ||
      // address.toLowerCase().includes(search?.toLowerCase()) ||
      // productStatus.toLowerCase().includes(search?.toLowerCase()) ||
      // name.toLowerCase().includes(search?.toLowerCase())
    ) {
      return item;
    }
  });

  useEffect(() => {
    setNewList(filteredList);
  }, [search]);

  const fectch = async () => {
    const data = await fetch(
      "https://api.serrano.in/api/v2/product/get-all-products"
    );
    console.log('data ', data)
    const res = await data.json();
    // const resp = res.products
    console.log("resp", res?.products);
    setResponse(res?.products);
  };
  useEffect(() => {
    fectch();
  }, []);

  return (
    <Layout>
      <div className="">
        <div className="mb-5">
          <h1 className="text-black font-semibold text-lg ">Products List</h1>
        </div>
        <div className="grid lg:grid-cols-4 grid-cols-1  gap-4 mb-10">
          {Labels.map(({ id, title, amount, icon: Icon, background }) => (
            <div
              className="bg-[#fff] flex items-center gap-6 p-6 rounded-md break-all  shadow-xl"
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
        <div className="mb-5">
          <button
            className="px-4 py-2 font-medium text-sm text-black  shadow-md rounded-md  bg-white"
            onClick={formVisiblehandler}
          >
            + Add Product
          </button>
        </div>

        {showmodal === true ? (
          <div className="bg-[#c4c4c4] p-10 rounded-md mb-10">
            <form className="w-full max-w-full">
              <div className="grid grid-cols-2">
                <div className="w-full md:w-full px-3 mb-6 md:mb-2">
                  <label className="block capitalize tracking-wide black text-sm font-semibold mb-2">
                    Product Name
                  </label>
                  <input
                    className="appearance-none block w-full  text-black border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-gray-300"
                    type="text"
                    value={inputdata.pname || ""}
                    name="pname"
                    placeholder="Enter Product Name"
                    onChange={data}
                    required
                  />
                </div>
                <div className="w-full md:w-full px-3 mb-6 md:mb-2">
                  <label className="block capitalize tracking-wide black text-sm font-semibold mb-2">
                    Shop Name
                  </label>
                  <input
                    className="appearance-none block w-full  text-black border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-gray-300"
                    type="text"
                    value={inputdata.sname || ""}
                    name="sname"
                    placeholder="Enter Shop Name"
                    onChange={data}
                    required
                  />
                </div>

                <div className="w-full md:w-full px-3 mb-6 md:mb-2">
                  <label className="block capitalize tracking-wide black text-sm font-semibold mb-2">
                    Original Price
                  </label>
                  <input
                    className="appearance-none block w-full  text-black border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-gray-300"
                    type="number"
                    value={inputdata.originalPrice || ""}
                    name="oprice"
                    placeholder="Enter Price"
                    onChange={data}
                    required
                  />
                </div>
                <div className="w-full md:w-full px-3 mb-6 md:mb-2">
                  <label className="block capitalize tracking-wide black text-sm font-semibold mb-2">
                    Price (With Discount)
                  </label>
                  <input
                    className="appearance-none block w-full  text-black border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-gray-300"
                    type="number"
                    value={inputdata.discountPrice || ""}
                    name="dprice"
                    placeholder="Enter Price"
                    onChange={data}
                    required
                  />
                </div>

                <div className="w-full md:w-full px-3 mb-6 md:mb-2">
                  <label className="block capitalize tracking-wide black text-sm font-semibold mb-2">
                    categories
                  </label>
                  <select
                    className="appearance-none block w-full  text-black border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-gray-300"
                    type="text"
                    value={inputdata.category || ""}
                    name="category"
                    placeholder="Enter category"
                    onChange={data}
                    required
                  >
                    <option>wine</option>
                    <option>liquor</option>
                    <option>beer</option>
                    <option>extras</option>
                  </select>
                </div>
                {/* <div className="w-full md:w-full px-3 mb-6 md:mb-2">
                  <label className="block capitalize tracking-wide black text-sm font-semibold mb-2">
                    Quantity
                  </label>
                  <select
                    className="appearance-none block w-full  text-black border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-gray-300"
                    type="number"
                    value={inputdata.qunatity || ""}
                    name="qunatity"
                    placeholder="Enter Qunatity"
                    onChange={data}
                    required
                  >
                    <option>250 ml</option>
                    <option>500 ml</option>
                    <option>750 ml</option>
                  </select>
                </div> */}
                <div className="w-full md:w-full px-3 mb-6 md:mb-2">
                  <label className="block capitalize tracking-wide black text-sm font-semibold mb-2">
                    Stock
                  </label>
                  <input
                    className="appearance-none block w-full  text-black border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-gray-300"
                    type="number"
                    value={inputdata.stock || ""}
                    name="stock"
                    placeholder="Product Stock"
                    onChange={data}
                    required
                  />
                </div>

                <div className="w-full md:w-full px-3 mb-0 md:mb-2 ">
                  <label
                    className="block capitalize tracking-wide text-black text-sm font-semibold mb-2"
                    htmlFor="grid-first-name"
                  >
                    product image
                  </label>
                  <input
                    className="appearance-none block w-full rounded py-1 mb-3 border border-gray-300 focus:outline-gray-300"
                    id="grid-first-name"
                    type="file"
                    name="pImage"
                    onChange={data}
                  />
                </div>
                <div className="w-full md:w-full px-3 mb-6 md:mb-2">
                  <label className="block capitalize tracking-wide black text-sm font-semibold mb-2">
                    Description
                  </label>
                  <textarea
                    className="appearance-none block w-full  text-black border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-gray-300"
                    type="text"
                    value={inputdata.description || ""}
                    name="description"
                    placeholder="Description"
                    onChange={data}
                    required
                  />
                </div>
                <div className="w-full md:w-full pl-3  md:mb-2 flex items-center">
                  <button
                    type="submit"
                    className="px-4 py-2 text-white text-sm font-medium shadow-md rounded-md  bg-black"
                    onClick={!bolin ? addinputdata : updateinfo}
                  >
                    {!bolin ? `  + Add Product` : ` Update Product`}
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <></>
        )}
        <div className="flex justify-end items-end mb-6">
          <div className="rounded-md px-4 py-1 border border-black  w-[30%]">
            <input
              className="text-base mb-1 bg-transparent  text-black focus:outline-none placeholder-black "
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => searchHandler(e)}
            />
          </div>
        </div>
        <div>
          <div className="overflow-x-scroll mb-4 ">
            <table className="w-full bg-[#fff] rounded-xl">
              <thead className="">
                <tr className="text-black text-sm font-medium">
                  <th className="px-6 py-5 text-left ">Product Id</th>
                  {/* <th className="px-6 py-5 text-left">Shop Name</th> */}
                  <th className="px-6 py-5 text-left">Product Image</th>
                  <th className="px-6 py-5 text-left">Product Name</th>
                  <th className="px-6 py-5 text-left">Price</th>
                  <th className="px-6 py-5 text-left">Category</th>
                  {/* <th className="px-6 py-5 text-left">Number</th> */}
                  {/* <th className="px-6 py-5 text-left">Address</th> */}
                  <th className="px-6 py-5 text-left">Stock</th>
                  <th className="px-6 py-5 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {response.map((item, _id) => (
                  <Tr
                    {...item}
                    key={_id}
                    formVisiblehandler={formVisiblehandler}
                    updatedata={updatedata}
                    deletedata={deletedata}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between mt-2">
          {/* <div className="flex justify-center items-center ">
              <p className="text-sm text-gray-300 ">
                <span className="">Showing</span>
                <span className="font-medium ml-1">{currentpage}</span>
                <span className="ml-1">to</span>
                <span className="font-medium ml-1">{lastIndex}</span>
                <span className="ml-1">of</span>
                <span className="font-medium ml-1">{totalRecords}</span>
                <span className="ml-1">results</span>
              </p>
            </div> */}
          <div className="flex gap-3">
            <button
              onClick={prePage}
              className={`flex items-center px-4 py-2 text-sm font-semibold text-black bg-white  ${
                currentpage === 1 ? "hidden" : ""
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
              className={`flex items-center px-4 py-2 text-sm font-semibold text-black bg-white  ${
                currentpage === nPage ? "hidden" : ""
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
      </div>
    </Layout>
  );
}

function Tr({
  i,
  _id,
  img,
  shopName,
  productName,
  category,
  address,
  number,
  status,
  productStatus,
  formVisiblehandler,
  updatedata,
  deletedata,
  name,
  originalPrice,
  images,
  stock,
}) {
  return (
    <tr className="text-black  border-b border-[#999999]  text-left text-[15px]">
      <td className="px-6 py-2 whitespace-nowrap "><Link to={`/products/${_id}`}>{_id}</Link></td>
      {/* <td className="px-6 py-2  w-[15%] break-words">{shopName}</td> */}
      <td className="px-6 py-2 whitespace-nowrap ">
        <a href={images} target="_blank">
          <img
            src={images[0]}
            width={30}
            height={30}
            alt="Product image"
            className="cursor-pointer"
          />
        </a>
      </td>

      <td className="px-6 py-2 w-[20%] break-words">{name}</td>
      <td className="px-6 py-2 w-[15%] break-words">{originalPrice}</td>
      <td className="px-6 py-2 whitespace-nowrap">{category}</td>
      {/* <td className="px-6 py-2 whitespace-nowrap">{number}</td> */}
      {/* <td className="px-6 py-2  w-[25%] break-words">{address}</td> */}
      <td
        className={`font-medium text-base  capitalize px-6 py-2 whitespace-nowrap ${
          stock >= 100 ? "text-lime-800" : "text-red-600"
        }`}
      >
        {stock}
      </td>

      <td className=" flex flex-row mt-2 px-6 py-2 whitespace-nowrap gap-6">
        <div className="">
          <a onClick={formVisiblehandler}>
            <button className=" " onClick={() => updatedata(_id)}>
              <TbEdit size={25} color="green" />
            </button>
          </a>
        </div>

        <button className=" " onClick={() => deletedata(_id)}>
          <MdOutlineDelete size={25} color="red" />
        </button>
      </td>
    </tr>
  );
}
