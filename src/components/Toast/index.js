import { useSnackbar } from 'notistack';

let useSnackbarRef;

const Toast = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

export const toastActions = {
  success(msg) {
    this.toast(msg, 'success');
  },
  warning(msg) {
    this.toast(msg, 'warning');
  },
  info(msg) {
    this.toast(msg, 'info');
  },
  error(msg) {
    this.toast(msg, 'error');
  },
  toast(msg, variant = 'default') {
    useSnackbarRef.enqueueSnackbar(msg, { variant });
  },
};

export default Toast;
