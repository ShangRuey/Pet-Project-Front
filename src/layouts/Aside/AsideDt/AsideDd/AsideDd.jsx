import PropTypes from "prop-types";
import styles from "./AsideDd.module.css";

export default function AsideDd({ label, onClick, isActive }) {
  return (
    <dd className={styles.asideDd}>
      <span
        className={`${isActive ? styles.active : ""} ${styles.ddSpan}`}
        onClick={onClick}
      >
        {label}
      </span>
    </dd>
  );
}

AsideDd.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};
