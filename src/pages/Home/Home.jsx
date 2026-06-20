import CategorySidebar from "../../components/CategorySidebar/CategorySidebar";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import CategoryPills from "../../components/CategoryPills/CategoryPills";
import PromoBanners from "../../components/PromoBanners/PromoBanners";
import FlashSale from "../../components/FlashSale/FlashSale";
import WhyUs from "../../components/WhyUs/WhyUs";
import TechNews from "../../components/TechNews/TechNews";
import Newsletter from "../../components/Newsletter/Newsletter";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="container">
        {/* Hero area: sidebar + banner */}
        <section className={styles.heroArea}>
          <CategorySidebar />
          <HeroBanner />
        </section>

        {/* Category pill shortcuts */}
        <section className={styles.section}>
          <CategoryPills />
        </section>

        {/* Promo banners */}
        <section className={styles.section}>
          <PromoBanners />
        </section>

        {/* Flash Sale */}
        <section className={styles.section}>
          <FlashSale />
        </section>

        {/* Why us */}
        <section className={styles.section}>
          <WhyUs />
        </section>

        {/* Tech News */}
        <section className={styles.section}>
          <TechNews />
        </section>

        {/* Newsletter */}
        <section className={styles.section}>
          <Newsletter />
        </section>
      </div>
    </main>
  );
}
