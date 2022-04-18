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