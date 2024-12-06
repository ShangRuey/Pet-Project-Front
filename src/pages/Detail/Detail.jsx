// Detail.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styles from "./Detail.module.css";
import ques from "../../assets/index/ques.jpg";
import { useCart } from "../../contexts/CartContext";
import { useUser } from "../../contexts/UserContext";

const areaIdToChineseMap = {
  2: "臺北市",
  13: "雲林縣",
  3: "新北市",
  14: "嘉義縣",
  4: "基隆市",
  15: "嘉義市",
  5: "宜蘭縣",
  16: "臺南市",
  6: "桃園縣",
  17: "高雄市",
  7: "新竹縣",
  18: "屏東縣",
  8: "新竹市",
  19: "花蓮縣",
  9: "苗栗縣",
  20: "臺東縣",
  10: "臺中市",
  21: "澎湖縣",
  11: "彰化縣",
  22: "金門縣",
  12: "南投縣",
  23: "連江縣",
};
const shelterIdToChineseMap = {
  48: "基隆市寵物銀行",
  71: "嘉義市流浪犬收容中心",
  49: "臺北市動物之家",
  72: "嘉義縣流浪犬中途之家",
  50: "新北市板橋區公立動物之家",
  73: "臺南市動物之家灣裡站",
  51: "新北市新店區公立動物之家",
  74: "臺南市動物之家善化站",
  53: "新北市中和區公立動物之家",
  75: "高雄市壽山動物保護教育園區",
  55: "新北市淡水區公立動物之家",
  76: "高雄市燕巢動物保護關愛園區",
  56: "新北市瑞芳區公立動物之家",
  77: "屏東縣流浪動物收容所",
  58: "新北市五股區公立動物之家",
  78: "宜蘭縣流浪動物中途之家",
  59: "新北市八里區公立動物之家",
  79: "花蓮縣流浪犬中途之家",
  60: "新北市三芝區公立動物之家",
  80: "臺東縣動物收容中心",
  61: "桃園市動物保護教育園區",
  81: "連江縣流浪犬收容中心",
  62: "新竹市動物收容所",
  82: "金門縣動物收容中心",
  63: "新竹縣動物收容所",
  83: "澎湖縣流浪動物收容中心",
  67: "臺中市動物之家南屯園區",
  89: "雲林縣流浪動物收容所",
  68: "臺中市動物之家后里園區",
  92: "新北市政府動物保護防疫處",
  69: "彰化縣流浪狗中途之家",
  96: "苗栗縣生態保育教育中心",
  70: "南投縣公立動物收容所",
};
const sexIdToChineseMap = {
  M: "公",
  F: "母",
};
const ageIdToChinese = {
  ADULT: "成年",
  CHILD: "幼年",
};
const bodytypeToChineseMap = {
  SMALL: "小型",
  MEDIUM: "中型",
  BIG: "大型",
};

export default function Detail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { item, type } = location.state || {};
  const [amount, setAmount] = useState(1);
  const [adopted, setAdopted] = useState(false); // 用來追蹤是否已申請認養
  const { addToCart } = useCart();
  const { user } = useUser(); // 使用 useUser 來獲取當前用戶信息

  if (!item) {
    return <div>詳細資料未找到</div>;
  }

  const increaseAmount = () => {
    setAmount((prevAmount) => prevAmount + 1);
  };

  const decreaseAmount = () => {
    setAmount((prevAmount) => (prevAmount > 1 ? prevAmount - 1 : 1));
  };

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      amount: amount,
    });
  };

  const handleAdoptClick = async () => {
    console.log(user.id);
    if (!user) {
      alert("請先登錄以申請認養");
      return;
    }

    const confirmAdopt = window.confirm("確定要認養這個動物嗎？");
    if (confirmAdopt) {
      try {
        const response = await axios.post(
          "http://localhost:5000/adopt",
          {
            userId: user.id,
            animalId: item.animal_id,
          },
          {
            withCredentials: true, // 確保包括 Cookies
          }
        );
        if (response.data.success) {
          alert("申請認養成功");
          setAdopted(true); // 更新狀態為已申請認養
        }
      } catch (error) {
        console.log("申請認養失敗", error);
      }
    }
  };

  return (
    <div className={styles.detailContainer}>
      <div className={styles.detailLeft}>
        <img
          className={styles.leftImg}
          src={type === "adopt" ? item.album_file : ques}
          alt={item.name}
        />
        <button
          className={styles.backBtn}
          onClick={() => window.history.back()}
        >
          返回
        </button>
      </div>
      <div className={styles.detailRight}>
        <h1>{item.name}</h1>
        {type === "adopt" ? (
          <>
            <p>動物年齡: {ageIdToChinese[item.animal_age]}</p>
            <p>動物性別: {sexIdToChineseMap[item.animal_sex]}</p>
            <p>收容所: {shelterIdToChineseMap[item.animal_shelter_pkid]}</p>
            <p>所屬縣市: {areaIdToChineseMap[item.animal_area_pkid]}</p>
            <button onClick={handleAdoptClick}>
              {adopted ? "已申請認養" : "我要認養"}
            </button>
          </>
        ) : (
          <>
            <p>{item.description}</p>
            <span className={styles.productPrice}>${item.price}</span>
            <div className={styles.cartBar}>
              <button className={styles.cartButton} onClick={decreaseAmount}>
                -
              </button>
              <input
                type="text"
                value={amount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setAmount(value ? parseInt(value, 10) : 1);
                  }
                }}
                className={styles.cartAmount}
              />
              <button className={styles.cartButton} onClick={increaseAmount}>
                +
              </button>
            </div>
            <button onClick={handleAddToCart}>加入購物車</button>
          </>
        )}
      </div>
    </div>
  );
}
