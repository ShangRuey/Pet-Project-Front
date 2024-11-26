import styles from "./MainFormContainer.module.css";
import PropTypes from "prop-types";

export default function MainFormContainer({ children }) {
  return (
    <div className={styles.centerWrapper}>
      <div className={styles.loginContainer}>{children}</div>
    </div>
  );
}

MainFormContainer.propTypes = {
  children: PropTypes.any.isRequired,
};
