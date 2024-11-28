import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import dogImg from "../../assets/index/dog.png";
import adoptImg from "../../assets/index/adopt.png";
import communityImg from "../../assets/index/community.png";
import mapImg from "../../assets/index/map.png";
import shopImg from "../../assets/index/shop.png";
import ImageMapItem from "./ImgaeMapItems/ImageMapItem.jsx";
import MapRwdImg from "./ImageMapRwdItems/MapRwdImg.jsx";
import MapRwdDes from "./ImageMapRwdItems/MapRwdDes.jsx";
import ImageMapRwdItem from "./ImageMapRwdItems/ImageMapRwdItem.jsx";

export default function Home() {
  useEffect(() => {
    // 確認頁面加載時的 cookies
    console.log("Initial cookies:", document.cookie);
  }, []);

  const navigate = useNavigate();

  const imageMapItems = [
    {
      src: dogImg,
      label: "會員中心",
      alt: "會員中心",
      css: "imageDog",
      path: "/member",
    },
    {
      src: adoptImg,
      label: "認養相關",
      alt: "認養",
      css: "imageAdopt",
      path: "/adopt",
    },
    {
      src: communityImg,
      label: "狗狗社群",
      alt: "社群",
      css: "imageCommunity",
      path: "/community",
    },
    {
      src: mapImg,
      label: "友善地圖",
      alt: "地圖",
      css: "imageMap",
      path: "/map",
    },
    {
      src: shopImg,
      label: "用品商店",
      alt: "商店",
      css: "imageShop",
      path: "/shop",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className={styles.imageMapContainer}>
        {imageMapItems.map((item) => (
          <ImageMapItem
            key={item.alt}
            src={item.src}
            css={item.css}
            alt={item.alt}
            onClick={() => handleNavigation(item.path)}
          />
        ))}
      </div>
      <div className={styles.imageMapRwd}>
        {imageMapItems.map((item, index) => (
          <ImageMapRwdItem
            key={item.alt}
            onClick={() => handleNavigation(item.path)}
          >
            {index % 2 === 0 ? (
              <>
                <MapRwdImg src={item.src} alt={item.alt} />
                <MapRwdDes label={item.label} />
              </>
            ) : (
              <>
                <MapRwdDes label={item.label} />
                <MapRwdImg src={item.src} alt={item.alt} />
              </>
            )}
          </ImageMapRwdItem>
        ))}
      </div>
    </>
  );
}
