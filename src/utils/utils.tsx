import { getUserData } from "utils/user";
import { useTranslation } from 'react-i18next';
import  translates  from '../../src/locales/fa.json';

const translate = (alertText: string): string => {
  alertText = alertText.trim();
  return (alertText = (translates as Record<string, string>)[alertText]
    ? (translates as Record<string, string>)[alertText]
    : alertText);
}

export const generateErrorTextMessage = (body: any): string => {

  if (typeof body === "string") {
    
    return (translate(body));
  } else if (typeof body === "object") {
    let tmp = "";
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        tmp += (tmp === "" ? "" : " , ") + `${body[key]}`;
      }
    }
    return tmp;
  }
  return "";
};

export const setDarktheme = (isDarkTheme: string) => {
  localStorage.setItem("isDarkTheme", isDarkTheme);
};

export const getDarktheme = () => {
  return localStorage.getItem("isDarkTheme") === "true" ? true : false;
};

export function divide(a: number, b: number): number {
  // Sure, we cannot divide by 0,
  // so in this case we will throw an error.
  if (b === 0) {
    throw new Error("You can't divide by zero.");
  }

  // If everything is okay, we will return
  // a round division result.
  return Math.round(a / b);
}

export const generateQueryOptions = () => {
  const userGroup = getUserData()?.group?.name || "";
  switch (userGroup) {
    case "admin":
      return {
        financial_status: "pending",
      };
    case "manager":
      return {
        manager_status_not_equal: "approved",
      };
    case "financial":
      return {
        financial_status: "pending",
      };
    case "consultant_manager":
      return {
        manager_status: "pending",
      };
    default:
      return {};
  }
};


export const vmsNationalCode = (input: any) => {
  if (
    !/^\d{10}$/.test(input) ||
    input === "0000000000" ||
    input === "1111111111" ||
    input === "2222222222" ||
    input === "3333333333" ||
    input === "4444444444" ||
    input === "5555555555" ||
    input === "6666666666" ||
    input === "7777777777" ||
    input === "8888888888" ||
    input === "9999999999"
  )
    return false;
  var check = parseInt(input[9]);
  var sum = 0;
  var i;
  for (i = 0; i < 9; ++i) {
    sum += parseInt(input[i]) * (10 - i);
  }
  sum %= 11;
  return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11);
};
