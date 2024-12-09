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
    if (type === "瑞威") {
      handleItemClick(
        "瑞威",
        <Index
          filter={{ brandId: "1", category: "飼料" }}
          onImageClick={handleImageClick}
        />
      );
    } else if (type === "玩具") {
      handleItemClick(
        "玩具",
        <Index filter={{ category: "玩具" }} onImageClick={handleImageClick} />
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
              "飼料",
              <Index
                filter={{ brandId: "1" }}
                onImageClick={handleImageClick}
              />
            )
          }
        >
          飼料
        </div>
        <div
          className={styles.testAsideItem}
          onClick={() =>
            handleItemClick(
              "瑞威",
              <Index
                filter={{ brandId: "1", category: "飼料" }}
                onImageClick={handleImageClick}
              />
            )
          }
        >
          瑞威
        </div>
        <div
          className={styles.testAsideItem}
          onClick={() =>
            handleItemClick(
              "玩具",
              <Index
                filter={{ category: "玩具" }}
                onImageClick={handleImageClick}
              />
            )
          }
        >
          玩具
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
          label="飼料"
          onClick={() =>
            handleItemClick(
              "飼料",
              <Index
                filter={{ brandId: "1" }}
                onImageClick={handleImageClick}
              />
            )
          }
          isActive={activeItem === "飼料"}
        />
        <AsideDd
          label="瑞威"
          onClick={() =>
            handleItemClick(
              "瑞威",
              <Index
                filter={{ brandId: "1", category: "飼料" }}
                onImageClick={handleImageClick}
              />
            )
          }
          isActive={activeItem === "瑞威"}
        />
        <AsideDt
          label="玩具"
          onClick={() =>
            handleItemClick(
              "玩具",
              <Index
                filter={{ category: "玩具" }}
                onImageClick={handleImageClick}
              />
            )
          }
          isActive={activeItem === "玩具"}
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
