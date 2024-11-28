import styles from "./MapRwdDes.module.css";
import PropTypes from "prop-types";

export default function MapRwdDes({ label }) {
  return (
    <div className={styles.mapRwdDes}>
      <p className={styles.mapRwdLabel}>{label}</p>
    </div>
  );
}

MapRwdDes.propTypes = {
  label: PropTypes.string.isRequired,
};
