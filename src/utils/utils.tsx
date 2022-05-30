export const generateErrorTextMessage = (body: any): string => {
    if (typeof body === 'string') {
        return body;
    } else if (typeof body === 'object') {
        let tmp = '';
        for (const key in body) {
            if (body.hasOwnProperty(key)) {
                tmp += (tmp === '' ? '' : ' , ') + `${body[key]}\n`;
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