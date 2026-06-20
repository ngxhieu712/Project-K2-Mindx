import { Link } from "react-router-dom";
import styles from "./Breadcrumb.module.css";

/**
 * @param {{ items: { label: string, href?: string }[] }} props
 * Last item (no href) is rendered as current page, not a link.
 */
export default function Breadcrumb({ items }) {
  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <ol className={styles.list}>
        <li>
          <Link to="/" className={styles.link}>Trang chủ</Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className={styles.item}>
            <span className={styles.sep}>/</span>
            {item.href ? (
              <Link to={item.href} className={styles.link}>{item.label}</Link>
            ) : (
              <span className={styles.current}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
