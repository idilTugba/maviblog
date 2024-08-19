import React from 'react';
import style from './style.module.scss';

const Input = ({
  placeholder,
  className,
}: {
  placeholder: string;
  className?: string;
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`${className + ' ' + style.shadow} p-2`}
    />
  );
};

export default Input;
