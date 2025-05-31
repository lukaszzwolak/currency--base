import styles from "./TextInput.module.scss";

const TextInput = (props) => {
  return <input className={styles.input} {...props} />;
};

export default TextInput;
