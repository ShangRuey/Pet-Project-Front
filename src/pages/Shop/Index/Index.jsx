import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Index.module.css";
import axios from "axios";
import ques from "../../../assets/index/ques.jpg";
import one from "../../../assets/index/1.png"; // 確保正確導入第二張圖片
import PropTypes from "prop-types";
import { useCart } from "../../../contexts/CartContext";

export default function Index({ filter, onImageClick }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [amounts, setAmounts] = useState({});
  const { addToCart } = useCart();

  const images = [ques, one]; // 確保所有圖片都包含在這裡

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        const filteredProducts = response.data.filter(
          (product) => product.stock > 0
        );

        let filtered = filteredProducts;
        if (filter && Object.keys(filter).length > 0) {
          filtered = filteredProducts.filter((product) => {
            let isMatch = true;
            if (filter.brandId) {
              isMatch = isMatch && product.brandId === filter.brandId;
            }
            if (filter.category) {
              isMatch = isMatch && product.category === filter.category;
            }
            return isMatch;
          });
        }
        setProducts(filtered);

        // 初始化每個產品的數量
        const initialAmounts = {};
        filtered.forEach((product) => {
          initialAmounts[product.id] = 1;
        });
        setAmounts(initialAmounts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [filter]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 每3秒切換一次圖片

    return () => clearInterval(interval); // 清除定時器
  }, [images.length]);

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const increaseAmount = (productId) => {
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [productId]: prevAmounts[productId] + 1,
    }));
  };

  const decreaseAmount = (productId) => {
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [productId]: prevAmounts[productId] > 1 ? prevAmounts[productId] - 1 : 1,
    }));
  };

  const handleInputChange = (event, productId) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setAmounts((prevAmounts) => ({
        ...prevAmounts,
        [productId]: value ? parseInt(value, 10) : 1,
      }));
    }
  };

  const handleImageClick = () => {
    if (images[currentImageIndex] === ques) {
      onImageClick("瑞威");
    } else if (images[currentImageIndex] === one) {
      onImageClick("玩具");
    }
  };

  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/detail/${product.id}`, {
      state: { product, amount: amounts[product.id] },
    });
  };

  return (
    <>
      {(!filter || Object.keys(filter).length === 0) && (
        <div className={styles.imgWall}>
          <img
            className={styles.img}
            src={images[currentImageIndex]}
            alt="img"
            onClick={handleImageClick}
          />
          <button
            className={`${styles.imgButton} ${styles.leftButton}`}
            onClick={prevImage}
          >{`<`}</button>
          <button
            className={`${styles.imgButton} ${styles.rightButton}`}
            onClick={nextImage}
          >{`>`}</button>
        </div>
      )}
      <div className={styles.productWall}>
        {products.map((product) => (
          <div
            key={product.id}
            className={styles.productItem}
            onClick={() => handleProductClick(product)}
          >
            <img
              className={styles.productImg}
              src={ques}
              alt={product.name}
              loading="lazy"
            />
            <span className={styles.productName}>{product.name}</span>
            <span className={styles.productPrice}>${product.price}</span>
            <div
              className={styles.cartBar}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.cartButton}
                onClick={(e) => {
                  e.stopPropagation();
                  decreaseAmount(product.id);
                }}
              >{`-`}</button>
              <input
                type="text"
                value={amounts[product.id]}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => handleInputChange(e, product.id)}
                className={styles.cartAmount}
              />
              <button
                className={styles.cartButton}
                onClick={(e) => {
                  e.stopPropagation();
                  increaseAmount(product.id);
                }}
              >{`+`}</button>
            </div>
            <button
              className={styles.addCart}
              onClick={(e) => {
                e.stopPropagation();
                addToCart({
                  id: product.id,
                  name: product.name,
                  image: product.image,
                  price: product.price,
                  amount: amounts[product.id],
                });
              }}
            >
              加入購物車
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

Index.propTypes = {
  filter: PropTypes.any.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
