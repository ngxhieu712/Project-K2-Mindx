// src/admin/pages/OrdersPage/OrdersPage.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchOrders, updateOrderStatus, ORDER_STATUSES } from '../../lib/adminApi';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import Pagination from '../../components/Pagination/Pagination';
import '../../components/DataTable.css';

const PAGE_SIZE = 10;

const STATUS_LABELS = {
  all: 'Tất cả trạng thái',
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy',
};

export default function OrdersPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actingId, setActingId] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchOrders({ status, search, page, pageSize: PAGE_SIZE })
      .then(({ rows, total }) => {
        if (!active) return;
        setRows(rows);
        setTotal(total);
        setError(null);
      })
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [status, search, page]);

  async function handleStatusChange(orderId, nextStatus) {
    setActingId(orderId);
    try {
      await updateOrderStatus(orderId, nextStatus);
      setRows((prev) => prev.map((row) => (row.id === orderId ? { ...row, status: nextStatus } : row)));
    } catch (err) {
      setError(err.message);
    } finally {
      setActingId(null);
    }
  }

  return (
    <div>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Đơn hàng</h1>
          <p className="adm-page-subtitle">Theo dõi và cập nhật trạng thái đơn hàng.</p>
        </div>
      </div>

      <div className="adm-toolbar">
        <div className="adm-search-input-wrap">
          <input
            className="adm-input"
            placeholder="Tìm theo mã đơn..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <select
          className="adm-select"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
        >
          {['all', ...ORDER_STATUSES].map((item) => (
            <option key={item} value={item}>{STATUS_LABELS[item] || item}</option>
          ))}
        </select>
      </div>

      <div className="adm-card">
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Người mua</th>
                <th>Giá trị</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {!loading && rows.map((order) => (
                <tr key={order.id} className="adm-table-row-clickable" onClick={() => navigate(`/admin/orders/${order.id}`)}>
                  <td className="adm-cell-primary">#{order.id}</td>
                  <td>{order.buyer?.name || order.buyer?.email || '—'}</td>
                  <td>{formatVnd(order.total_amount)}</td>
                  <td><StatusBadge status={order.status} /></td>
                  <td className="adm-cell-secondary">{formatDate(order.created_at)}</td>
                  <td>
                    <div className="adm-cell-actions" onClick={(e) => e.stopPropagation()}>
                      <select
                        className="adm-select"
                        value={order.status}
                        disabled={actingId === order.id}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        {ORDER_STATUSES.map((item) => (
                          <option key={item} value={item}>{STATUS_LABELS[item]}</option>
                        ))}
                      </select>
                      <Link to={`/admin/orders/${order.id}`} className="adm-btn adm-btn-outline adm-btn-sm">Xem</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <div className="adm-loading-row">Đang tải đơn hàng...</div>}
          {!loading && rows.length === 0 && <div className="adm-empty-state"><strong>Không có đơn hàng</strong></div>}
          {error && <div className="adm-alert adm-alert-danger">{error}</div>}
        </div>
        <Pagination page={page} pageSize={PAGE_SIZE} total={total} onPageChange={setPage} />
      </div>
    </div>
  );
}

function formatDate(iso) {
  return iso ? new Date(iso).toLocaleDateString('vi-VN') : '—';
}

function formatVnd(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(value || 0));
}
