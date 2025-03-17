import React from "react";
import styles from "./product.module.css";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { MdAddShoppingCart } from "react-icons/md";
import { useCartContext } from "../../context/CartContext";

const Dessert = ({ product }) => {
  const {
    addItemToCart,
    isProductInCart,
    getCartItem,
    incrementQuantity,
    decrementQuantity,
    removeItemFromCart,
  } = useCartContext();

  const cartItem = getCartItem(product.name);
  const quantity = cartItem ? cartItem.quantity : 0; // Mahsulot miqdorini olish

  const handleDecrement = () => {
    if (quantity === 1) {
      removeItemFromCart(product.name); // 1 bo‘lsa, mahsulotni umuman o‘chiradi
    } else {
      decrementQuantity(product.name);
    }
  };

  return (
    <div className={styles.productItemContainer}>
      <div className={styles.imageContainer}>
        <picture>
          <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
          <source media="(min-width: 768px)" srcSet={product.image.tablet} />
          <source media="(max-width: 767px)" srcSet={product.image.mobile} />
          <img
            src={product.image.thumbnail}
            alt={product.name}
            loading="lazy"
            className={styles.productImage}
          />
        </picture>
      </div>

      <div className={styles.productDetails}>
        {quantity > 0 ? (
          <div className={styles.cartItemButtonContainer}>
            <button className={styles.circle} onClick={handleDecrement}>
              <AiOutlineMinus size={12} className={styles.icon} />
            </button>
            <p className={styles.quantity}>{quantity}</p>
            <button
              className={styles.circle}
              onClick={() => incrementQuantity(product.name)}
            >
              <AiOutlinePlus size={12} className={styles.icon} />
            </button>
          </div>
        ) : (
          <button
            className={styles.addCartButton}
            onClick={() => addItemToCart(product)}
          >
            <MdAddShoppingCart size={20} />
            <span>Add to Cart</span>
          </button>
        )}
        <p className={styles.productCategory}>{product.category}</p>
        <p className={styles.productName}>{product.name}</p>
        <p className={styles.productPrice}>${product.price}</p>
      </div>
    </div>
  );
};

export default Dessert;
