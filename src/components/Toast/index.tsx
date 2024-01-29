import React, { useEffect } from 'react';

import './toast.scss';

export interface IToastProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}

export const Toast: React.FC<IToastProps> = ({
  message,
  duration = 10000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className='toast'>
      <div className='toast-message'>{message}</div>
      {onClose && (
        <button className='close-button' onClick={handleClose}>
          X
        </button>
      )}
    </div>
  );
};
