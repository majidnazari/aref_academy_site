import axios from '../axios';
import authAxiosFactory from '../axios-auth';

/**
 * user login
 * @param {string} data.username
 * @param {string} data.password
 * @returns object
 */
export const signin = async data => {
  const req = await axios({method: 'post', url: '/users/signin', data});
  return req;
};

/**
 * forget password
 * @param {string} data.email
 * @returns object
 */
export const forgotPassword = async data => {
  const req = await axios({
    method: 'post',
    url: '/users/forgot-password',
    data,
  });

  return req;
};

/**
 * refresh tokrn
 * @param {string} data.refresh_token
 * @returns object
 */
export const refreshToken = async data => {
  const req = await axios({
    method: 'post',
    url: '/users/refresh_token',
    data,
  });

  return req;
};

/**
 * forget password verify
 * @param {string} data.verification_code
 * @returns object
 */
export const forgotPasswordVerify = async data => {
  const req = await axios({
    method: 'post',
    url: '/users/forgot-password/verify',
    data,
  });

  return req;
};

/**
 * forget password update
 * @param {string} data.token
 * @param {string} data.password
 * @returns object
 */
export const forgotPasswordUpdate = async data => {
  const req = await axios({
    method: 'post',
    url: '/users/forgot-password/update',
    data,
  });

  return req;
};

/**
 * get user profile
 * @param {string} userIID
 * @returns object
 */
export const getUser = async userIID => {
  const axiosInstance = await authAxiosFactory();
  const req = await axiosInstance({
    method: 'get',
    url: `/users/${userIID}`,
  });
  return req;
};

/**
 * update user profile
 * @param {string} userIID
 * @param {string} data.name
 * @param {string} data.email
 * @param {string} data.password
 * @param {string} data.profile_description
 * @param {string} data.profile_img_path
 * @param {string} data.user_name
 * @returns object
 */
export const updateUserProfile = async (data, userIID) => {
  const axiosInstance = await authAxiosFactory();
  const req = await axiosInstance({
    method: 'patch',
    url: `/users/${userIID}`,
    data,
  });

  return req;
};

/**
 * PUT update password
 * @param {string} userIID
 * @param {string} data.old-password
 * @param {string} data.new-password
 * @returns object
 */
export const updatePassword = async (data, userIID) => {
  const axiosInstance = await authAxiosFactory();
  const req = await axiosInstance({
    method: 'put',
    url: `/users/${userIID}/password`,
    data,
  });

  return req;
};
