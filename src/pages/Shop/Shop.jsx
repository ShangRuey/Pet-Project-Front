import { useState } from "react";
import MainContainer from "../../layouts/MainContainer/MainContainer.jsx";
import Aside from "../../layouts/Aside/Aside.jsx";
import AsideDt from "../../layouts/Aside/AsideDt/AsideDt.jsx";
import AsideDd from "../../layouts/Aside/AsideDt/AsideDd/AsideDd.jsx";
import ContentContainer from "../../layouts/ContentContainer/ContentContainer.jsx";
import Index from "./Index/Index.jsx";
import Cart from "../Cart/Cart.jsx";
import { useCart } from "../../contexts/CartContext";
import styles from "./Shop.module.css";

export default function Shop() {
  const [isRwdAside, setIsRwdAside] = useState(false);
  const [activeItem, setActiveItem] = useState("首頁");

  const handleImageClick = (type) => {
    if (type === "清燉") {
      handleItemClick(
        "清燉",
        <Index filter={{ category: "清燉" }} onImageClick={handleImageClick} />
      );
    } else if (type === "功夫") {
      handleItemClick(
        "功夫",
        <Index filter={{ category: "功夫" }} onImageClick={handleImageClick} />
      );
    }
  };
  const [activeContent, setActiveContent] = useState(
    <Index filter={{}} onImageClick={handleImageClick} />
  );

  const handleItemClick = (label, component) => {
    setActiveItem(label);
    setActiveContent(component);
  };

  function handleRwdAside() {
    setIsRwdAside((prevIs) => !prevIs);
  }

  const { cartItems } = useCart();

  return (
    <MainContainer>
      <button className={styles.openAsideBtn} onClick={handleRwdAside}>
        ▼
      </button>
      <aside className={`${styles.testAside} ${isRwdAside ? styles.open : ""}`}>
        <div
          className={styles.testAsideItem}
          onClick={() =>
            handleItemClick(
              "首頁",
              <Index filter={{}} onImageClick={handleImageClick} />
            )
          }
        >
          首頁
        </div>
        <div
          className={styles.testAsideItem}
          onClick={() =>
            handleItemClick(
              "清燉罐裝75g",
              <Index
                filter={{ brandId: "1", category: "清燉" }}
                onImageClick={handleImageClick}
              />
            )
          }
        >
          清燉75g
        </div>
        <div
          className={styles.testAsideItem}
          onClick={() =>
            handleItemClick(
              "清燉箱購",
              <Index
                filter={{ brandId: "2", category: "清燉" }}
                onImageClick={handleImageClick}
              />
            )
          }
        >
          清燉箱購
        </div>
        <div
          className={styles.testAsideItem}
          onClick={() =>
            handleItemClick(
              "功夫罐裝130g",
              <Index
                filter={{ brandId: "1", category: "功夫" }}
                onImageClick={handleImageClick}
              />
            )
          }
        >
          罐裝功夫菜130g
        </div>
        <div
          className={styles.testAsideItem}
          onClick={() =>
            handleItemClick(
              "功夫箱購",
              <Index
                filter={{ brandId: "2", category: "功夫" }}
                onImageClick={handleImageClick}
              />
            )
          }
        >
          功夫菜箱購
        </div>
        <div
          className={styles.testAsideItem}
          onClick={() =>
            handleItemClick("購物車", <Cart cartItems={cartItems} />)
          }
        >
          購物車
        </div>
        <button className={styles.closeAsideBtn} onClick={handleRwdAside}>
          ▲
        </button>
      </aside>
      <Aside>
        <AsideDt
          label="首頁"
          onClick={() =>
            handleItemClick(
              "首頁",
              <Index filter={{}} onImageClick={handleImageClick} />
            )
          }
          isActive={activeItem === "首頁"}
        />
        <AsideDt
          label="清燉罐裝75g"
          onClick={() =>
            handleItemClick(
              "清燉罐裝75g",
              <Index
                filter={{ brandId: "1", category: "清燉" }}
                onImageClick={handleImageClick}
              />
            )
          }
          isActive={activeItem === "清燉罐裝75g"}
        />
        <AsideDd
          label="清燉箱購"
          onClick={() =>
            handleItemClick(
              "清燉箱購",
              <Index
                filter={{ brandId: "2", category: "清燉" }}
                onImageClick={handleImageClick}
              />
            )
          }
          isActive={activeItem === "清燉箱購"}
        />
        <AsideDt
          label="功夫罐裝130g"
          onClick={() =>
            handleItemClick(
              "功夫罐裝130g",
              <Index
                filter={{ brandId: "1", category: "功夫" }}
                onImageClick={handleImageClick}
              />
            )
          }
          isActive={activeItem === "功夫罐裝130g"}
        />
        <AsideDd
          label="功夫箱購"
          onClick={() =>
            handleItemClick(
              "功夫箱購",
              <Index
                filter={{ brandId: "2", category: "功夫" }}
                onImageClick={handleImageClick}
              />
            )
          }
          isActive={activeItem === "功夫箱購"}
        />
        <AsideDt
          label="購物車"
          onClick={() =>
            handleItemClick("購物車", <Cart cartItems={cartItems} />)
          }
          isActive={activeItem === "購物車"}
        />
      </Aside>
      <ContentContainer>{activeContent}</ContentContainer>
    </MainContainer>
  );
}
