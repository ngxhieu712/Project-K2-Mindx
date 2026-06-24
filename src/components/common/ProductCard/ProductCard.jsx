// src/components/common/ProductCard/ProductCard.jsx — CẬP NHẬT
// ============================================================
// Thay đổi: badge giảm giá CHỈ hiển thị nếu có discount thật
// (product.discount hoặc product.originalPrice tồn tại).
// Với schema mới (chưa có flash sale thật), badge sẽ tự ẩn — KHÔNG hiển thị sai.
// ============================================================

import { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/format";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product, showBadge = false }) {
  const [wished, setWished] = useState(false);

  // ✅ Chỉ tính discount nếu có đủ data — không tự suy ra số giả
  const hasDiscount = Boolean(product.discount) || Boolean(product.originalPrice);
  const discountPct = product.discount
    ? product.discount
    : product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/san-pham/${product.slug}`} className={styles.card}>
      {showBadge && hasDiscount && discountPct > 0 && (
        <span className={styles.badge}>-{discountPct}%</span>
      )}

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

      <div className={styles.imageWrap}>
        {product.image ? (
          <img src={product.image} alt={product.name} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>📦</span>
          </div>
        )}
      </div>

      <div className={styles.info}>
        <p className={styles.name}>{product.name}</p>

        <div className={styles.prices}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className={styles.priceOld}>{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* ✅ Chỉ hiển thị sao nếu đã có người đánh giá thật (rating !== null) */}
        {product.rating !== null && product.rating !== undefined && (
          <div className={styles.meta}>
            <span className={styles.stars}>
              {"★".repeat(Math.round(product.rating))}
              {"☆".repeat(5 - Math.round(product.rating))}
            </span>
            <span className={styles.reviewCount}>({product.reviewCount})</span>
          </div>
        )}

        {product.soldCount !== undefined && (
          <p className={styles.sold}>Đã bán {product.soldCount}</p>
        )}
      </div>
    </Link>
  );
}