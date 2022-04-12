import authAxiosFactory from '../axios-auth';

/**
 * get instances
 * @returns object
 */
export const getInstances = async () => {
  const axiosInstance = await authAxiosFactory();
  const req = await axiosInstance({
    method: 'get',
    url: '/classes/instances',
  });
  return req;
};

/**
 * get instances bookings
 * param {string} classInstanceIID
 * @returns object
 */
export const getInstanceBooks = async classInstanceIID => {
  const axiosInstance = await authAxiosFactory();
  const req = await axiosInstance({
    method: 'get',
    url: `/classes/instances/${classInstanceIID}/book`,
  });
  return req;
};
