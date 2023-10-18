import { useState } from "react";
import { removeToken } from "./auth";
import { UserData } from "./dto/user-data.dto";

export const saveUserData = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserData = () => {
  localStorage.removeItem("user");
};

export const logout = () => {
  removeToken();
  removeUserData();
};

export const getUserData = (): UserData => {
  const user = localStorage.getItem("user");
  if (!user) {
    return {
      id: "",
      email: "",
      first_name: "",
      last_name: "",
      created_at: "",
      updated_at: "",
      group: {
        name: "",
        menus: [],
      },
    };
  }
  return JSON.parse(user);
};

export const useAuth = () => {
  const [user, setUser] = useState<UserData>();

  const tmp_user = localStorage.getItem("user");
  if (!tmp_user) {
    return {
      id: "",
      email: "",
      first_name: "",
      last_name: "",
      created_at: "",
      updated_at: "",
      group: {
        name: "",
        menus: [],
      },
    };
  }
  setUser( JSON.parse(tmp_user));
  return user;
};
