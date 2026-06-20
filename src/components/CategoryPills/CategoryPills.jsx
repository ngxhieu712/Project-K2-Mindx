import { Link } from "react-router-dom";
import { categoryShortcuts } from "../../data/mockData";
import styles from "./CategoryPills.module.css";

export default function CategoryPills() {
  return (
    <section className={styles.section}>
      <div className={styles.track}>
        {categoryShortcuts.map((cat) => (
          <Link key={cat.id} to={`/danh-muc/${cat.slug}`} className={styles.pill}>
            <span className={styles.icon}>{cat.icon}</span>
            <span className={styles.name}>{cat.name}</span>
          </Link>
        ))}
        <Link to="/danh-muc" className={`${styles.pill} ${styles.pillMore}`}>
          <span className={styles.icon}>···</span>
          <span className={styles.name}>Xem thêm</span>
        </Link>
      </div>
    </section>
  );
}
