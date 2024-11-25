import PropTypes from "prop-types";
import styles from "./MenuItem.module.css";

export default function MenuItem({ label, itemName }) {
  return <div className={styles[itemName]}>{label}</div>;
}

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
};
