import { IToastProps } from 'components/Toast';

export interface IToast {
  message: string;
  showToast: boolean;
}

export interface IToastContext {
  showToast: ({ duration, message, onClose }: IToastProps) => void;
}

export interface IToastProvider {
  children: JSX.Element;
}
