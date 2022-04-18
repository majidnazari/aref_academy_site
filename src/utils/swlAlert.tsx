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