import axios from "axios"
import { LocalStorageService } from "../helpers/storage/localstorage"

// axios with token
const axiosTokenStore = axios.create({
    baseURL: `${process.env.REACT_APP_GATEWAY_API_HOST}:${process.env.REACT_APP_GATEWAY_API_POST}`,
    timeout: 5000,
})

// axios without token
const axiosStore = axios.create({
  baseURL: `${process.env.REACT_APP_GATEWAY_API_HOST}:${process.env.REACT_APP_GATEWAY_API_POST}`,
  timeout: 5000,
})

axiosTokenStore.interceptors.request.use(
  (config) => {
    const accessToken = LocalStorageService.getLocalStorage(LocalStorageService.localStorageEnum.accessToken)

    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

export { axiosTokenStore, axiosStore }