import PropTypes from "prop-types";
import styles from "./MapRwdImg.module.css";

export default function MapRwdImg({ src, alt }) {
  return (
    <div className={styles.mapRwdImg}>
      <img src={src} alt={alt} />
    </div>
  );
}

MapRwdImg.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};
