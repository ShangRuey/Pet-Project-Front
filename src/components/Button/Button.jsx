import styles from "./Button.module.css";
import PropTypes from "prop-types";

export default function Button({ label, ...props }) {
  return (
    <button className={styles.setButton} {...props}>
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
};
