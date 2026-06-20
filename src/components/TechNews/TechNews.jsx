import { Link } from "react-router-dom";
import { techNews } from "../../data/mockData";
import styles from "./TechNews.module.css";

export default function TechNews() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Tin công nghệ</h2>
        <Link to="/tin-tuc" className={styles.viewAll}>
          Xem tất cả ›
        </Link>
      </div>

      <div className={styles.grid}>
        {techNews.map((article) => (
          <Link key={article.id} to={`/tin-tuc/${article.slug}`} className={styles.card}>
            {/* Image */}
            <div className={styles.imageWrap}>
              {article.image ? (
                <img src={article.image} alt={article.title} className={styles.image} />
              ) : (
                <div className={styles.imagePlaceholder}>
                  {/* TODO: Replace with <img src={article.image} /> */}
                  <span>📰</span>
                </div>
              )}
              <span className={styles.category}>{article.category}</span>
            </div>

            {/* Text */}
            <div className={styles.content}>
              <p className={styles.articleTitle}>{article.title}</p>
              <p className={styles.time}>{article.publishedAt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
