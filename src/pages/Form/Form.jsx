import styles from "./Form.module.css";
import PropTypes from "prop-types";

export default function Form({ children, handleSubmit }) {
  return (
    <form className={styles.setForm} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
