import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `${process.env.REACT_APP_GATEWAY_API_HOST}:${process.env.REACT_APP_GATEWAY_API_POST}`;

const header = {
  "Content-Type": "application/json",
  Authorization: authHeader(),
};

export const getUserData = async (id: any) => {
  try {
    return await axios.get(API_URL + `/users/${id}`, {
      headers: {
        Authorization: authHeader(),
      },
    });
  } catch (error) {
    console.log("error get userdata");
    throw error;
  }
};

export const postRegister = async (values: any) => {
  try {
    return await axios.post(API_URL + "/user/create-user", values);
  } catch (error) {
    console.log("error register");
    throw error;
  }
};

// export const postResetPassword = async (values: any) => {
//   try {
//     return await axios.post(API_URL + "/users/reset-pwd", values);
//   } catch (error) {
//     console.log("error reset password");
//     throw error;
//   }
// };

// export const patchChangePassword = async (userId: any, values: any) => {
//   try {
//     return await axios.patch(API_URL + `/users/${userId}/change-pwd`, values, {
//       headers: header,
//     });
//   } catch (error) {
//     console.log("error change password");
//     throw error;
//   }
// };

// export const putEditProfile = async (userId: any, values: any) => {
//   try {
//     return await axios.put(API_URL + `/users/${userId}`, values, {
//       headers: header,
//     });
//   } catch (error) {
//     console.log("error edit profile");
//     throw error;
//   }
// };

// export const deleteProfile = async (userId: any) => {
//   try {
//     return await axios.delete(API_URL + `/users/${userId}`, {
//       headers: header,
//     });
//   } catch (error) {
//     console.log("error delete profile");
//     throw error;
//   }
// };
