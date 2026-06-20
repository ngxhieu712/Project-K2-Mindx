import { Link } from "react-router-dom";
import { footerLinks } from "../../data/mockData";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* About */}
        <FooterColumn data={footerLinks.about} />
        {/* Policy */}
        <FooterColumn data={footerLinks.policy} />
        {/* Support */}
        <FooterColumn data={footerLinks.support} />

        {/* App download */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Tải ứng dụng HNstore</h4>
          <p className={styles.colDesc}>
            Tải ngay ứng dụng để nhận nhiều ưu đãi hấp dẫn
          </p>
          <div className={styles.appBtns}>
            <a
              href="#"
              className={styles.appBtn}
              aria-label="Tải trên App Store"
            >
              <span className={styles.appIcon}>🍎</span>
              <span className={styles.appLabel}>
                <small>Download on the</small>
                <strong>App Store</strong>
              </span>
            </a>
            <a
              href="#"
              className={styles.appBtn}
              aria-label="Tải trên Google Play"
            >
              <span className={styles.appIcon}>▶</span>
              <span className={styles.appLabel}>
                <small>GET IT ON</small>
                <strong>Google Play</strong>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomInner}`}>
          <p className={styles.copyright}>
            © {year} • Bản quyền thuộc về HNstore
          </p>
          <p className={styles.legal}>
            Giấy chứng nhận ĐKKD số 0123456789 do Sở KHĐT TP. Hà Nội cấp
          </p>
          <div className={styles.payments}>
            {["VISA", "MC", "JCB", "ATM", "VNPAY"].map((p) => (
              <span key={p} className={styles.paymentBadge}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ data }) {
  return (
    <div className={styles.col}>
      <h4 className={styles.colTitle}>{data.title}</h4>
      <ul className={styles.colList}>
        {data.links.map((link) => (
          <li key={link.href}>
            <Link to={link.href} className={styles.colLink}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
