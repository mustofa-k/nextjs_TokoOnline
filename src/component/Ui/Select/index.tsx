import styles from "./Select.module.scss";

type option = {
  label: string;
  value: string;
};

type PropsType = {
  label?: string;

  name: string;
  defaultValue?: string;
  disebled?: boolean;
  options: option[];
};

const Select = (props: any) => {
  const { label, name, defaultValue, disebled, options } = props;
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <select className={styles.container_select} name={name} id={name} defaultValue={defaultValue} disabled={disebled}>
        {options.map((option: option) => (
          <option value={option.value} key={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
