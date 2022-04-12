import axios, { AxiosInstance, AxiosRequestConfig ,AxiosError , AxiosResponse } from 'axios';
import { getToken ,removeToken } from "../utils/auth";


const token = getToken();
const headers: any = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
headers.Authorization = token ? `Bearer ${token}` : null;

const config: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_API_URL,
  headers,
};

const apiClient: AxiosInstance = axios.create(config);

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.info(`[response]`,response);
  return response;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error]`,error);
  removeToken();
  window.location.href = "/";
  return Promise.reject(error);
}

apiClient.interceptors.response.use(onResponse, onResponseError);
// apiClient.interceptors.response.use(function (error: any) {
//   if (error && error.response && +error.response.status === 403) {
//     console.log("interceptor 403 err");
//     const navigate = useNavigate();
//     // navigate to signin
//     navigate("/signout");
//     return Promise.resolve();
//   }

//   if (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }

//   if (error && error.response && +error.response.status > 406) {
//     // show popup error
//     return Promise.resolve();
//   }
//   return Promise.reject(error);
// });

export default apiClient;
