import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";
import { getProductBySlug } from "../../data/mockData";
import { formatPrice } from "../../utils/format";
import styles from "./ProductDetail.module.css";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setLoading(true);
    // TODO: Replace with: fetch(`/api/products/${slug}`)
    const timer = setTimeout(() => {
      setProduct(getProductBySlug(slug));
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [slug]);

  if (loading) {
    return (
      <main className={styles.main}>
        <div className="container">
          <div className={styles.skeleton} />
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className={styles.main}>
        <div className="container">
          <p className={styles.notFound}>Không tìm thấy sản phẩm.</p>
          <Link to="/" className={styles.backLink}>← Về trang chủ</Link>
        </div>
      </main>
    );
  }

  function handleAddToCart() {
    // TODO: POST /api/cart { productId: product.id, quantity: qty }
    alert(`Đã thêm ${qty} "${product.name}" vào giỏ hàng (demo)`);
  }

  return (
    <main className={styles.main}>
      <div className="container">
        <Breadcrumb items={[{ label: product.name }]} />

        <div className={styles.layout}>
          {/* Image */}
          <div className={styles.imageSection}>
            <div className={styles.imageWrap}>
              {product.image ? (
                <img src={product.image} alt={product.name} className={styles.image} />
              ) : (
                <div className={styles.imagePlaceholder}>
                  {/* TODO: Replace with <img src={product.image} /> + gallery thumbnails */}
                  <span>📦</span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className={styles.infoSection}>
            <h1 className={styles.name}>{product.name}</h1>

            <div className={styles.meta}>
              <span className={styles.stars}>
                {"★".repeat(Math.floor(product.rating || 0))}
                {"☆".repeat(5 - Math.floor(product.rating || 0))}
              </span>
              <span className={styles.reviewCount}>({product.reviewCount} đánh giá)</span>
              <span className={styles.sold}>Đã bán {product.soldCount}</span>
            </div>

            <div className={styles.priceBox}>
              <span className={styles.price}>{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className={styles.priceOld}>{formatPrice(product.originalPrice)}</span>
                  <span className={styles.discountBadge}>-{product.discount}%</span>
                </>
              )}
            </div>

            <ul className={styles.benefits}>
              <li>✅ Hàng chính hãng, đầy đủ VAT</li>
              <li>🚚 Giao nhanh – Miễn phí từ 300K</li>
              <li>💳 Trả góp 0% qua thẻ tín dụng</li>
              <li>🔄 Đổi trả trong 7 ngày nếu lỗi</li>
            </ul>

            {/* Quantity + CTA */}
            <div className={styles.actions}>
              <div className={styles.qtyBox}>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className={styles.qtyBtn}>−</button>
                <span className={styles.qtyValue}>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className={styles.qtyBtn}>+</button>
              </div>
              <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                🛒 Thêm vào giỏ
              </button>
              <button className={styles.buyNowBtn}>Mua ngay</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
