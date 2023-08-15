import { REGISTER_PATH } from "../constants/endpoints";
import {
  APIResponse,
  RegisterUserReq,
  RegisterUserResp,
} from "../constants/types";

const axios = require("axios").default;

export const RegisterUser = async (
  reqBody: RegisterUserReq
): Promise<APIResponse<RegisterUserResp>> => {

  const response = await axios.post(REGISTER_PATH, reqBody);

  console.log(response);

  return response.json() as Promise<APIResponse<RegisterUserResp>>;
};
