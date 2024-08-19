import React from 'react';

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
      className={`${className} p-2`}
    />
  );
};

export default Input;
