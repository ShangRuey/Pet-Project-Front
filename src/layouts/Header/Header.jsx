import PropTypes from "prop-types";
import styles from "./Header.module.css";
import logoImg from "../../assets/index/dog.png";
import MenuItem from "./MenuItem/MenuItem.jsx";

export default function Header({ isLoggedIn }) {
  return (
    <header>
      <nav className={styles.navBar}>
        <div className={styles.logoContainer}>
          <p className={styles.logoItem}>
            <img src={logoImg} className={styles.logoItem} alt="logo" />
            BlackDog
          </p>
        </div>
        <div className={isLoggedIn ? styles.functionColumn : styles.menuToggle}>
          <div className={styles.menuItems}>
            <MenuItem label="用品商店" itemName="petShop" />
            <MenuItem label="友善地圖" itemName="friendlyMap" />
            <MenuItem label="認養相關" itemName="petAdopt" />
            <MenuItem label="狗狗社群" itemName="petCommunity" />
            <MenuItem label="會員中心" itemName="memberCenter" />
          </div>
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
