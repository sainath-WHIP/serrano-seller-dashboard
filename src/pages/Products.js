import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { createProductUrl } from "../server";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

function Products() {
  const { seller } = useSelector((state) => state.seller);
  // kemlifesto@gufum.com
  // butrufoknu@gufum.com
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

  return (
    <Layout>
      <div className="">
        <h2 className="text-xl font-semibold">All Product</h2>
      </div>
    </Layout>
  );
};

export default Products;
