// src/pages/Category/Category.jsx
import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";
import ProductCard from "../../components/common/ProductCard/ProductCard";
import { getProductsByCategory } from "../../services/productService";
import { useCategories } from "../../context/CategoryContext";
import styles from "./Category.module.css";

const SORT_OPTIONS = [
  { value: "default", label: "Mặc định" },
  { value: "price_asc", label: "Giá thấp → cao" },
  { value: "price_desc", label: "Giá cao → thấp" },
  { value: "newest", label: "Mới nhất" },
  { value: "best_seller", label: "Bán chạy" },
];

const PAGE_SIZE = 10;

export default function Category() {
  const { slug } = useParams();

  const { categories, loading: categoriesLoading } = useCategories();
  const category = categories.find((c) => c.slug === slug);

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setProductsLoading(true);
    setError(null);
    setPage(1);

    getProductsByCategory(slug)
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setProductsLoading(false));
  }, [slug]);

  // Sort phía client
  const sorted = useMemo(() => {
    const result = [...products];
    switch (sort) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case "best_seller":
        result.sort((a, b) => (b.sold_count || 0) - (a.sold_count || 0));
        break;
      default:
        break;
    }
    return result;
  }, [products, sort]);

  // Pagination
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const loading = categoriesLoading || productsLoading;

  return (
    <main className={styles.main}>
      <div className="container">
        <Breadcrumb items={[{ label: category ? category.name : slug }]} />

        <h1 className={styles.title}>{category ? category.name : "Danh mục"}</h1>

        {/* Filter & Sort bar */}
        {!loading && products.length > 0 && (
          <div className={styles.filterBar}>
            <span className={styles.filterLabel}>Sắp xếp:</span>
            <div className={styles.sortBtns}>
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={`${styles.sortBtn} ${sort === opt.value ? styles.sortBtnActive : ""}`}
                  onClick={() => { setSort(opt.value); setPage(1); }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Product grid */}
        {loading ? (
          <div className={styles.grid}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        ) : error ? (
          <p className={styles.empty}>Đã có lỗi xảy ra: {error}</p>
        ) : paginated.length === 0 ? (
          <p className={styles.empty}>Chưa có sản phẩm trong danh mục này.</p>
        ) : (
          <div className={styles.grid}>
            {paginated.map((p) => (
              <ProductCard key={p.id} product={p} showBadge />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={`${styles.pageBtn} ${page === 1 ? styles.pageBtnDisabled : ""}`}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              ‹
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`${styles.pageBtn} ${page === i + 1 ? styles.pageBtnActive : ""}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className={`${styles.pageBtn} ${page === totalPages ? styles.pageBtnDisabled : ""}`}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
