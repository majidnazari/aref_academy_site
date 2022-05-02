import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { generateErrorTextMessage } from './utils';

const MySwal = withReactContent(Swal);
const Toast = MySwal.mixin({
    toast: true,
    position: 'bottom-left',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    width: '380px',
})

export const showError = (msg: any): any => {
    Toast.fire({
        icon: 'error',
        title: generateErrorTextMessage(msg)
    })
}

export const showSuccess = (msg: any): any => {
    Toast.fire({
        icon: 'success',
        title: msg
    })
}

export const showConfirm = (callBack:Function): any => {
    Swal.fire({
        text: "آیا اطمینان دارید؟",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        cancelButtonText: "خیر",
        confirmButtonText: 'بله!',
    }).then((result) => {
        if (result.isConfirmed) {
            callBack();
        }
    })
}