import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import * as Yup from "yup";
import { AUTHPAGE, PROFILE_ICON } from "../../utils/IMAGE_PATHS";
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
import styles from "./register.module.scss";
import { RegisterUserReq } from "@/constants/types";
import { RegisterUser } from "@/service/apiCalls";
const Register = () => {
  const formSubmit = async (reqBody: RegisterUserReq) => {
    reqBody.phone = reqBody.phone.toString();
    try {
      const resp = await RegisterUser(reqBody);
      if (resp.status === 201) {
        console.log("Account has been created");
      } else {
        console.log("There was an error in creating your account");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={` ${styles.wrapper}`}>
        <div className={`float-start ${styles.formContainer}`}>
          <div className={`mt-5 ${styles.memberContainer}`}>
            <a href="">
              {ALREADY_MEMBER}
              <Image
                src={PROFILE_ICON}
                alt="profile-icon"
                width={16}
                height={16}
                className="ms-2"
              />
            </a>
          </div>
          <div
            className={`d-flex justify-content-center mt-4 ${styles.headingContainer}`}
          >
            <div className={styles.heading}>{INPUT_HEADING}</div>
          </div>

          <hr />
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

                <label>
                  <Field name="password" type="text" />
                  <div className={styles.labelText}>{PASSWORD}</div>
                  <div className={styles.errorTxt}>
                    <ErrorMessage name="password" />
                  </div>
                </label>

                <label>
                  <Field name="repeat_password" type="text" />
                  <div className={styles.labelText}>{REPEAT_PASSWORD}</div>
                  <div className={styles.errorTxt}>
                    <ErrorMessage name="repeat_password" />
                  </div>
                </label>

                <div
                  className={`d-flex justify-content-evenly mt-5 ${styles.submitContainer}`}
                >
                  <div className={`d-flex ${styles.terms}`}>
                    <input type="checkbox" className="mt-1" />
                    <div className="ms-2">{TERMS_CONDITION}</div>
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
