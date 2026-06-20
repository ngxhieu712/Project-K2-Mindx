import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";
import ProductCard from "../../components/common/ProductCard/ProductCard";
import { categories, getProductsByCategory } from "../../data/mockData";
import styles from "./Category.module.css";

export default function Category() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const category = categories.find((c) => c.slug === slug);

  useEffect(() => {
    setLoading(true);
    // TODO: Replace with: fetch(`/api/products?category=${slug}`)
    const timer = setTimeout(() => {
      setProducts(getProductsByCategory(slug));
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [slug]);

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
