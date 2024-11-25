import PropsType from "prop-types";
import styles from "./Label.module.css";

export default function Label({ label, ...props }) {
  return (
    <label className={styles.formLabel} {...props}>
      {label}
    </label>
  );
}

Label.propTypes = {
  label: PropsType.string.isRequired,
};
