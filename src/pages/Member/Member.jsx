import { useState } from "react";
import styles from "./Member.module.css";
import Aside from "../../layouts/Aside/Aside";
import AsideDt from "../../layouts/Aside/AsideDt/AsideDt.jsx";
import AsideDd from "../../layouts/Aside/AsideDt/AsideDd/AsideDd.jsx";
import ContentContainer from "../../layouts/ContentContainer/ContentContainer.jsx";
import UpdateMember from "./UpdateMember/UpdateMember.jsx";
import UpdatePassword from "../UpdatePassword/UpdatePassword.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function Member() {
  const { setIsLoggedIn } = useAuth();
  const [activeItem, setActiveItem] = useState("修改會員資料");
  const [activeContent, setActiveContent] = useState(<UpdateMember />);
  const [isRwdAside, setIsRwdAside] = useState(false);

  const handleItemClick = (label, component) => {
    setActiveItem(label);
    setActiveContent(component);
  };

  function handleRwdAside() {
    setIsRwdAside((prevIs) => !prevIs);
  }

  return (
    <div className={styles.mainContainer}>
      <button className={styles.openAsideBtn} onClick={handleRwdAside}>
        ▼
      </button>
      <aside className={`${styles.testAside} ${isRwdAside ? styles.open : ""}`}>
        <div
          className={styles.testAsideItem}
          onClick={() => handleItemClick("修改會員資料", <UpdateMember />)}
        >
          修改會員資料
        </div>
        <div
          className={styles.testAsideItem}
          onClick={() =>
            handleItemClick(
              "更改密碼",
              <UpdatePassword setIsLoggedIn={setIsLoggedIn} />
            )
          }
        >
          更改密碼
        </div>
        <div
          className={styles.testAsideItem}
          onClick={() => handleItemClick("細項", <div>細項</div>)}
        >
          細項
        </div>
        <button className={styles.closeAsideBtn} onClick={handleRwdAside}>
          ▲
        </button>
      </aside>

      <Aside>
        <AsideDt
          label="修改會員資料"
          onClick={() => handleItemClick("修改會員資料", <UpdateMember />)}
          isActive={activeItem === "修改會員資料"}
        />
        <AsideDt
          label="更改密碼"
          onClick={() => handleItemClick("更改密碼", <UpdatePassword />)} // 更改為 UpdatePassword 組件
          isActive={activeItem === "更改密碼"}
        />
        <AsideDd
          label="模擬細項"
          onClick={() => handleItemClick("細項", <div>細項</div>)}
          isActive={activeItem === "細項"}
        />
      </Aside>
      <ContentContainer>{activeContent}</ContentContainer>
    </div>
  );
}
