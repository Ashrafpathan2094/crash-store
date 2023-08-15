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

export interface RegisterUserResp {
  message: string;
  user: {
    role: string;
    name: string;
    phone: string;
    email: string;
    addresses: [];
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  token: string;
}
