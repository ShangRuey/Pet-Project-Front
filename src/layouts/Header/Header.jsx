import styles from "./Header.module.css";
import logoImg from "../../assets/index/dog.png";
import MenuItem from "./MenuItem/MenuItem.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import Cookies from "js-cookie";

export default function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

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
      Cookies.remove("token");
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // 動態導航函數
  const createNavigationHandler = (path) => () => {
    navigate(path);
  };

  return (
    <header>
      <nav className={styles.navBar}>
        <div
          className={styles.logoContainer}
          onClick={createNavigationHandler("/home")}
        >
          <p className={styles.logoItem}>
            <img src={logoImg} className={styles.logoItem} alt="logo" />
            BlackDog
          </p>
        </div>
        <div className={isLoggedIn ? styles.functionColumn : styles.menuToggle}>
          <div className={styles.menuItems}>
            <MenuItem
              label="用品商店"
              itemName="petShop"
              onClick={createNavigationHandler("/shop")}
            />
            <MenuItem
              label="友善地圖"
              itemName="friendlyMap"
              onClick={createNavigationHandler("/map")}
            />
            <MenuItem
              label="認養相關"
              itemName="petAdopt"
              onClick={createNavigationHandler("/adopt")}
            />
            <MenuItem
              label="狗狗社群"
              itemName="petCommunity"
              onClick={createNavigationHandler("/community")}
            />
            <MenuItem
              label="會員中心"
              itemName="memberCenter"
              onClick={createNavigationHandler("/member")}
            />
            <MenuItem label="登出" itemName="logOut" onClick={handleLogout} />
          </div>
        </div>
      </nav>
    </header>
  );
}
