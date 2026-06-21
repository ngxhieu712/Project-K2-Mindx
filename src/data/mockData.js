// ============================================================
// MOCK DATA - HNstore
// TODO: Replace each section's data with your API/DB calls
// Suggested: axios.get('/api/...') or fetch('/api/...')
// ============================================================

// TODO: GET /api/categories
// export const categories = [
//   { id: 1, name: "Điện thoại", icon: "📱", slug: "dien-thoai" },
//   { id: 2, name: "iPad - Tablet", icon: "📟", slug: "ipad-tablet" },
//   { id: 3, name: "Laptop", icon: "💻", slug: "laptop" },
//   { id: 4, name: "Âm thanh", icon: "🎧", slug: "am-thanh" },
//   { id: 5, name: "Đồng hồ", icon: "⌚", slug: "dong-ho" },
//   { id: 6, name: "Nhà thông minh", icon: "🏠", slug: "nha-thong-minh" },
//   { id: 7, name: "Phụ kiện", icon: "🔌", slug: "phu-kien" },
//   { id: 8, name: "PC - Máy in", icon: "🖥️", slug: "pc-may-in" },
//   { id: 9, name: "Máy cũ giá tốt", icon: "♻️", slug: "may-cu" },
//   { id: 10, name: "Sim & Thẻ cào", icon: "📶", slug: "sim-the-cao" },
//   { id: 11, name: "Dịch vụ & bảo hành", icon: "🛠️", slug: "dich-vu" },
// ];

// TODO: GET /api/banners
export const heroBanners = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    subtitle: "Titan. Mạnh mẽ. Đỉnh cao.",
    description: "Từ 28.990.000đ",
    bgColor: "#1a1a2e",
    textColor: "#ffffff",
    image: null, // TODO: Replace with actual image URL
    ctaText: "Mua ngay",
    ctaLink: "/dien-thoai/iphone-15-pro",
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra",
    subtitle: "AI Phone. Viết tay thành văn bản.",
    description: "Từ 24.990.000đ",
    bgColor: "#0f2027",
    textColor: "#ffffff",
    image: null,
    ctaText: "Khám phá",
    ctaLink: "/dien-thoai/samsung-s24-ultra",
  },
  {
    id: 3,
    title: "MacBook Air M3",
    subtitle: "Mỏng nhẹ. Hiệu năng đỉnh.",
    description: "Từ 32.990.000đ",
    bgColor: "#1a1a1a",
    textColor: "#ffffff",
    image: null,
    ctaText: "Xem ngay",
    ctaLink: "/laptop/macbook-air-m3",
  },
];

// TODO: GET /api/category-shortcuts
export const categoryShortcuts = [
  { id: 1, name: "iPhone", icon: "📱", slug: "iphone", color: "#555" },
  { id: 2, name: "Samsung", icon: "📱", slug: "samsung", color: "#1428A0" },
  { id: 3, name: "Xiaomi", icon: "📱", slug: "xiaomi", color: "#FF6900" },
  { id: 4, name: "iPad", icon: "📟", slug: "ipad", color: "#555" },
  { id: 5, name: "Laptop", icon: "💻", slug: "laptop", color: "#555" },
  { id: 6, name: "AirPods", icon: "🎧", slug: "airpods", color: "#555" },
  { id: 7, name: "Apple Watch", icon: "⌚", slug: "apple-watch", color: "#555" },
  { id: 8, name: "Phụ kiện", icon: "🔌", slug: "phu-kien", color: "#555" },
  { id: 9, name: "Sạc dự phòng", icon: "🔋", slug: "sac-du-phong", color: "#555" },
  { id: 10, name: "Tai nghe", icon: "🎵", slug: "tai-nghe", color: "#555" },
  { id: 11, name: "Smartwatch", icon: "⌚", slug: "smartwatch", color: "#555" },
];

// TODO: GET /api/flash-sale/products
export const flashSaleProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    slug: "iphone-15-pro-max-256gb",
    price: 28990000,
    originalPrice: 34990000,
    discount: 20,
    rating: 4.5,
    reviewCount: 128,
    soldCount: 120,
    image: null, // TODO: Replace with actual product image URL
    badge: "-20%",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra 256GB",
    slug: "samsung-s24-ultra-256gb",
    price: 24990000,
    originalPrice: 29990000,
    discount: 15,
    rating: 4.5,
    reviewCount: 97,
    soldCount: 89,
    image: null,
    badge: "-15%",
  },
  {
    id: 3,
    name: "Xiaomi 14 256GB",
    slug: "xiaomi-14-256gb",
    price: 16990000,
    originalPrice: 19990000,
    discount: 15,
    rating: 4.5,
    reviewCount: 75,
    soldCount: 60,
    image: null,
    badge: "-15%",
  },
  {
    id: 4,
    name: "iPad Gen 10 64GB WiFi",
    slug: "ipad-gen-10-64gb-wifi",
    price: 9490000,
    originalPrice: 10990000,
    discount: 14,
    rating: 4.5,
    reviewCount: 58,
    soldCount: 45,
    image: null,
    badge: null,
  },
  {
    id: 5,
    name: "AirPods Pro 2 USB-C",
    slug: "airpods-pro-2-usbc",
    price: 5490000,
    originalPrice: 6490000,
    discount: 15,
    rating: 4.5,
    reviewCount: 101,
    soldCount: 77,
    image: null,
    badge: null,
  },
];

// TODO: GET /api/news?limit=4
export const techNews = [
  {
    id: 1,
    title: "Trên tay iPhone 15 Pro Max: Thiết kế Titan mới, nhẹ hơn, viền mỏng hơn",
    slug: "tren-tay-iphone-15-pro-max",
    image: null, // TODO: Replace with actual news image URL
    publishedAt: "2 giờ trước",
    category: "Đánh giá",
  },
  {
    id: 2,
    title: "Đánh giá Galaxy S24 Ultra: Nâng cấp toàn diện, xứng đáng flagship 2024",
    slug: "danh-gia-galaxy-s24-ultra",
    image: null,
    publishedAt: "5 giờ trước",
    category: "Đánh giá",
  },
  {
    id: 3,
    title: "So sánh iPhone 15 và iPhone 14: Có nên nâng cấp?",
    slug: "so-sanh-iphone-15-iphone-14",
    image: null,
    publishedAt: "1 ngày trước",
    category: "So sánh",
  },
  {
    id: 4,
    title: "Top 5 tai nghe chống ồn tốt nhất đầu 2024",
    slug: "top-5-tai-nghe-chong-on",
    image: null,
    publishedAt: "2 ngày trước",
    category: "Top list",
  },
];

// TODO: GET /api/promos
export const promos = [
  {
    id: 1,
    title: "Thu cũ lên đời",
    subtitle: "Trợ giá đến 2 TRIỆU",
    ctaText: "Xem ngay",
    ctaLink: "/khuyen-mai/thu-cu-len-doi",
    bgColor: "#c0392b",
    type: "trade-in",
  },
  {
    id: 2,
    title: "Trả góp 0%",
    subtitle: "Duyệt nhanh 3 phút",
    ctaText: "Xem ngay",
    ctaLink: "/tra-gop",
    bgColor: "#c0392b",
    type: "installment",
  },
  {
    id: 3,
    title: "Sắm phụ kiện",
    subtitle: "Giảm đến 50%",
    ctaText: "Xem ngay",
    ctaLink: "/khuyen-mai/phu-kien",
    bgColor: "#e74c3c",
    type: "accessory",
  },
  {
    id: 4,
    title: "Mua online",
    subtitle: "Giảm thêm đến 200K",
    ctaText: "Xem ngay",
    ctaLink: "/khuyen-mai/mua-online",
    bgColor: "#e74c3c",
    type: "online",
  },
];

// TODO: GET /api/flash-sale/timer - returns { endTime: ISO string }
export const flashSaleEndTime = new Date(Date.now() + 2 * 60 * 60 * 1000 + 38 * 60 * 1000 + 45 * 1000);

// TODO: GET /api/products?category=:slug&page=:page&limit=:limit
export const allProducts = [
  ...flashSaleProducts,
  {
    id: 6,
    name: "MacBook Air M3 13 inch 8GB/256GB",
    slug: "macbook-air-m3-13-8gb-256gb",
    price: 27990000,
    originalPrice: 29990000,
    discount: 7,
    rating: 5,
    reviewCount: 42,
    soldCount: 31,
    image: null,
    category: "laptop",
  },
  {
    id: 7,
    name: "Apple Watch Series 9 GPS 41mm",
    slug: "apple-watch-series-9-gps-41mm",
    price: 9990000,
    originalPrice: 10990000,
    discount: 9,
    rating: 4.5,
    reviewCount: 64,
    soldCount: 52,
    image: null,
    category: "dong-ho",
  },
  {
    id: 8,
    name: "Tai nghe Sony WH-1000XM5",
    slug: "tai-nghe-sony-wh-1000xm5",
    price: 7490000,
    originalPrice: 8990000,
    discount: 17,
    rating: 4.5,
    reviewCount: 88,
    soldCount: 67,
    image: null,
    category: "am-thanh",
  },
];

// TODO: GET /api/products/:slug
export function getProductBySlug(slug) {
  return allProducts.find((p) => p.slug === slug) || null;
}

// TODO: GET /api/products?category=:slug
export function getProductsByCategory(slug) {
  if (!slug) return allProducts;
  return allProducts.filter((p) => p.category === slug);
}

// Footer links - static content, no DB needed
export const footerLinks = {
  about: {
    title: "Về HNstore",
    links: [
      { label: "Giới thiệu về HNstore", href: "/gioi-thieu" },
      { label: "Tin tức", href: "/tin-tuc" },
      { label: "Tuyển dụng", href: "/tuyen-dung" },
      { label: "Gửi góp ý, khiếu nại", href: "/gop-y" },
      { label: "Hệ thống cửa hàng", href: "/cua-hang" },
      { label: "Liên hệ hợp tác", href: "/lien-he" },
    ],
  },
  policy: {
    title: "Chính sách",
    links: [
      { label: "Chính sách mua hàng", href: "/chinh-sach/mua-hang" },
      { label: "Chính sách giao hàng", href: "/chinh-sach/giao-hang" },
      { label: "Chính sách bảo hành", href: "/chinh-sach/bao-hanh" },
      { label: "Chính sách đổi trả", href: "/chinh-sach/doi-tra" },
      { label: "Chính sách trả góp", href: "/chinh-sach/tra-gop" },
      { label: "Chính sách bảo mật", href: "/chinh-sach/bao-mat" },
    ],
  },
  support: {
    title: "Hỗ trợ",
    links: [
      { label: "Trung tâm hỗ trợ", href: "/ho-tro" },
      { label: "Hướng dẫn mua hàng", href: "/ho-tro/mua-hang" },
      { label: "Hướng dẫn thanh toán", href: "/ho-tro/thanh-toan" },
      { label: "Tra cứu đơn hàng", href: "/tra-cuu-don-hang" },
      { label: "Kiểm tra bảo hành", href: "/kiem-tra-bao-hanh" },
      { label: "Câu hỏi thường gặp", href: "/faq" },
    ],
  },
};
