import authAxiosFactory from '../axios-auth';

/**
 * add asset
 * @param {file} data.File
 * @param {string} bucketName
 * @returns object
 */
export const addAsset = async (bucketName, data) => {
  const axiosInstance = await authAxiosFactory(true, true);
  const req = await axiosInstance({
    method: 'post',
    url: `/assets?bucketName=${bucketName}`,
    data,
  });
  return req;
};

/**
 * get asset
 * @param {string} bucketNameAndfileName
 * @returns object
 */
export const getAsset = async bucketNameAndfileName => {
  const axiosInstance = await authAxiosFactory();
  const req = await axiosInstance({
    method: 'get',
    url: `/assets/${bucketNameAndfileName}`,
  });
  return req;
};
