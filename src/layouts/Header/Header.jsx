import PropTypes from "prop-types";
import styles from "./Header.module.css";
import logoImg from "../../assets/index/dog.png";
import MenuItem from "./MenuItem/MenuItem.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        {
          withCredentials: true, // 確保 cookie 包含在請求中
        }
      );
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

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
            <MenuItem label="登出" itemName="logOut" onClick={handleLogout} />
          </div>
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};
