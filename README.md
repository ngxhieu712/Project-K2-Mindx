# HNstore – E-commerce Frontend (React + Vite)

Giao diện thương mại điện tử tái hiện từ thiết kế tham khảo, đổi thương hiệu thành **HNstore**. Không sử dụng bất kỳ tài sản/thương hiệu của CellphoneS.

## 🚀 Tech Stack

- **React 19** + **Vite 6**
- **React Router v6** – điều hướng SPA
- **CSS Modules** – style scoped theo component, không xung đột class
- **Mock Data** – toàn bộ dữ liệu giả lập, có sẵn TODO để bạn nối API/DB thật

> Ant Design **không** được dùng trong bản này vì toàn bộ UI đã được build bằng CSS Modules thuần để khớp pixel-perfect với thiết kế gốc (Ant Design áp css riêng sẽ làm lệch layout/spacing). Nếu bạn vẫn muốn dùng AntD cho các trang sau (ví dụ trang quản trị/dashboard), chạy:
> ```bash
> npm install antd
> ```

## 📦 Cài đặt

```bash
npm install
npm run dev       # chạy dev server tại http://localhost:3000
npm run build     # build production vào /dist
npm run preview   # xem thử bản build
```

## 🗂️ Kiến trúc thư mục

Xem chi tiết ở cuối README — phần "Cây thư mục đầy đủ".

Nguyên tắc tổ chức:
- `components/` — mỗi component có folder riêng chứa `.jsx` + `.module.css` cùng tên
- `components/common/` — component dùng lại nhiều nơi (ProductCard, Breadcrumb...)
- `pages/` — mỗi route là 1 page, cũng theo cặp `.jsx` + `.module.css`
- `data/mockData.js` — **toàn bộ dữ liệu giả**, đánh dấu rõ bằng comment `// TODO:`
- `hooks/` — custom hooks (data fetching, v.v.)
- `utils/` — hàm thuần (format giá, format thời gian...)

## 🔌 Kết nối Database / API thật

Mọi nơi cần dữ liệu thật đều có comment `// TODO:` chỉ rõ endpoint gợi ý. Ví dụ trong `src/data/mockData.js`:

```js
// TODO: GET /api/categories
export const categories = [...]

// TODO: GET /api/flash-sale/products
export const flashSaleProducts = [...]

// TODO: GET /api/products/:slug
export function getProductBySlug(slug) {...}
```

**Cách thay thế gợi ý** (ví dụ với `useProducts.js`):

```js
// Trước (mock):
useEffect(() => {
  setTimeout(() => setProducts(flashSaleProducts), 300);
}, []);

// Sau (API thật):
useEffect(() => {
  fetch('/api/flash-sale/products')
    .then(res => res.json())
    .then(setProducts)
    .catch(setError)
    .finally(() => setLoading(false));
}, []);
```

Toàn bộ component đã được viết theo dạng nhận `props`/đọc từ `hooks`, nên bạn chỉ cần đổi nguồn dữ liệu ở `data/` hoặc `hooks/`, **không cần sửa UI**.

## 📱 Responsive

Mobile-first, breakpoints chính: `480px`, `600px`, `768px`, `992px`, `1100px`. Sidebar danh mục tự ẩn dưới `992px`, các grid sản phẩm/tin tức tự rút cột khi màn hình nhỏ.

## ✅ Đã hoàn thành

- [x] Header (sticky, search, hotline, cart badge)
- [x] Category Sidebar
- [x] Hero Banner (carousel auto-play 4s + dots + prev/next)
- [x] Category Pills (shortcut icon)
- [x] Promo Banners (4 ô khuyến mãi)
- [x] Flash Sale (đếm ngược thời gian thực + skeleton loading)
- [x] Why Us (5 lý do chọn HNstore)
- [x] Tech News (4 bài viết)
- [x] Newsletter + Social links
- [x] Footer (4 cột + payment badges)
- [x] Trang danh mục `/danh-muc/:slug`
- [x] Trang chi tiết sản phẩm `/san-pham/:slug`
- [x] Trang 404

## 🔜 Gợi ý mở rộng tiếp theo

- [ ] Trang giỏ hàng `/gio-hang` + Context/Zustand quản lý state cart
- [ ] Trang tìm kiếm `/search?q=`
- [ ] Trang đăng nhập/đăng ký
- [ ] Trang tin tức chi tiết `/tin-tuc/:slug`
- [ ] Pagination cho trang danh mục
- [ ] Filter/sort sản phẩm (giá, mới nhất, bán chạy)
