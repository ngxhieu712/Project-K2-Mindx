// src/admin/pages/SellerDetailPage.jsx
//
// Báo cáo chi tiết 1 seller: số liệu (sản phẩm, đơn hàng, doanh thu, đánh giá)
// + danh sách sản phẩm của seller này.

import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchUserDetail, fetchSellerReport, fetchProductsBySeller } from '../../lib/adminApi';
import StatCard from '../../components/StatCard/StatCard';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import '../../components/DataTable.css';
import './SellerDetailPage.css';

export default function SellerDetailPage() {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);
  const [report, setReport] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [userDetail, reportData] = await Promise.all([
          fetchUserDetail(sellerId),
          fetchSellerReport(sellerId),
        ]);
        if (!active) return;
        setSeller(userDetail.user);
        setReport(reportData);

        // Lấy danh sách sản phẩm của seller này.
        const productRows = await fetchProductsBySeller(sellerId);
        if (active) setProducts(productRows);
      } catch (err) {
        if (active) setError(err.message);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [sellerId]);

  if (error) return <div className="adm-alert adm-alert-danger">{error}</div>;
  if (!seller || !report) return <div className="adm-loading-row">Đang tải báo cáo…</div>;

  return (
    <div>
      <button type="button" className="adm-btn adm-btn-ghost adm-back-btn" onClick={() => navigate('/admin/sellers')}>
        ← Quay lại danh sách người bán
      </button>

      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">{seller.name}</h1>
          <p className="adm-page-subtitle">{seller.email}</p>
        </div>
      </div>

      <div className="adm-stat-grid-4">
        <StatCard label="Tổng sản phẩm" value={report.totalProducts} tone="accent" icon={<IconBox />} />
        <StatCard label="Đang bán" value={report.activeProducts} tone="success" icon={<IconCheck />} />
        <StatCard label="Chờ duyệt" value={report.pendingProducts} tone="warning" icon={<IconClock />} />
        <StatCard
          label="Doanh thu (đơn đã có)"
          value={formatVnd(report.totalRevenue)}
          tone="info"
          icon={<IconCoin />}
          hint={`${report.totalOrders} đơn hàng`}
        />
      </div>

      {report.avgRating !== null && (
        <div className="adm-card adm-rating-card">
          <span>Đánh giá trung bình</span>
          <strong>{report.avgRating.toFixed(1)} / 5</strong>
        </div>
      )}

      <div className="adm-card adm-detail-card-full">
        <h3>Sản phẩm của người bán ({products.length})</h3>
        {products.length === 0 ? (
          <p className="adm-cell-secondary">Người bán chưa có sản phẩm nào.</p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th>Trạng thái</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td className="adm-cell-primary">{p.name}</td>
                    <td>{formatVnd(p.base_price)}</td>
                    <td>
                      <StatusBadge status={p.status} />
                    </td>
                    <td>
                      <Link to={`/admin/products/${p.id}`} className="adm-btn adm-btn-outline adm-btn-sm">
                        Xem
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function formatVnd(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}

function IconBox() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 8 12 3 3 8l9 5 9-5Z" />
      <path d="M3 8v9l9 5 9-5V8" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}
function IconCoin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.2c.3-1 1.3-1.7 2.5-1.7 1.5 0 2.6.9 2.6 2s-1 1.7-2.6 1.9c-1.7.2-2.6 1-2.6 2.1 0 1.1 1.1 2 2.6 2 1.2 0 2.2-.6 2.5-1.6" />
    </svg>
  );
}
