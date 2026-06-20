// ============================================================
// useProducts hook
// TODO: Replace mock imports with actual API calls
// Example: const res = await fetch('/api/flash-sale/products')
// ============================================================
import { useState, useEffect } from "react";
import { flashSaleProducts } from "../data/mockData";

export function useFlashSaleProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: Replace with: const res = await fetch('/api/flash-sale/products')
    const timer = setTimeout(() => {
      setProducts(flashSaleProducts);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return { products, loading, error };
}
