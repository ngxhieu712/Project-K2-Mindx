// // src/services/apiClient.js
// // ============================================================
// // Lớp gọi API tập trung — mọi request đều đi qua đây
// // ============================================================

// const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

// /**
//  * Wrapper quanh fetch, tự thêm base URL, parse JSON, xử lý lỗi HTTP
//  */
// async function request(endpoint, options = {}) {
//   const res = await fetch(`${BASE_URL}${endpoint}`, {
//     headers: {
//       "Content-Type": "application/json",
//       ...options.headers,
//     },
//     ...options,
//   });

//   if (!res.ok) {
//     const errorBody = await res.json().catch(() => ({}));
//     throw new Error(errorBody.message || `HTTP ${res.status}`);
//   }

//   // Trường hợp DELETE không trả body
//   if (res.status === 204) return null;

//   return res.json();
// }

// export const api = {
//   get: (endpoint) => request(endpoint, { method: "GET" }),
//   post: (endpoint, body) => request(endpoint, { method: "POST", body: JSON.stringify(body) }),
//   put: (endpoint, body) => request(endpoint, { method: "PUT", body: JSON.stringify(body) }),
//   delete: (endpoint) => request(endpoint, { method: "DELETE" }),
// };