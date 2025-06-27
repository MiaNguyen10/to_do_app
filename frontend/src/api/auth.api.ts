import axiosInstance from "@/api/axiosInstance";

export type UserSignup = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export type UserSignupResponse = {
  message: string;
  user: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
  };
  token?: string;
}

export type UserLogin = {
  email: string;
  password: string;
}

export type UserLoginResponse = {
  message: string;
  user: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
  };
  token?: string;
}

export const signup = async (userSignup: UserSignup) => {
  const response = await axiosInstance.post<UserSignupResponse>(
    "/users/signup",
    userSignup
  );
  if (response.data.token) {
    sessionStorage.setItem("token", response.data.token);
    sessionStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

export const login = async (userLogin: UserLogin) => {
  const response = await axiosInstance.post<UserLoginResponse>(
    "/users/login",
    userLogin
  );
  if (response.data.token) {
    sessionStorage.setItem("token", response.data.token);
    sessionStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};
