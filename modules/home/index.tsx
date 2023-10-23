import CustomNavbar from "@/components/Navbar";
import { getProducts } from "@/service/apiCalls";
import React, { useEffect } from "react";

const LandingPage = () => {
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
  return (
    <>
      <CustomNavbar />
    </>
  );
};

export default LandingPage;
