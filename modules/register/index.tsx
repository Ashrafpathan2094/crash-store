import LoginPageImg from "@/IMAGE_URLS";
import { REGISTER_TXT } from "./constant";
import styles from "./register.module.scss";

const Register = () => {

  return (
    <>
      <div className={`${styles.registerTxt} m-5`}>{REGISTER_TXT}</div>
    </>
  );
};
export default Register;
