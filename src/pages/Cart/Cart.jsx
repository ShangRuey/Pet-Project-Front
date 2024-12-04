import { useCart } from "../../contexts/CartContext";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const { cartItems, removeFromCart, updateCartItem, clearCart } = useCart();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.amount * item.price,
    0
  );

  const increaseAmount = (id) => {
    updateCartItem(id, 1);
  };

  const decreaseAmount = (id) => {
    updateCartItem(id, -1);
  };

  const handleNavigateToDetail = (product) => {
    navigate(`/detail/${product.id}`, {
      state: { product, amount: product.amount },
    });
  };

  const handleCheckout = async () => {
    if (window.confirm("你確定要結帳嗎？")) {
      try {
        const response = await axios.post(
          "http://localhost:5000/checkout",
          { cartItems },
          { withCredentials: true }
        );
        if (response.data.message === "結帳成功") {
          alert("結帳成功！");
          clearCart(); // 清空購物車
        }
      } catch (error) {
        alert(error.response.data.message || "結帳失敗，請稍後再試");
      }
    }
  };

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartTitle}>購物車</h2>
      <div className={styles.cartProduct}>
        <div className={styles.cartBar}>
          <div className={styles.cartBarItem}>商品</div>
          <div className={styles.cartBarItem}>商品數量</div>
          <div className={styles.cartBarItem}>商品單價</div>
          <div className={styles.cartBarItem}>商品總計</div>
        </div>
        <div className={styles.cartItems}>
          {cartItems.map((item) => (
            <div className={styles.cartRow} key={item.id}>
              <span
                className={styles.cartItem}
                onClick={() => handleNavigateToDetail(item)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.cartImg}
                />
                <span>{item.name}</span>
              </span>
              <span
                className={styles.cartItem}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    decreaseAmount(item.id);
                  }}
                >
                  -
                </button>
                {item.amount}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    increaseAmount(item.id);
                  }}
                >
                  +
                </button>
              </span>
              <span
                className={styles.cartItem}
                onClick={(e) => e.stopPropagation()}
              >
                ${item.price}
              </span>
              <span
                className={styles.cartItem}
                onClick={(e) => e.stopPropagation()}
              >
                ${item.amount * item.price}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromCart(item.id);
                  }}
                >
                  刪除
                </button>
              </span>
            </div>
          ))}
        </div>
        <h3 className={styles.cartTotal}>總計: ${totalAmount}</h3>
        <button className={styles.checkoutButton} onClick={handleCheckout}>
          結帳
        </button>
      </div>
    </div>
  );
}
