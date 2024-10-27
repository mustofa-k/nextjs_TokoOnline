import React from "react";
import Styles from "./Button.module.scss";

type Propstype = {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  variant?: keyof typeof Styles;
  className?: string;
};

function Button(props: Propstype) {
  const { children, type, onClick, variant = "primary", className } = props;
  return (
    <div>
      <button type={type} onClick={onClick} className={`${Styles.button} ${variant ? Styles[variant] : ""} ${className}`}>
        {children}
      </button>
    </div>
  );
}

export default Button;
