import React from "react";
import Styles from "./button.module.scss";

type PropsTypes = {
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
};

const Button = (props: PropsTypes) => {
  const { type, onClick, children, variant = "primary", className } = props;
  return (
    <button type={type} onClick={onClick} className={`${Styles.button} ${Styles[variant]} ${className}`}>
      {" "}
      {children}
    </button>
  );
};

export default Button;
