// src/App.jsx — PHẦN CẦN SỬA
// ============================================================

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Category from "./pages/Category/Category";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import { CategoryProvider } from "./context/CategoryContext"; // ✅ thêm import
import "./index.css";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <h2 style={{ fontSize: 28, marginBottom: 12 }}>404 – Không tìm thấy trang</h2>
      <a href="/" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
        ← Về trang chủ
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* ✅ Bọc CategoryProvider ở đây — mọi route con (Header, Sidebar, Category page) 
          đều dùng chung 1 lần fetch categories, không gọi API lại mỗi lần chuyển trang */}
      <CategoryProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/danh-muc/:slug" element={<Category />} />
          <Route path="/san-pham/:slug" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </CategoryProvider>
    </BrowserRouter>
  );
}