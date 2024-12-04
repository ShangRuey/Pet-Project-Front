import { useLocation } from "react-router-dom";
import { useState } from "react";
import styles from "./Detail.module.css";
import ques from "../../assets/index/ques.jpg"; // 確認導入圖片
import { useCart } from "../../contexts/CartContext";

export default function Detail() {
  const location = useLocation();
  const { product, amount: initialAmount } = location.state || {}; // 確保產品資料存在
  const [amount, setAmount] = useState(initialAmount || 1);
  const { addToCart } = useCart();

  if (!product) {
    return <div>產品詳細資料未找到</div>;
  }

  const increaseAmount = () => {
    setAmount((prevAmount) => prevAmount + 1);
  };

  const decreaseAmount = () => {
    setAmount((prevAmount) => (prevAmount > 1 ? prevAmount - 1 : 1));
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      amount: amount,
    });
  };

  return (
    <div className={styles.detailContainer}>
      <div className={styles.detailLeft}>
        <img className={styles.leftImg} src={ques} alt={product.name} />
        <button
          className={styles.backBtn}
          onClick={() => window.history.back()}
        >
          返回
        </button>
      </div>
      <div className={styles.detailRight}>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <span className={styles.productPrice}>${product.price}</span>
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
      </div>
    </div>
  );
}
