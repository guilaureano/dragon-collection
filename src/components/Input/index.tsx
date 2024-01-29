import { InputHTMLAttributes } from 'react';

import './input.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  value: string;
}

export const Input: React.FC<IInputProps> = ({
  isInvalid,
  placeholder,
  onChange,
  type,
  value,
  ...rest
}) => {
  const style = isInvalid ? 'input invalid' : 'input';
  return (
    <input
      {...rest}
      className={style}
      placeholder={placeholder}
      onChange={onChange}
      type={type}
      value={value}
    />
  );
};
