// src/admin/pages/Dashboard.jsx
//
// Trang Dashboard tổng quan: thống kê người dùng, kinh doanh, biểu đồ doanh thu
// và phân bố trạng thái đơn hàng.

import { useEffect, useState } from 'react';
import StatCard from '../../components/StatCard/StatCard';
import RevenueBarChart from '../../components/RevenueBarChart/RevenueBarChart';
import { fetchDashboardStats, fetchRevenueByDay, fetchOrderStatusBreakdown } from '../../lib/adminApi';
import './DashBoard.css';

const ORDER_STATUS_LABELS = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy',
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [statusBreakdown, setStatusBreakdown] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [statsData, revenueData, breakdownData] = await Promise.all([
          fetchDashboardStats(),
          fetchRevenueByDay(14),
          fetchOrderStatusBreakdown(),
        ]);
        if (!active) return;
        setStats(statsData);
        setRevenue(revenueData);
        setStatusBreakdown(breakdownData);
      } catch (err) {
        if (active) setError(err.message || 'Không tải được dữ liệu dashboard.');
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const totalOrdersForBreakdown = statusBreakdown
    ? Object.values(statusBreakdown).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <div>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Tổng quan</h1>
          <p className="adm-page-subtitle">Tình trạng hoạt động của sàn theo thời gian thực.</p>
        </div>
      </div>

      {error && <div className="adm-alert adm-alert-danger">{error}</div>}

      <div className="adm-stat-grid">
        <StatCard
          label="Tổng khách hàng"
          value={stats ? stats.totalBuyers.toLocaleString('vi-VN') : '—'}
          tone="accent"
          icon={<IconUser />}
          hint={stats ? `+${stats.newUsersToday} mới hôm nay` : ''}
        />
        <StatCard
          label="Tổng người bán"
          value={stats ? stats.totalSellers.toLocaleString('vi-VN') : '—'}
          tone="info"
          icon={<IconStore />}
        />
        <StatCard
          label="Tổng sản phẩm"
          value={stats ? stats.totalProducts.toLocaleString('vi-VN') : '—'}
          tone="success"
          icon={<IconBox />}
          hint={stats ? `${stats.pendingProducts} chờ duyệt` : ''}
        />
        <StatCard
          label="Tổng đơn hàng"
          value={stats ? stats.totalOrders.toLocaleString('vi-VN') : '—'}
          tone="warning"
          icon={<IconReceipt />}
        />
      </div>

      <div className="adm-card adm-revenue-card">
        <div className="adm-revenue-card-header">
          <div>
            <h3>Doanh thu 14 ngày gần nhất</h3>
            <p>Tính trên các thanh toán đã hoàn tất.</p>
          </div>
          <div className="adm-revenue-total">
            <span>Tổng doanh thu</span>
            <strong>{stats ? formatVnd(stats.totalRevenue) : '—'}</strong>
          </div>
        </div>
        {revenue ? <RevenueBarChart data={revenue} /> : <div className="adm-loading-row">Đang tải biểu đồ…</div>}
      </div>

      <div className="adm-card adm-status-card">
        <h3>Phân bố trạng thái đơn hàng</h3>
        {statusBreakdown ? (
          <div className="adm-status-list">
            {Object.entries(ORDER_STATUS_LABELS).map(([key, label]) => {
              const count = statusBreakdown[key] || 0;
              const pct = totalOrdersForBreakdown ? Math.round((count / totalOrdersForBreakdown) * 100) : 0;
              return (
                <div className="adm-status-row" key={key}>
                  <span className="adm-status-row-label">{label}</span>
                  <div className="adm-status-row-track">
                    <div className={`adm-status-row-fill adm-status-row-fill-${key}`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className="adm-status-row-count">{count}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="adm-loading-row">Đang tải…</div>
        )}
      </div>
    </div>
  );
}

function formatVnd(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}

function IconUser() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.6 3-6.2 7-6.2s7 2.6 7 6.2" />
    </svg>
  );
}
function IconStore() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9.5 4.5 4h15L21 9.5" />
      <path d="M4 9.5v10h16v-10" />
    </svg>
  );
}
function IconBox() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 8 12 3 3 8l9 5 9-5Z" />
      <path d="M3 8v9l9 5 9-5V8" />
    </svg>
  );
}
function IconReceipt() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 3h12v18l-2.5-1.5L13 21l-2.5-1.5L8 21l-2-1.5V3Z" />
      <path d="M9 8h6M9 12h6" />
    </svg>
  );
}
