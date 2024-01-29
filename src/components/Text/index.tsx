import { FC } from 'react';

import './text.scss';

interface ITextProps {
  children: React.ReactNode;
  className?: string;
}

export const Text: FC<ITextProps> & {
  Title: FC<ITextProps>;
  Subtitle: FC<ITextProps>;
} = ({ children, className }) => {
  return <p className={className ? `p ${className}` : 'p'}>{children}</p>;
};

Text.Title = ({ children, className }) => {
  return <h1 className={className ? `h1 ${className}` : 'h1'}>{children}</h1>;
};

Text.Subtitle = ({ children, className }) => {
  return <h2 className={className ? `h2 ${className}` : 'h2'}>{children}</h2>;
};
