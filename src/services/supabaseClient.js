// src/services/supabaseClient.js
// ============================================================
// Khởi tạo Supabase client — DÙNG THAY CHO apiClient.js
// File apiClient.js (dùng fetch thường) không cần nữa nếu bạn
// dùng Supabase SDK, vì SDK đã tự xử lý request/response/auth.
// ============================================================

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Thiếu VITE_SUPABASE_URL hoặc VITE_SUPABASE_ANON_KEY trong file .env"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);