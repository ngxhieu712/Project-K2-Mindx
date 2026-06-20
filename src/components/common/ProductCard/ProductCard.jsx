import { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/format";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product, showBadge = false }) {
  const [wished, setWished] = useState(false);

  const discountPct = product.discount
    ? product.discount
    : product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/san-pham/${product.slug}`} className={styles.card}>
      {/* Discount badge */}
      {showBadge && discountPct > 0 && (
        <span className={styles.badge}>-{discountPct}%</span>
      )}

      {/* Wishlist */}
      <button
        className={`${styles.wish} ${wished ? styles.wished : ""}`}
        aria-label="Yêu thích"
        onClick={(e) => {
          e.preventDefault();
          setWished((w) => !w);
        }}
      >
        {wished ? "❤️" : "🤍"}
      </button>

      {/* Image */}
      <div className={styles.imageWrap}>
        {product.image ? (
          <img src={product.image} alt={product.name} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder}>
            {/* TODO: Replace with <img src={product.image} /> */}
            <span>📦</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className={styles.info}>
        <p className={styles.name}>{product.name}</p>

        <div className={styles.prices}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className={styles.priceOld}>{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* Stars */}
        {product.rating && (
          <div className={styles.meta}>
            <span className={styles.stars}>
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </span>
            <span className={styles.reviewCount}>({product.reviewCount})</span>
          </div>
        )}

        {/* Sold count */}
        {product.soldCount !== undefined && (
          <p className={styles.sold}>Đã bán {product.soldCount}</p>
        )}
      </div>
    </Link>
  );
}
