import { getProducts } from "@/service/apiCalls";
import React, { useEffect } from "react";

const Home = () => {
  const getAllProduct = async () => {
    try {
      const resp = await getProducts({
        category: "laptops",
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    void getAllProduct();
  }, []);
  return <div>Home</div>;
};

export default Home;
