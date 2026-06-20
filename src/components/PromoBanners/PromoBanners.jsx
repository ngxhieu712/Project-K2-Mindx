import { Link } from "react-router-dom";
import { promos } from "../../data/mockData";
import styles from "./PromoBanners.module.css";

export default function PromoBanners() {
  const [main1, main2, small1, small2] = promos;

  return (
    <section className={styles.grid}>
      {/* Large promo 1 */}
      <PromoCard promo={main1} large />
      {/* Large promo 2 */}
      <PromoCard promo={main2} large />
      {/* Small stack */}
      <div className={styles.stack}>
        <PromoCard promo={small1} small />
        <PromoCard promo={small2} small />
      </div>
    </section>
  );
}

function PromoCard({ promo, large, small }) {
  return (
    <Link
      to={promo.ctaLink}
      className={`${styles.card} ${large ? styles.cardLarge : ""} ${small ? styles.cardSmall : ""}`}
      style={{ background: promo.bgColor }}
    >
      <div className={styles.cardContent}>
        <p className={styles.cardTitle}>{promo.title}</p>
        <p className={styles.cardSubtitle}>{promo.subtitle}</p>
        <span className={styles.cardCta}>{promo.ctaText}</span>
      </div>
      {/* TODO: Add promo image here */}
      <div className={styles.cardImageArea}>
        <span className={styles.cardEmoji}>
          {promo.type === "trade-in" && "📲"}
          {promo.type === "installment" && "💳"}
          {promo.type === "accessory" && "🎁"}
          {promo.type === "online" && "💰"}
        </span>
      </div>
    </Link>
  );
}
