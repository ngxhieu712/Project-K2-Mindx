// src/services/productService.js — BẢN DUY NHẤT, ĐÚNG NHẤT
// ============================================================
// Khớp với schema hiện tại: products KHÔNG có cột is_flash_sale,
// discount, rating, sold_count. Giá lấy từ product_variants,
// ảnh từ product_images, rating tính từ reviews.
// ============================================================

import { supabase } from "./supabaseClient";

// Sản phẩm theo danh mục — dùng cho trang /danh-muc/:slug
export async function getProductsByCategory(slug) {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id, name, slug, base_price, status,
      categories!inner ( slug ),
      product_images ( image_url, display_order ),
      product_variants ( price, stock ),
      reviews ( rating )
    `)
    .eq("categories.slug", slug)
    .eq("status", "active");

  if (error) throw new Error(error.message);
  return data.map(normalizeProduct);
}

// Chi tiết 1 sản phẩm — dùng cho trang /san-pham/:slug
export async function getProductBySlug(slug) {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id, name, slug, description, base_price, status,
      brands ( name, slug ),
      categories ( name, slug ),
      product_images ( image_url, display_order ),
      product_variants ( id, color, size, storage, price, stock, sku ),
      reviews ( id, rating, comment, created_at, users ( name ) )
    `)
    .eq("slug", slug)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// Sản phẩm mới nhất — dùng cho trang chủ (Category sidebar không cần hàm này)
export async function getLatestProducts(limit = 5) {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id, name, slug, base_price, status,
      product_images ( image_url, display_order ),
      product_variants ( price, stock ),
      reviews ( rating )
    `)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data.map(normalizeProduct);
}

// ⚠️ Flash Sale: giữ UI cho mục đích trang trí (theo yêu cầu của bạn),
// nhưng KHÔNG có giảm giá thật — chỉ hiển thị lại sản phẩm mới nhất.
// TODO: khi sẵn sàng làm thật, tạo bảng "flash_sales" riêng
// (product_id, discount_percent, start_at, end_at) rồi sửa hàm này.
export async function getFlashSaleProducts() {
  return getLatestProducts(5);
}

/**
 * Chuyển response Supabase (nested) thành shape ProductCard.jsx cần:
 * { id, name, slug, price, image, rating, reviewCount }
 */
function normalizeProduct(p) {
  const sortedImages = [...(p.product_images || [])].sort(
    (a, b) => a.display_order - b.display_order
  );
  const prices = (p.product_variants || []).map((v) => v.price);
  const minPrice = prices.length ? Math.min(...prices) : p.base_price;

  const ratings = (p.reviews || []).map((r) => r.rating);
  const avgRating = ratings.length
    ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
    : null;

  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: minPrice,
    image: sortedImages[0]?.image_url || null,
    rating: avgRating,
    reviewCount: ratings.length,
    // soldCount: cần đếm từ order_items — chưa có hàm, hiển thị ẩn nếu undefined
  };
}