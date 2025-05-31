import styles from "./Select.module.scss";

const Select = ({ children, ...rest }) => {
  return (
    <select className={styles.select} {...rest}>
      {children}
    </select>
  );
};

export default Select;
