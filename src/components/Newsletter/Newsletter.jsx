import { useState } from "react";
import styles from "./Newsletter.module.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: POST /api/newsletter/subscribe { email }
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Newsletter */}
        <div className={styles.newsletter}>
          <h3 className={styles.title}>Đăng ký nhận tin</h3>
          <p className={styles.desc}>
            Nhận thông tin khuyến mãi và sản phẩm mới nhất từ HNstore
          </p>
          {submitted ? (
            <p className={styles.success}>✅ Cảm ơn bạn đã đăng ký!</p>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="email"
                className={styles.input}
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email đăng ký nhận tin"
              />
              <button type="submit" className={styles.btn}>
                Đăng ký
              </button>
            </form>
          )}
        </div>

        {/* Social */}
        <div className={styles.social}>
          <h3 className={styles.title}>Kết nối với chúng tôi</h3>
          <div className={styles.socialLinks}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={`${styles.socialBtn} ${styles.facebook}`} aria-label="Facebook">
              <span>f</span>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={`${styles.socialBtn} ${styles.youtube}`} aria-label="YouTube">
              <span>▶</span>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className={`${styles.socialBtn} ${styles.tiktok}`} aria-label="TikTok">
              <span>♪</span>
            </a>
            <a href="https://zalo.me" target="_blank" rel="noopener noreferrer" className={`${styles.socialBtn} ${styles.zalo}`} aria-label="Zalo">
              <span>Z</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
