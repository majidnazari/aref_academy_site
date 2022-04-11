import { removeToken } from "./auth";

export const saveUserData = (user: any) => {
    localStorage.setItem('user', JSON.stringify(user));
}

export const removeUserData = () => {
    localStorage.removeItem('user');
}

export const logout = () => {
    removeToken();
    removeUserData();
}

