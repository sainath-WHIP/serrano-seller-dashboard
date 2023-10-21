import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  createProductUrl,
  getAllProductsUrl,
  updateProductUrl,
} from "../../server";
import Layout from "../../components/Layout";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { ApiGet, ApiPost, ApiPut } from "../../constants/apiCalls";

function AddProduct() {
  const { seller } = useSelector((state) => state.seller);
  // kemlifesto@gufum.com
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const { product_id } = useParams();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setLoading(true);
        const data = await ApiGet(getAllProductsUrl);
        const result = await data.json();
        const filteredProducts = result.products.find(
          (item) => item._id === product_id
        );
        console.log("all products data", filteredProducts);
        setProduct(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    getAllProducts();
  }, []);

  console.log("product state ", product);

  const handleSubmit = async () => {
    try {
      const { data } = await axios.put(
        updateProductUrl + product._id,
        {
          stock: stock,
        },
        { withCredentials: true }
      );
      console.log("data ", data);
      toast(data?.message);
    } catch (error) {
      console.log("error in catch ", error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto mt-8 ">
        <div className="flex gap-2 items-center mb-6">
          <p className="text-gray-800 font-semibold text-base">Product Id: </p>
          <p className="text-black font-bold text-lg"> {product_id}</p>
        </div>
        <div className="bg-[#fff] px-14 py-7 rounded-xl shadow-xl">
          <form>
            <div className="grid grid-cols-2 gap-10 mb-10">
              <div className="">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Product Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={product?.name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-400 rounded-md py-2 px-3 text-black font-medium bg-[#ccc] text-sm outline-none shadow-md"
                  readOnly
                />
              </div>

              <div className="">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Category:
                </label>
                <input
                  name="category"
                  value={product?.category}
                  className="w-full border border-gray-400 rounded-md py-2 px-3 text-black font-medium bg-[#ccc] text-sm outline-none shadow-md"
                  readOnly
                />
              </div>

              <div className="">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Original Price:
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={product?.originalPrice}
                  className="w-full border border-gray-400 rounded-md py-2 px-3 text-black font-medium bg-[#ccc] text-sm outline-none shadow-md"
                  readOnly
                />
              </div>

              <div className="">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Discount Price:
                </label>
                <input
                  type="number"
                  name="discountPrice"
                  value={product?.discountPrice}
                  className="w-full border border-gray-400 rounded-md py-2 px-3 text-black font-medium bg-[#ccc] text-sm outline-none shadow-md"
                  required
                />
              </div>

              <div className="">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Stock:
                </label>
                <input
                  type="number"
                  name="stock"
                  value={stock}
                  placeholder="Enter Product Count"
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full border border-gray-400 rounded-md py-2 px-3 text-black font-medium bg-[#ccc] text-sm outline-none shadow-md placeholder:text-gray-500"
                  required
                />
              </div>

              <div className="">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Description:
                </label>
                <textarea
                  name="description"
                  value={product?.description}
                  className="w-full border border-gray-400 rounded-md py-2 px-3 text-black font-medium bg-[#ccc] text-sm outline-none shadow-md"
                  rows="4"
                  readOnly
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-500 w-[60%] text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>

        <div className="mt-4 text-green-600"></div>
      </div>
    </Layout>
  );
}

export default AddProduct;
