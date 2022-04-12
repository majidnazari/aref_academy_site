import axios from 'axios';
import env from "react-dotenv";

let token = ''; 

let headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
headers.Authorization = token ? `Bearer ${token}` : null;

const apiClient = axios.create({
  baseURL: env.API_URL,
  headers,
});

// apiClient.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     return config;
//   },

//   error => {
//     // Do something with request error
//     console.log('instance:', error);
//   },
// );

// Add a response interceptor
apiClient.interceptors.response.use(
  
  function (error) {
    
    if (error && error.response && +error.response.status === 403) {
      // navigate to signin
      return Promise.resolve();
    }

    if (error) {
      console.log(error);
      return Promise.reject(error);
    }

    if (error && error.response && +error.response.status > 406) {
      // show popup error
      return Promise.resolve();
    }
    return Promise.reject(error);
  },
);

export default apiClient;
