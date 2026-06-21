// src/hooks/useProducts.js
import { useState, useEffect } from "react";
import { getFlashSaleProducts } from "../services/productService";

export function useFlashSaleProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getFlashSaleProducts()
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true; // tránh setState sau khi component unmount
    };
  }, []);

  return { products, loading, error };
}