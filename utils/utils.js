import { LOGIN_PATH_UI } from "@/constants/uiPaths";
import Router from "next/router";

export const logout = () => {
  localStorage.clear();
  Router.push(LOGIN_PATH_UI);
};
