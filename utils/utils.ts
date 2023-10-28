import { EYE_CLOSE, EYE_OPEN } from "@/constants/IMAGE_PATHS";
import { LOGIN_PATH_UI } from "@/constants/uiPaths";
import Router from "next/router";

export const logout = () => {
  localStorage.clear();
  Router.push(LOGIN_PATH_UI);
};

export const passwordType = (Eye: Boolean) => {
  return Eye ? "text" : "password";
};

export const EyeImg = (Eye: Boolean) => (Eye ? EYE_OPEN : EYE_CLOSE);
