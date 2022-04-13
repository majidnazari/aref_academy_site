import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { getToken, removeToken } from "../utils/auth";


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
  console.info(`[response]`, response);
  return response;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  //console.error(`[response error] ${JSON.stringify(error)}`);
  if (error.response && error.response.status === 401) {
    removeToken();
    window.location.href = "/";
  }
  return Promise.reject(error);
}

apiClient.interceptors.response.use(onResponse, onResponseError);

export default apiClient;
