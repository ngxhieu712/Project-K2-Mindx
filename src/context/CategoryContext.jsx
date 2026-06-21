// src/context/CategoryContext.jsx
// ============================================================
// Context quản lý danh sách categories — gọi API 1 lần duy nhất
// khi app khởi động, mọi component con dùng lại qua useCategories()
// ============================================================

import { createContext, useContext, useState, useEffect } from "react";
import { getCategories } from "../services/contentService";

const CategoryContext = createContext(undefined);

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getCategories()
      .then((data) => {
        if (!cancelled) setCategories(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []); // chỉ chạy 1 lần khi Provider mount (tức là khi app khởi động)

  return (
    <CategoryContext.Provider value={{ categories, loading, error }}>
      {children}
    </CategoryContext.Provider>
  );
}

/**
 * Hook để mọi component con đọc categories đã fetch sẵn
 * Throw lỗi rõ ràng nếu dùng ngoài Provider — dễ debug khi quên bọc <CategoryProvider>
 */
export function useCategories() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCategories phải được dùng bên trong <CategoryProvider>");
  }
  return context;
}