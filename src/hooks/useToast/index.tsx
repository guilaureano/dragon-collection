import { useContext } from 'react';

import { ToastContext } from 'context/ToastProvider';

export const useToast = () => {
  const context = useContext(ToastContext);

  return context;
};
