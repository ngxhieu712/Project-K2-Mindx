// src/pages/Auth/Auth.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";

export default function Auth() {
  const [tab, setTab] = useState("login"); // "login" | "register"

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link to="/">
            <span className={styles.logoText}>
              HN<span className={styles.logoAccent}>store</span>
            </span>
          </Link>
        </div>

        {/* Tab switch */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === "login" ? styles.tabActive : ""}`}
            onClick={() => setTab("login")}
          >
            Đăng nhập
          </button>
          <button
            className={`${styles.tab} ${tab === "register" ? styles.tabActive : ""}`}
            onClick={() => setTab("register")}
          >
            Đăng ký
          </button>
        </div>

        {tab === "login" ? <LoginForm /> : <RegisterForm onSuccess={() => setTab("login")} />}
      </div>
    </main>
  );
}

/* ── Login Form ── */
function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e = {};
    if (!form.email.trim()) e.email = "Vui lòng nhập email";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email không hợp lệ";
    if (!form.password) e.password = "Vui lòng nhập mật khẩu";
    return e;
  }

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: "" }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) return setErrors(e2);
    setLoading(true);
    // TODO: gọi supabase.auth.signInWithPassword(...)
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1000);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="login-email">Email</label>
        <input
          id="login-email"
          name="email"
          type="email"
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          placeholder="example@email.com"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
        />
        {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="login-password">Mật khẩu</label>
        <input
          id="login-password"
          name="password"
          type="password"
          className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
          placeholder="Nhập mật khẩu"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        {errors.password && <span className={styles.errorMsg}>{errors.password}</span>}
      </div>

      <div className={styles.forgotLink}>Quên mật khẩu?</div>

      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>

      <div className={styles.divider}>hoặc</div>

      <div className={styles.socialBtns}>
        <button type="button" className={styles.socialBtn}>
          <span>G</span> Google
        </button>
        <button type="button" className={styles.socialBtn}>
          <span>f</span> Facebook
        </button>
      </div>
    </form>
  );
}

/* ── Register Form ── */
function RegisterForm({ onSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Vui lòng nhập họ tên";
    if (!form.email.trim()) e.email = "Vui lòng nhập email";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email không hợp lệ";
    if (!form.password) e.password = "Vui lòng nhập mật khẩu";
    else if (form.password.length < 6) e.password = "Mật khẩu tối thiểu 6 ký tự";
    if (form.confirm !== form.password) e.confirm = "Mật khẩu xác nhận không khớp";
    return e;
  }

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: "" }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) return setErrors(e2);
    setLoading(true);
    // TODO: gọi supabase.auth.signUp(...)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(onSuccess, 2000);
    }, 1000);
  }

  if (success) {
    return (
      <div className={styles.successMsg}>
        ✅ Đăng ký thành công! Đang chuyển sang trang đăng nhập...
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="reg-name">Họ và tên</label>
        <input
          id="reg-name"
          name="name"
          type="text"
          className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
          placeholder="Nguyễn Văn A"
          value={form.name}
          onChange={handleChange}
          autoComplete="name"
        />
        {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="reg-email">Email</label>
        <input
          id="reg-email"
          name="email"
          type="email"
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          placeholder="example@email.com"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
        />
        {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="reg-password">Mật khẩu</label>
        <input
          id="reg-password"
          name="password"
          type="password"
          className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
          placeholder="Tối thiểu 6 ký tự"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
        />
        {errors.password && <span className={styles.errorMsg}>{errors.password}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="reg-confirm">Xác nhận mật khẩu</label>
        <input
          id="reg-confirm"
          name="confirm"
          type="password"
          className={`${styles.input} ${errors.confirm ? styles.inputError : ""}`}
          placeholder="Nhập lại mật khẩu"
          value={form.confirm}
          onChange={handleChange}
          autoComplete="new-password"
        />
        {errors.confirm && <span className={styles.errorMsg}>{errors.confirm}</span>}
      </div>

      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? "Đang đăng ký..." : "Tạo tài khoản"}
      </button>
    </form>
  );
}
