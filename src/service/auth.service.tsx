import jwt_decode from "jwt-decode";
import { axiosStore, axiosTokenStore } from "./axiosStore";
interface ILoginApi {
  userName: string
  password: string
}
interface ILoginApiResponse {
  access_token: string,
  user: {
    userId: number,
    firstName: string,
    lastName: string,
    username: string
  }
}

export const loginApi = async (
  body: ILoginApi
): Promise<ILoginApiResponse> => {
  return await axiosStore
    .post<ILoginApiResponse>(
      '/api/auth',
      body
    )
    .then((response) => {
      if (response.data) {
        localStorage.setItem("access_token", response.data.access_token)
        localStorage.setItem("firstName", response.data.user.firstName)
        localStorage.setItem("lastName", response.data.user.lastName)
        localStorage.setItem("username", response.data.user.username)
        localStorage.setItem("userId", JSON.stringify(Number(response.data.user.userId)))
      }
      return response.data
    })
    .catch((error) => {
      throw Error(`[loginApi API] error: ${error}`)
    })
}

export const getUserInfo = () => {
  try {
    const token = localStorage.getItem("access_token") || "{}";
    const user_info: any = jwt_decode(token)
    return user_info.userId
  } catch (error) {
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("token") || '{}');
};
