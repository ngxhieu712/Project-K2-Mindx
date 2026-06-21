// src/services/productService.js — VIẾT LẠI CHO SUPABASE
// ============================================================
// Giả định bạn có bảng "products" trong PostgreSQL với các cột:
// id, name, slug, price, original_price, discount, rating,
// review_count, sold_count, image, category, is_flash_sale
// → Đổi tên cột trong code dưới đây khớp với schema thật của bạn
// ============================================================

import { supabase } from "./supabaseClient";

export async function getFlashSaleProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_flash_sale", true);

  if (error) throw new Error(error.message);
  return data;
}

export async function getProductsByCategory(slug) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", slug);

  if (error) throw new Error(error.message);
  return data;
}

export async function getProductBySlug(slug) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single(); // .single() vì chỉ mong 1 kết quả

  if (error) throw new Error(error.message);
  return data;
}