import axios from "../axios";
//import authAxiosFactory from "../axios-auth";

interface LoginData {
  email: string;
  password: string;
}
interface LoginResponse {
  success: boolean;
  token: string;
}
export const signin = async (data: LoginData): Promise<LoginResponse> => {
  const req: any = await axios({ method: "post", url: "/login", data });
  return req?.data;
};
