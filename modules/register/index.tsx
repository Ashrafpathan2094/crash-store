import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import * as Yup from "yup";
import { AUTHPAGE, PROFILE_ICON } from "../../utils/IMAGE_PATHS";
import {
  ALREADY_MEMBER,
  INPUT_HEADING,
  INPUT_HEADING_TEXT,
  REGISTER_TXT,
  TERMS_CONDITION,
} from "./constant";
import styles from "./register.module.scss";
const Register = () => {
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
          <div className={`d-flex mt-4 ms-5 ${styles.headingContainer}`}>
            <div className={styles.heading}>{INPUT_HEADING}</div>
            <div className={`${styles.headingTxt}`}>{INPUT_HEADING_TEXT}</div>
          </div>

          <hr />
          <div className={styles.form}>
            <Formik
              initialValues={{
                Name: "",
                email: "",
                password: "",
                passwordRepeat: "",
              }}
              validationSchema={Yup.object({
                Name: Yup.string()
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
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              <Form>
                <label>
                  <Field name="Name" type="text" />
                  <div className={styles.labelText}>Full Name</div>
                  <div className={styles.errorTxt}>
                    <ErrorMessage name="Name" />
                  </div>
                </label>

                <label>
                  <Field name="email" type="text" />
                  <div className={styles.labelText}>Email</div>
                  <div className={styles.errorTxt}>
                    <ErrorMessage name="email" />
                  </div>
                </label>

                <label>
                  <Field name="phone" type="number" />
                  <div className={styles.labelText}>Phone</div>
                  <div className={styles.errorTxt}>
                    <ErrorMessage name="phone" />
                  </div>
                </label>

                <label>
                  <Field name="password" type="text" />
                  <div className={styles.labelText}>Password</div>
                  <div className={styles.errorTxt}>
                    <ErrorMessage name="password" />
                  </div>
                </label>

                <label>
                  <Field name="repeat_password" type="text" />
                  <div className={styles.labelText}>Repeat Password</div>
                  <div className={styles.errorTxt}>
                    <ErrorMessage name="repeat_password" />
                  </div>
                </label>

                <div
                  className={`d-flex justify-content-evenly mt-5 ${styles.submitContainer}`}
                >
                  <div className={`d-flex ${styles.terms}`}>
                    <input type="checkbox" className="mt-1" />
                    <div className="ms-2">
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
