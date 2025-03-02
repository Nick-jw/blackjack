import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  ...rest
}) => {
  return (
    <button
      className=" bg-primary border border-dark rounded-lg p-2 cursor-pointer"
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
