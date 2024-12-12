import PropTypes from "prop-types";
import styles from "./ContentItem.module.css";
import LazyLoad from "react-lazyload";

export default function ContentItem({
  albumFile,
  animalSex,
  bodyType,
  shelterName,
  itemData,
  onClick,
}) {
  return (
    <div className={styles.contentItem} onClick={() => onClick(itemData)}>
      <LazyLoad offset={100} once className={styles.contentImgContainer}>
        <img
          src={albumFile}
          alt={shelterName}
          className={styles.contentImg}
          loading="lazy"
        />
      </LazyLoad>
      <div className={styles.contentDog}>
        <p>性別: {animalSex}</p>
        <p>體型: {bodyType}</p>
        <p>收容所: {shelterName}</p>
      </div>
    </div>
  );
}

ContentItem.propTypes = {
  albumFile: PropTypes.string.isRequired,
  animalSex: PropTypes.string.isRequired,
  bodyType: PropTypes.string.isRequired,
  shelterName: PropTypes.string.isRequired,
  itemData: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
