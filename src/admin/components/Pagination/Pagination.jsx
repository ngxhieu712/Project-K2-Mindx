// src/admin/components/Pagination.jsx
//
// Phân trang đơn giản: trang trước/sau + hiển thị "X-Y trong Z kết quả".

import './Pagination.css';

export default function Pagination({ page, pageSize, total, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const startItem = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, total);

  return (
    <div className="adm-pagination">
      <span className="adm-pagination-info">
        {total === 0 ? 'Không có kết quả' : `${startItem}–${endItem} trong ${total}`}
      </span>
      <div className="adm-pagination-controls">
        <button
          type="button"
          className="adm-btn adm-btn-outline adm-btn-sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Trước
        </button>
        <span className="adm-pagination-page">
          {page} / {totalPages}
        </span>
        <button
          type="button"
          className="adm-btn adm-btn-outline adm-btn-sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Sau
        </button>
      </div>
    </div>
  );
}