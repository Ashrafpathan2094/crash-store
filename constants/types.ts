export interface APIResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface RegisterUserReq {
  name: string;
  phone: string;
  email: string;
  password: string;
  repeat_password: string;
}

export interface LoginUserReq {
  email: string;
  password: string;
}

export interface user {
  role: string;
  name: string;
  phone: string;
  email: string;
  addresses: [];
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface UserResp {
  message: string;
  user: user;
  token: string;
}

