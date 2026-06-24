// src/admin/components/StatCard.jsx
//
// Thẻ thống kê đơn giản cho Dashboard: nhãn + giá trị lớn + ghi chú phụ (tùy chọn).

import './StatCard.css';

export default function StatCard({ label, value, icon, tone = 'accent', hint }) {
  return (
    <div className="adm-card adm-stat-card">
      <div className={`adm-stat-icon adm-stat-icon-${tone}`}>{icon}</div>
      <div className="adm-stat-body">
        <span className="adm-stat-label">{label}</span>
        <strong className="adm-stat-value">{value}</strong>
        {hint && <span className="adm-stat-hint">{hint}</span>}
      </div>
    </div>
  );
}