import {
  GET_PRODUCTS,
  LOGIN_PATH,
  REGISTER_PATH,
} from "../constants/endpoints";
import {
  APIResponse,
  LoginUserReq,
  RegisterUserReq,
  UserResp,
} from "../constants/types";
import axiosInstance from "./customAxios";

const axios = require("axios").default;

export const RegisterUser = async (
  reqBody: RegisterUserReq
): Promise<APIResponse<UserResp>> => {
  const response = await axios.post(REGISTER_PATH, reqBody);
  return response as Promise<APIResponse<UserResp>>;
};

export const LoginUser = async (
  reqBody: LoginUserReq
): Promise<APIResponse<UserResp>> => {
  const response = await axios.post(LOGIN_PATH, reqBody);
  return response as Promise<APIResponse<UserResp>>;
};

export const getProducts = async (reqBody: any) => {
  const response = await axiosInstance.post(GET_PRODUCTS, reqBody);
  return response;
};
