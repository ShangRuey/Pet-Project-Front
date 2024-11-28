import styles from "./ImageMapRwdItem.module.css";
import PropTypes from "prop-types";

export default function ImageMapRwdItem({ children, onClick }) {
  return (
    <div className={styles.imageMapRwdItem} onClick={onClick}>
      {children}
    </div>
  );
}

ImageMapRwdItem.propTypes = {
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
};
