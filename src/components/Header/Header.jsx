import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (searchValue.trim()) {
      // TODO: navigate to search results page
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  }

  return (
    <header className={styles.header}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarInner}`}>
          <div className={styles.topLinks}>
            <span className={styles.topLink}>📍 Xem giá tại Hà Nội</span>
            <span className={styles.topLink}>🚚 Giao nhanh – Miễn phí cho đơn từ 300K</span>
            <span className={styles.topLink}>📞 Tư vấn miễn phí 1800.2097</span>
            <span className={styles.topLink}>🏪 Cửa hàng gần bạn</span>
            <span className={styles.topLink}>📋 Tra cứu đơn hàng</span>
          </div>
          <div className={styles.topActions}>
            <Link to="/dang-nhap" className={styles.topLink}>Đăng nhập / Đăng ký</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className={styles.mainHeader}>
        <div className={`container ${styles.mainHeaderInner}`}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <span className={styles.logoText}>HN<span className={styles.logoAccent}>store</span></span>
          </Link>

          {/* Hamburger + Category label (mobile) */}
          <button className={styles.menuBtn} aria-label="Menu">
            <span className={styles.menuIcon}>☰</span>
            <span className={styles.menuLabel}>Danh mục</span>
          </button>

          {/* Search */}
          <form className={styles.searchForm} onSubmit={handleSearch} role="search">
            <input
              className={styles.searchInput}
              type="search"
              placeholder="Bạn cần tìm gì?"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              aria-label="Tìm kiếm sản phẩm"
            />
            <button type="submit" className={styles.searchBtn} aria-label="Tìm kiếm">
              🔍
            </button>
          </form>

          {/* Right actions */}
          <div className={styles.headerActions}>
            <a href="tel:18002097" className={styles.actionItem}>
              <span className={styles.actionIcon}>📞</span>
              <span className={styles.actionLabel}>
                <small>Gọi mua hàng</small>
                <strong>1800.2097</strong>
              </span>
            </a>
            <Link to="/cua-hang" className={styles.actionItem}>
              <span className={styles.actionIcon}>📍</span>
              <span className={styles.actionLabel}>
                <small>Cửa hàng</small>
                <strong>Xem cửa hàng</strong>
              </span>
            </Link>
            <Link to="/gio-hang" className={styles.actionItem}>
              <span className={styles.cartIcon}>🛒</span>
              <span className={styles.cartBadge}>0</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
