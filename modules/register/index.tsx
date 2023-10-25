import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import { AUTHPAGE, PROFILE_ICON } from "../../constants/IMAGE_PATHS";
import { RegisterUserReq } from "../../constants/types";
import { RegisterUser } from "../../service/apiCalls";
import {
  ALREADY_MEMBER,
  EMAIL,
  FULL_NAME,
  INPUT_HEADING,
  PASSWORD,
  PHONE,
  REGISTER_TXT,
  REPEAT_PASSWORD,
  TERMS_CONDITION,
} from "./constant";

import { LOGIN_PATH_UI } from "@/constants/uiPaths";
import { EyeImg, passwordType } from "@/utils/utils";
import { Loader } from "../../components/Loader";
import styles from "./register.module.scss";
const Register = () => {
  const [loading, setLoading] = useState(false);

  const [passwordEye, setPasswordEye] = useState(false);
  const [repeatPasswordEye, setRepeatPasswordEye] = useState(false);

  const router = useRouter();

  const formSubmit = async (reqBody: RegisterUserReq) => {
    reqBody.phone = reqBody.phone.toString();
    try {
      setLoading(true);
      const resp = await RegisterUser(reqBody);
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

  const changePasswordEye = () => {
    setPasswordEye(!passwordEye);
  };

  const changeRepPasswordEye = () => {
    setRepeatPasswordEye(!repeatPasswordEye);
  };
  const redirectLogin = () => {
    setLoading(true);
    router.push(LOGIN_PATH_UI);
  };
  return (
    <>
      <div className={` ${styles.wrapper}`}>
        {loading && <Loader />}

        <div className={`float-start ${styles.formContainer}`}>
          <div
            className={`mt-5 ${styles.memberContainer}`}
            onClick={redirectLogin}
          >
            {ALREADY_MEMBER}
            <Image
              src={PROFILE_ICON}
              alt="profile-icon"
              width={16}
              height={16}
              className="ms-2"
            />
          </div>
          <div
            className={`d-flex justify-content-center mt-4 ${styles.headingContainer}`}
          >
            <div className={styles.heading}>{INPUT_HEADING}</div>
          </div>
          <div
            className={`d-flex justify-content-center align-items-center ${styles.horizontalContainer}`}
          >
            <hr className={styles.horizontalLine} />
          </div>
          <div className={styles.form}>
            <Formik
              initialValues={{
                name: "",
                email: "",
                phone: "",
                password: "",
                repeat_password: "",
              }}
              validationSchema={Yup.object({
                name: Yup.string()
                  .min(3, "Must be at least 3 characters")
                  .max(30, "Must be 15 characters or less")
                  .required("Required"),
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Required")
                  .test("email-tld", "Invalid email domain", (value) => {
                    const tlds = ["com", "net"];
                    const domain = value.split(".").pop();
                    return tlds.includes(domain!);
                  }),
                phone: Yup.string()
                  .matches(/^\d{10}$/, "Must be a 10-digit number")
                  .required("Required"),
                password: Yup.string()
                  .min(3, "Must be at least 3 characters")
                  .matches(
                    /^[a-zA-Z0-9]{3,30}$/,
                    "Password must contain only letters and numbers"
                  )
                  .required("Required"),
                repeat_password: Yup.string()
                  .oneOf([Yup.ref("password")], "Passwords must match")
                  .required("Required"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                formSubmit(values);
              }}
            >
              <Form>
                <label>
                  <Field name="name" type="text" />
                  <div className={styles.labelText}>{FULL_NAME}</div>
                  <div className={styles.errorTxt}>
                    <ErrorMessage name="name" />
                  </div>
                </label>

                <label>
                  <Field name="email" type="text" />
                  <div className={styles.labelText}>{EMAIL}</div>
                  <div className={styles.errorTxt}>
                    <ErrorMessage name="email" />
                  </div>
                </label>

                <label>
                  <Field name="phone" type="number" />
                  <div className={styles.labelText}>{PHONE}</div>
                  <div className={styles.errorTxt}>
                    <ErrorMessage name="phone" />
                  </div>
                </label>

                <div className="d-flex justify-content-center me-2">
                  <label>
                    <Field
                      name="password"
                      type={passwordType(passwordEye)}
                      className={styles.passwordInput}
                    />
                    <div className={styles.labelText}>{PASSWORD}</div>
                    <div className={styles.errorTxt}>
                      <ErrorMessage name="password" />
                    </div>
                  </label>
                  <Image
                    src={EyeImg(passwordEye)}
                    alt="Eye-Icon"
                    height={20}
                    width={20}
                    className={`mt-5 ${styles.eye}`}
                    onClick={changePasswordEye}
                  />
                </div>

                <div className="d-flex justify-content-center me-2">
                  <label>
                    <Field
                      name="repeat_password"
                      type={passwordType(repeatPasswordEye)}
                      className={styles.passwordInput}
                    />
                    <div className={styles.labelText}>{REPEAT_PASSWORD}</div>
                    <div className={styles.errorTxt}>
                      <ErrorMessage name="repeat_password" />
                    </div>
                  </label>
                  <Image
                    src={EyeImg(repeatPasswordEye)}
                    alt="Eye-Icon"
                    height={20}
                    width={20}
                    className={`mt-5 ${styles.eye}`}
                    onClick={changeRepPasswordEye}
                  />
                </div>
                <div
                  className={`d-flex justify-content-evenly mt-5 ${styles.submitContainer}`}
                >
                  <div
                    className={`d-flex justify-content-center align-items-center ${styles.terms}`}
                  >
                    <input type="checkbox" className="mt-1" />
                    <div className={`ms-2 ${styles.termsCondition}`}>
                      {TERMS_CONDITION}
                    </div>
                  </div>
                  <button type="submit">{REGISTER_TXT}</button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
        <Image
          src={AUTHPAGE}
          alt="Signup"
          className={`float-end ${styles.bannerImg}`}
          width={100}
          height={100}
        />
      </div>
    </>
  );
};
export default Register;
