import { useState, useEffect } from "react";
import Aside from "../../layouts/Aside/Aside";
import AsideDt from "../../layouts/Aside/AsideDt/AsideDt";
import ContentContainer from "../../layouts/ContentContainer/ContentContainer";
import styles from "./Community.module.css";
import CommunityChat from "./CommunityChat/CommunityChat.jsx";
import { useUser } from "../../contexts/UserContext";

export default function Community() {
  const { user, loading } = useUser();
  const [activeItem, setActiveItem] = useState("聊天室");
  const [activeContent, setActiveContent] = useState(null);
  const [isRwdAside, setIsRwdAside] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      setActiveContent(<CommunityChat user={user} />);
    }
  }, [loading, user]);

  function handleRwdAside() {
    setIsRwdAside((prevIs) => !prevIs);
  }

  const handleItemClick = (label, component) => {
    setActiveItem(label);
    setActiveContent(component);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.mainContainer}>
      <button className={styles.openAsideBtn} onClick={handleRwdAside}>
        ▼
      </button>
      <aside className={`${styles.testAside} ${isRwdAside ? styles.open : ""}`}>
        <div
          className={styles.testAsideItem}
          onClick={() =>
            handleItemClick("聊天室", <CommunityChat user={user} />)
          }
        >
          聊天室
        </div>
        <button className={styles.closeAsideBtn} onClick={handleRwdAside}>
          ▲
        </button>
      </aside>
      <Aside>
        <AsideDt
          label="聊天室"
          onClick={() =>
            handleItemClick("聊天室", <CommunityChat user={user} />)
          }
          isActive={activeItem === "聊天室"}
        />
      </Aside>
      <ContentContainer>{activeContent}</ContentContainer>
    </div>
  );
}
