import React from "react";
import Styles from "./input.module.scss";

type PropsType = {
  label?: string;
  type: string;
  placeholder?: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
};

const Input = (props: PropsType) => {
  const { label, name, type, placeholder, defaultValue, disabled } = props;

  return (
    <div className={Styles.container}>
      {label && <label htmlFor={name}>{label}</label>}
      <input type={type} name={name} id={name} placeholder={placeholder} className={Styles.container_input} defaultValue={defaultValue} disabled={disabled} />
    </div>
  );
};

export default Input;
