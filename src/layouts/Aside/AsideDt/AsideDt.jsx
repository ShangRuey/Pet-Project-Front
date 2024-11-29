import PropTypes from "prop-types";
import styles from "./AsideDt.module.css";

export default function AsideDt({ label, onClick, isActive }) {
  return (
    <dt className={styles.asideDt}>
      <span
        className={`${isActive ? styles.active : ""} ${styles.dtSpan}`}
        onClick={onClick}
      >
        {label}
      </span>
    </dt>
  );
}

AsideDt.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};
