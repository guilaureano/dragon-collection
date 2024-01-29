import { createContext, useState } from 'react';

import { Toast } from 'components';
import { IToastProps } from 'components/Toast';
import { IToastContext, IToastProvider } from './types';

export const ToastContext = createContext<IToastContext>({} as IToastContext);

export const ToastProvider = ({ children }: IToastProvider) => {
  const [toast, setToast] = useState<string | null>(null);

  async function showToast({ duration = 5000, message, onClose }: IToastProps) {
    setToast(message);
    setTimeout(() => {
      if (onClose) {
        setToast(null);
      }
      setToast(null);
    }, duration);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast} />}
    </ToastContext.Provider>
  );
};
