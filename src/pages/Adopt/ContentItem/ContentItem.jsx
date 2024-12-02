import styles from "./ContentItem.module.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function ContentItem({
  albumFile,
  animalSex,
  bodyType,
  shelterName,
}) {
  const [imageSrc, setImageSrc] = useState(albumFile || "ques");

  useEffect(() => {
    const img = new Image();
    img.src = albumFile || "ques";
    img.onload = () => setImageSrc(albumFile || "ques");
  }, [albumFile]);

  return (
    <div className={styles.contentItem}>
      <img
        className={styles.contentImg}
        src={imageSrc}
        alt="dog"
        loading="lazy"
      />
      <span className={styles.contentDog}>性別：{animalSex}</span>
      <span className={styles.contentDog}>體型：{bodyType}</span>
      <span className={styles.contentDog}>地點：{shelterName}</span>
    </div>
  );
}

ContentItem.propTypes = {
  albumFile: PropTypes.string.isRequired,
  animalSex: PropTypes.string.isRequired,
  bodyType: PropTypes.string.isRequired,
  shelterName: PropTypes.string.isRequired,
};
