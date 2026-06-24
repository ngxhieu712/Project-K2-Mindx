import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useCategories } from "../../context/CategoryContext";
import { supabase } from "../../services/supabaseClient";
import styles from "./Header.module.css";

export default function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { categories } = useCategories();
  const menuRef = useRef(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      setUser(data.user);

      if (data.user) {
        const { data: userProfile } = await supabase
          .from("users")
          .select("name,email")
          .eq("id", data.user.id)
          .maybeSingle();

        if (mounted) setProfile(userProfile);
      } else {
        setProfile(null);
      }
    }

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) setProfile(null);
      if (session?.user) loadUser();
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (searchValue.trim()) {
      // TODO: navigate to search results page
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    navigate("/");
  }

  const accountName = profile?.name || user?.email;

  return (
    <header className={styles.header}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarInner}`}>
          <div className={styles.topLinks}>
            <span className={styles.topLink}>📍 Xem giá tại Hà Nội</span>
            <Link to="/giao-hang" className={styles.topLink}>🚚 Giao nhanh – Miễn phí cho đơn từ 300K</Link>
            <a href="tel:18002097" className={styles.topLink}>📞 Tư vấn miễn phí 1800.2097</a>
            <Link to="/cua-hang" className={styles.topLink}>🏪 Cửa hàng gần bạn</Link>
            <Link to="/tra-cuu-don-hang" className={styles.topLink}>📋 Tra cứu đơn hàng</Link>
          </div>
          <div className={styles.topActions}>
            {user ? (
              <button type="button" className={styles.topButton} onClick={handleLogout}>
                {accountName} / Đăng xuất
              </button>
            ) : (
              <Link to="/dang-nhap" className={styles.topLink}>Đăng nhập / Đăng ký</Link>
            )}
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
          <div className={styles.menuWrap} ref={menuRef}>
            <button
              className={styles.menuBtn}
              aria-label="Menu danh mục"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className={styles.menuIcon}>{menuOpen ? "✕" : "☰"}</span>
              <span className={styles.menuLabel}>Danh mục</span>
            </button>

            {/* Dropdown */}
            {menuOpen && (
              <div className={styles.categoryDropdown}>
                {categories.length === 0 ? (
                  <p className={styles.dropdownEmpty}>Đang tải danh mục...</p>
                ) : (
                  <ul className={styles.dropdownList}>
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <Link
                          to={`/danh-muc/${cat.slug}`}
                          className={styles.dropdownItem}
                          onClick={() => setMenuOpen(false)}
                        >
                          <span className={styles.dropdownIcon}>{cat.icon || "📦"}</span>
                          <span>{cat.name}</span>
                          <span className={styles.dropdownArrow}>›</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

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
              {totalItems > 0 && (
                <span className={styles.cartBadge}>{totalItems > 99 ? "99+" : totalItems}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
