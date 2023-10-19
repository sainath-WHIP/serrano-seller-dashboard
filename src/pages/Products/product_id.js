import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";

function ProductDetails() {
  const { product_id } = useParams();
  console.log("products details page ===============");
  return (
    <>
      <Layout>
        <div>
          <p>{product_id}</p>
        </div>
      </Layout>
    </>
  );
}

export default ProductDetails;
