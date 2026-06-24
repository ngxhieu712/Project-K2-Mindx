// src/admin/components/StatusBadge.jsx
//
// Hiển thị trạng thái (status) dưới dạng badge màu.
// Tự map các giá trị status có trong schema sang màu phù hợp.

import './StatusBadge.css';

const STATUS_MAP = {
  // Sản phẩm
  active: { label: 'Đang bán', tone: 'success' },
  pending: { label: 'Chờ duyệt', tone: 'warning' },
  locking: { label: 'Đã khóa', tone: 'danger' },

  // Đơn hàng
  confirmed: { label: 'Đã xác nhận', tone: 'info' },
  shipping: { label: 'Đang giao', tone: 'info' },
  delivered: { label: 'Đã giao', tone: 'success' },
  cancelled: { label: 'Đã hủy', tone: 'danger' },

  // Thanh toán
  paid: { label: 'Đã thanh toán', tone: 'success' },
  failed: { label: 'Thất bại', tone: 'danger' },
  refunded: { label: 'Đã hoàn tiền', tone: 'neutral' },

  // Vai trò
  admin: { label: 'Quản trị viên', tone: 'accent' },
  seller: { label: 'Người bán', tone: 'info' },
  buyer: { label: 'Khách hàng', tone: 'neutral' },
};

export default function StatusBadge({ status, label }) {
  const entry = STATUS_MAP[status] || { label: label || status, tone: 'neutral' };
  return <span className={`adm-badge adm-badge-${entry.tone}`}>{label || entry.label}</span>;
}