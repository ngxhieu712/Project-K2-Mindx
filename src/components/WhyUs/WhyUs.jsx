import styles from "./WhyUs.module.css";

const features = [
  {
    icon: "🛡️",
    title: "Hàng chính hãng",
    desc: "Cam kết 100% chính hãng",
  },
  {
    icon: "💰",
    title: "Giá tốt mỗi ngày",
    desc: "Luôn cạnh tranh nhất",
  },
  {
    icon: "🚚",
    title: "Giao hàng nhanh",
    desc: "Giao nhanh – Miễn phí từ 300K",
  },
  {
    icon: "💳",
    title: "Trả góp 0%",
    desc: "Duyệt nhanh 3 phút",
  },
  {
    icon: "✅",
    title: "Bảo hành chính hãng",
    desc: "Tại trung tâm bảo hành ủy quyền",
  },
];

export default function WhyUs() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Vì sao chọn HNstore?</h2>
      <div className={styles.grid}>
        {features.map((f, i) => (
          <div key={i} className={styles.feature}>
            <span className={styles.icon}>{f.icon}</span>
            <div className={styles.text}>
              <p className={styles.featureTitle}>{f.title}</p>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
