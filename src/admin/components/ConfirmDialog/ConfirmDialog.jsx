// src/admin/components/ConfirmDialog.jsx
//
// Hộp thoại xác nhận trước khi thực hiện hành động nhạy cảm (xóa, khóa, hoàn tiền...).
//
// Cách dùng:
//   const [confirmState, setConfirmState] = useState(null);
//   setConfirmState({ title: 'Xóa sản phẩm?', message: '...', onConfirm: async () => {...} });
//   ...
//   <ConfirmDialog state={confirmState} onClose={() => setConfirmState(null)} />

import { useState } from 'react';
import './ConfirmDialog.css';

export default function ConfirmDialog({ state, onClose }) {
  const [submitting, setSubmitting] = useState(false);

  if (!state) return null;

  const { title, message, confirmLabel = 'Xác nhận', tone = 'danger', onConfirm } = state;

  async function handleConfirm() {
    setSubmitting(true);
    try {
      await onConfirm();
      onClose();
    } catch (err) {
      // Để lỗi hiển thị ở nơi gọi (qua throw), nhưng tránh kẹt dialog ở trạng thái loading
      setSubmitting(false);
      throw err;
    }
  }

  return (
    <div className="adm-dialog-overlay" onClick={onClose}>
      <div className="adm-dialog" onClick={(e) => e.stopPropagation()}>
        <h3 className="adm-dialog-title">{title}</h3>
        {message && <p className="adm-dialog-message">{message}</p>}
        <div className="adm-dialog-actions">
          <button type="button" className="adm-btn adm-btn-ghost" onClick={onClose} disabled={submitting}>
            Hủy
          </button>
          <button
            type="button"
            className={`adm-btn ${tone === 'danger' ? 'adm-btn-danger' : 'adm-btn-primary'}`}
            onClick={handleConfirm}
            disabled={submitting}
          >
            {submitting ? 'Đang xử lý…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}