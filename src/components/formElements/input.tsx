import React from 'react';
import style from './style.module.scss';

const Input = ({
  placeholder,
  className,
  type,
  value,
  onChange,
}: {
  placeholder: string;
  className?: string;
  type?: 'text' | 'email' | 'password';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange  ? onChange : undefined}
      placeholder={placeholder}
      className={`${className + ' ' + style.shadow}`}
    />
  );
};

export default Input;
