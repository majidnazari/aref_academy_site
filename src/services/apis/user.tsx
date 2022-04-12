import axios from "../axios";
//import authAxiosFactory from "../axios-auth";

interface getUsersResponse {
  success: boolean;
  token: string;
}
export const getUsers = async (): Promise<getUsersResponse> => {
  const req: any = await axios({ method: "get", url: "/users" });
  return req?.data;
};
