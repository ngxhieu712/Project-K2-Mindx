import { Link } from "react-router-dom";
import { categories } from "../../data/mockData";
import styles from "./CategorySidebar.module.css";

export default function CategorySidebar() {
  return (
    <nav className={styles.sidebar} aria-label="Danh mục sản phẩm">
      <ul className={styles.list}>
        {categories.map((cat) => (
          <li key={cat.id} className={styles.item}>
            <Link to={`/danh-muc/${cat.slug}`} className={styles.link}>
              <span className={styles.icon}>{cat.icon}</span>
              <span className={styles.name}>{cat.name}</span>
              <span className={styles.arrow}>›</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
