import styles from "./Message.module.css";
import PropTypes from "prop-types";

export default function Message({ message }) {
  return <p className={styles.message}>{message}</p>;
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
};
