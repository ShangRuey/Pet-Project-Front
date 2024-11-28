import styles from "./ImageMapItems.module.css";
import PropTypes from "prop-types";

export default function imageMapItems({ src, alt, css, onClick }) {
  return (
    <img
      src={src}
      className={`${styles.imageMapItem} ${styles[css]}`}
      alt={alt}
      onClick={onClick}
    />
  );
}

imageMapItems.propTypes = {
  src: PropTypes.string.isRequired,
  css: PropTypes.string.isRequired,
  alt: PropTypes.string,
};
