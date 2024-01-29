import { ButtonHTMLAttributes, FC } from 'react';

import './button.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string;
  onClick?: () => void;
  text?: string;
}

export const Button: FC<IButtonProps> = ({
  children,
  className = '',
  disabled,
  onClick,
  text,
  ...rest
}) => {
  return (
    <button
      className={className ? `button ${className}` : 'button'}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {text || children}
    </button>
  );
};
