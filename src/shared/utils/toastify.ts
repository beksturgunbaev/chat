import { toast } from 'react-toastify';

type toastTypes = {
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error';
    isLoading: boolean;
}

let toastId: null | number | string = null;

export const showToast = ({ message, type, isLoading }: toastTypes) => {
    if (isLoading) {
        toastId = toast.loading(message, { autoClose: 5000, isLoading });
    } else {
        if (toastId) {
            toast.update(toastId, {
                render: message,
                type: type || 'default',
                isLoading: false,
                autoClose: 3000,
            });
        } else {
            if (type) {
                toastId = toast[type](message, { autoClose: 3000 });
            } else {
                toastId = toast(message, { autoClose: 3000 });
            }
        }
    }
};
