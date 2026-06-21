// src/services/contentService.js — VIẾT LẠI CHO SUPABASE
// ============================================================

import { supabase } from "./supabaseClient";

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id"); // giữ đúng thứ tự hiển thị

  if (error) throw new Error(error.message);
  return data;
}

export async function getHeroBanners() {
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .order("id");

  if (error) throw new Error(error.message);
  return data;
}

export async function getTechNews(limit = 4) {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data;
}

export async function subscribeNewsletter(email) {
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .insert([{ email }]);

  if (error) throw new Error(error.message);
  return data;
}