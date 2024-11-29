import styles from "./ContentContainer.module.css";
import PropTypes from "prop-types";

export default function ContentContainer({ children }) {
  return <div className={styles.contentContainer}>{children}</div>;
}

ContentContainer.propTypes = {
  children: PropTypes.any,
};
