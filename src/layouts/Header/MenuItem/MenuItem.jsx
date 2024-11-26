import PropTypes from "prop-types";
import styles from "./MenuItem.module.css";

export default function MenuItem({ label, itemName, onClick }) {
  return (
    <div className={styles[itemName]} onClick={onClick}>
      {label}
    </div>
  );
}

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
