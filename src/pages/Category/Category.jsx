// src/pages/Category/Category.jsx — TOÀN BỘ FILE SAU KHI SỬA (Cách B: Context)
// ============================================================

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";
import ProductCard from "../../components/common/ProductCard/ProductCard";
import { getProductsByCategory } from "../../services/productService"; // ✅ sản phẩm: gọi API riêng
import { useCategories } from "../../context/CategoryContext";          // ✅ category: lấy từ Context
import styles from "./Category.module.css";

export default function Category() {
  const { slug } = useParams();

  // ✅ Categories đã được CategoryProvider fetch sẵn 1 lần ở App.jsx
  // Không cần gọi lại API ở đây — chỉ "đọc" từ Context
  const { categories, loading: categoriesLoading } = useCategories();
  const category = categories.find((c) => c.slug === slug);

  // Sản phẩm vẫn cần tự fetch riêng vì nó phụ thuộc :slug, đổi mỗi lần chuyển trang category
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setProductsLoading(true);
    setError(null);

    getProductsByCategory(slug)
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setProductsLoading(false));
  }, [slug]);

  // Gộp 2 loading state — trang chỉ hết loading khi CẢ category và products đã sẵn sàng
  const loading = categoriesLoading || productsLoading;

  return (
    <main className={styles.main}>
      <div className="container">
        <Breadcrumb items={[{ label: category ? category.name : slug }]} />

        <h1 className={styles.title}>{category ? category.name : "Danh mục"}</h1>

        {loading ? (
          <div className={styles.grid}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        ) : error ? (
          <p className={styles.empty}>Đã có lỗi xảy ra: {error}</p>
        ) : products.length === 0 ? (
          <p className={styles.empty}>Chưa có sản phẩm trong danh mục này.</p>
        ) : (
          <div className={styles.grid}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} showBadge />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}