import React from "react";
import styles from "./loader.module.scss";

export const Loader = () => {
  return (
    <div
      className={`d-flex justify-content-center align-items-center ${styles.spinnerContainer}`}
    >
      <div className={styles.loadingSpinner}></div>
    </div>
  );
};
