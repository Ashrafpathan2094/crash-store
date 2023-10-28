import CustomCarousel from "@/components/Carousel";
import CustomNavbar from "@/components/Navbar";
import { getProducts } from "@/service/apiCalls";
import { useEffect } from "react";
import styles from "./home.module.scss";
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
      <div className={styles.example}>
        <CustomCarousel />
      </div>
    </>
  );
};

export default LandingPage;
