import { getUserData } from 'utils/user';

export const generateErrorTextMessage = (body: any): string => {
    if (typeof body === 'string') {
        return body;
    } else if (typeof body === 'object') {
        let tmp = '';
        for (const key in body) {
            if (body.hasOwnProperty(key)) {
                tmp += (tmp === '' ? '' : ' , ') + `${body[key]}`;
            }
        }
        return tmp;
    }
    return '';
}

export const setDarktheme = (isDarkTheme: string) => {
    localStorage.setItem('isDarkTheme', isDarkTheme);
}

export const getDarktheme = () => {
    return localStorage.getItem('isDarkTheme') === 'true' ? true : false;
}

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
    const userGroup = (getUserData())?.group?.name || '';
    switch (userGroup) {
        case 'admin':
            return {
                manager_financial_not_equal: 'approved'
            };
        case 'manager':
            return {
                manager_status_not_equal: 'approved',
            };
        case 'financial':
            return { financial_status_not_equal: 'approved' };
        default:
            return {};
    }
}