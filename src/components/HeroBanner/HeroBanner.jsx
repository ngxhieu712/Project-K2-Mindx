import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { heroBanners } from "../../data/mockData";
import styles from "./HeroBanner.module.css";

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % heroBanners.length);
  }, []);

  const prev = () => {
    setCurrent((c) => (c - 1 + heroBanners.length) % heroBanners.length);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const banner = heroBanners[current];

  return (
    <div className={styles.bannerWrapper}>
      <div
        className={styles.banner}
        style={{ background: banner.bgColor }}
        aria-label={`Banner: ${banner.title}`}
      >
        {/* Text content */}
        <div className={styles.content}>
          <p className={styles.brand}>✦ HNstore</p>
          <h2 className={styles.title}>{banner.title}</h2>
          <p className={styles.subtitle}>{banner.subtitle}</p>
          <p className={styles.price}>{banner.description}</p>

          {/* Badges */}
          <div className={styles.badges}>
            <span className={styles.badge}>Trả góp 0%</span>
            <span className={styles.badge}>Thu cũ +2 triệu</span>
            <span className={styles.badge}>BH chính hãng</span>
          </div>

          <Link to={banner.ctaLink} className={styles.cta}>
            {banner.ctaText}
          </Link>
        </div>

        {/* Image placeholder */}
        <div className={styles.imageArea}>
          {banner.image ? (
            <img src={banner.image} alt={banner.title} className={styles.image} />
          ) : (
            <div className={styles.imagePlaceholder}>
              <span className={styles.placeholderIcon}>📱</span>
              {/* TODO: Replace with <img src={banner.image} alt={banner.title} /> */}
            </div>
          )}
        </div>

        {/* Prev/Next */}
        <button className={`${styles.navBtn} ${styles.navPrev}`} onClick={prev} aria-label="Ảnh trước">
          ‹
        </button>
        <button className={`${styles.navBtn} ${styles.navNext}`} onClick={next} aria-label="Ảnh tiếp">
          ›
        </button>
      </div>

      {/* Dots */}
      <div className={styles.dots}>
        {heroBanners.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Chuyển đến banner ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
