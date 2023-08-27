import { LOGIN_PATH, REGISTER_PATH } from "../constants/endpoints";
import {
  APIResponse,
  LoginUserReq,
  RegisterUserReq,
  UserResp,
} from "../constants/types";

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
