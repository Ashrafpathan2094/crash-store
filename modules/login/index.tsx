import { Loader } from "@/components/Loader";
import { LoginUserReq } from "@/constants/types";
import { HOME_PATH_UI, SIGNUP_PATH_UI } from "@/constants/uiPaths";
import { EyeImg, passwordType } from "@/utils/utils";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { LOGIN_PAGE_BANNER } from "../../constants/IMAGE_PATHS";
import { LoginUser } from "../../service/apiCalls";
import {
  EMAIL,
  HEADING_TXT,
  LOGIN,
  PASSWORD,
  REGISTER_HERE,
  REGISTER_TXT,
} from "./constant";
import styles from "./login.module.scss";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [Eye, setEye] = useState(false);

  const formSubmit = async (reqBody: LoginUserReq) => {
    try {
      setLoading(true);
      const resp = await LoginUser(reqBody);
      if (resp.status === 201) {
        localStorage.setItem("crash-Token", resp.data.token);
        router.push("/home");
      } else {
        console.log("There was an error in creating your account");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const redirectRegister = () => {
    setLoading(true);
    router.push(SIGNUP_PATH_UI);
  };

  const changeEye = () => {
    setEye(!Eye);
  };
  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("crash-Token");
    if (token) {
      router.push(HOME_PATH_UI);
    } else {
      setLoading(false);
    }
  }, [router]);
  return (
    <>
      {loading && <Loader />}
      <div className={styles.loginWrapper}>
        <div className={`float-start ${styles.loginFormContainer}`}>
          <div className={styles.heading}>{LOGIN}</div>
          <div className={styles.headingTxt}>{HEADING_TXT}</div>
          <div
            className={`d-flex justify-content-center align-items-center ${styles.horizontalContainer}`}
          >
            <hr className={styles.horizontalLine} />
          </div>

          <div className={styles.form}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Required")
                  .test("email-tld", "Invalid email domain", (value) => {
                    const tlds = ["com", "net"];
                    const domain = value.split(".").pop();
                    return tlds.includes(domain!);
                  }),
                password: Yup.string()
                  .min(3, "Must be at least 3 characters")
                  .matches(
                    /^[a-zA-Z0-9]{3,30}$/,
                    "Password must contain only letters and numbers"
                  )
                  .required("Required"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                formSubmit(values);
              }}
            >
              <Form>
                <label>
                  <Field name="email" type="text" />
                  <div className={styles.labelText}>{EMAIL}</div>
                  <div className={styles.errorTxt}>
                    <ErrorMessage name="email" />
                  </div>
                </label>

                <div className="d-flex justify-content-center">
                  <label className={styles.passwordLabel}>
                    <Field
                      name="password"
                      type={passwordType(Eye)}
                      className={styles.passwordInput}
                    />
                    <div className={styles.labelText}>{PASSWORD}</div>
                    <div className={styles.errorTxt}>
                      <ErrorMessage name="password" />
                    </div>
                  </label>
                  <Image
                    src={EyeImg(Eye)}
                    alt="Eye-Icon"
                    height={20}
                    width={20}
                    className={`mt-5 ${styles.eye}`}
                    onClick={changeEye}
                  />
                </div>
                <div
                  className={`d-flex justify-content-evenly mt-5 ${styles.submitContainer}`}
                >
                  <button type="submit">{LOGIN}</button>
                </div>
              </Form>
            </Formik>

            <div className={`mt-5 ${styles.registerTxt}`}>{REGISTER_TXT}</div>
            <div
              className={`mt-1 ${styles.registerLink}`}
              onClick={redirectRegister}
            >
              {REGISTER_HERE}
            </div>
          </div>
        </div>
        <Image
          src={LOGIN_PAGE_BANNER}
          alt="Signup"
          className={`float-end ${styles.bannerImg}`}
          width={100}
          height={100}
        />
      </div>
    </>
  );
};
export default Login;
