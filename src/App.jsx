import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Category from "./pages/Category/Category";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import "./index.css";

// TODO: Add more pages as you build them:
// import Search from "./pages/Search/Search";
// import Cart from "./pages/Cart/Cart";
// import Login from "./pages/Login/Login";
// import Checkout from "./pages/Checkout/Checkout";

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
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/danh-muc/:slug" element={<Category />} />
        <Route path="/san-pham/:slug" element={<ProductDetail />} />
        {/* TODO: Uncomment and add routes as pages are built */}
        {/* <Route path="/search" element={<Search />} /> */}
        {/* <Route path="/gio-hang" element={<Cart />} /> */}
        {/* <Route path="/dang-nhap" element={<Login />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
