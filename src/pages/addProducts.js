import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { createProductUrl } from "../server";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

function AddProduct() {
  const { seller } = useSelector((state) => state.seller);
  // kemlifesto@gufum.com
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.set("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);

    try {
      const response = await axios.post(createProductUrl, newForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201 && response.data.success) {
        console.log("Product created successfully!", response.data);
        setName(" ");
        setCategory(" ");
        setDescription(" ");
        setOriginalPrice(" ");
        setDiscountPrice(" ");
        setImages(" ");
        setStock(" ");
        setTags(" ");
        toast.success("Product added to your shop.");
      } else {
        console.log("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto mt-8 w-[90%]">
        <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
        <div className="bg-[#fff] p-14 rounded-xl shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-10 mb-10">
              <div className="">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Product Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="Enter Product Name"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Category:
                </label>
                <select
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option>Beer</option> 
                  <option>Wine</option> 
                  <option>Liquor</option> 
                  <option>Extras</option> 
                </select> 
              </div> 

              <div className="">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Tags:
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  placeholder="Enter Tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Original Price:
                </label>
                <input
                  type="number"
                  id="originalPrice"
                  name="originalPrice"
                  value={originalPrice}
                  placeholder="Enter Original Price"
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Discount Price:
                </label>
                <input
                  type="number"
                  id="discountPrice"
                  name="discountPrice"
                  value={discountPrice}
                  placeholder="Enter Discount Price"
                  onChange={(e) => setDiscountPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Stock:
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={stock}
                  placeholder="Enter Count Of Stock"
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Product Images:
                </label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  multiple
                  onChange={handleImageChange}
                  className="w-full text-gray-700 border border-gray-300 rounded-md py-1 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  placeholder="Enter Product Description"
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                  rows="4"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 w-[60%] text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>

        <div className="mt-4 text-green-600"></div>
      </div>

    </Layout>
  );
};

export default AddProduct;
