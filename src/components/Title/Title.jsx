import PropTypes from "prop-types";
import styles from "./Title.module.css";

export default function Title({ label }) {
  return <h2 className={styles.setTitle}>{label}</h2>;
}

Title.propTypes = {
  label: PropTypes.string.isRequired,
};
