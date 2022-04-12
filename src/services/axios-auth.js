import axios from 'axios';
import {env} from '../config/index';
import {getData, storeData} from '../utils/index';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {setLogout} from '../utils/user';

let apiClient;
const authAxiosFactory = async (authenticated = true, formdata = false) => {
  // if (apiClient) {
  //   return apiClient;
  // }
  const token = authenticated ? await getData('token') : null;
  const headers = {
    Accept: 'application/json',
    'Content-Type': !formdata ? 'application/json' : 'multipart/form-data',
    Authorization: token ? `Bearer ${token}` : null,
  };

  //console.log('headers:', headers);

  apiClient = axios.create({
    baseURL: env.API_URL,
    headers,
  });

  // apiClient.interceptors.request.use(function (request) {
  //   if (env.name === 'QA') {
  //     console.log('Request:', JSON.stringify(request));
  //   }
  // });

  apiClient.interceptors.response.use(
    function (response) {
      if (env.name === 'DEBUG') {
        console.log('Response:', JSON.stringify(response));
      }
      return response;
    },
    async function (error) {
      if (env.name === 'DEBUG') {
        console.log('Error:', JSON.stringify(error));
      }
      // const originalRequest = error.config;
      // if (
      //   !originalRequest._retry &&
      //   error &&
      //   error.response &&
      //   (+error.response.status === 403 ||
      //     +error.response.status === 401 ||
      //     +error.response.status === 400)
      // ) {
      //   originalRequest._retry = true;
      //   await refreshTokenFn();
      //   return await apiClient(originalRequest);

      //   // navigate to signin
      // }

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

  const refreshAuthLogic = async failedRequest => {
    const data = {refresh_token: await getData('refresh_token')};
    data.refresh_token = 'wwwww';
    //const url = `${env.API_URL}/users/auth/refresh-token`;
    apiClient
      .post('users/auth/refresh-token', data)
      .then(async tokenRefreshResponse => {
        console.log('tokenRefreshResponse:', tokenRefreshResponse.data);
        await storeData('token', tokenRefreshResponse.data.data.token);
        failedRequest.response.config.headers.Authorization =
          'Bearer ' + tokenRefreshResponse.data.data.token;
        return Promise.resolve();
      })
      .catch(async error => {
        console.log('refresh fail:', error);
        await setLogout();
        //pushToLogin();
        //return Promise.reject(error);
      });
  };

  // Instantiate the interceptor
  createAuthRefreshInterceptor(apiClient, refreshAuthLogic);
  return apiClient;
};

export const refreshTokenFn = async () => {
  console.log(
    'refreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFnrefreshTokenFn',
  );
  const data = {refresh_token: await getData('refresh_token')};
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const myClient = axios.create({
    baseURL: env.API_URL,
    headers,
  });
  const url = `${env.API_URL}/users/auth/refresh-token`;
  try {
    const resp = await myClient({
      method: 'post',
      url,
      data,
      headers,
    });
    console.log('refreshTokenFnresp:', resp.data.data);
    await saveUserData(resp.data.data);
    apiClient = undefined;
  } catch (error) {
    console.log('refreshTokenFnerror:', error);
  }
};

// Function that will be called to refresh authorization

const saveUserData = async inp => {
  await storeData('token', inp.token);
  await storeData('refresh_token', inp.refresh_token);
  await storeData('expires_in', inp.expires_in);
  await storeData('userIID', inp.public_id.toString());
};

export default authAxiosFactory;
