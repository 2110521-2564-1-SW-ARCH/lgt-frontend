import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

const API_URL = "http://localhost:8000/api";

export const login = async (values: any) => {
  return await axios
    .post(API_URL + "/auth", values)
    .then((response) => {
      console.log(response);
      if (response.data) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

export const getUserInfo = () => {
  try {
    const token = sessionStorage.getItem("user") || "{}";
    const user_info: any = jwt_decode(token);
    const info: any = {};
    info['userId'] = user_info['userID'];
    return info;
  } catch (error) {
    return false;
  }
};

export const logout = () => {
  sessionStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem("user") || '{}');
};
