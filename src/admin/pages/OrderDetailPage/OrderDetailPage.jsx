// src/admin/pages/OrderDetailPage/OrderDetailPage.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchOrderDetail, updateOrderStatus, ORDER_STATUSES } from '../../lib/adminApi';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import '../../components/DataTable.css';

const STATUS_LABELS = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy',
};

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [acting, setActing] = useState(false);

  useEffect(() => {
    let active = true;
    fetchOrderDetail(orderId)
      .then((result) => active && setData(result))
      .catch((err) => active && setError(err.message));
    return () => {
      active = false;
    };
  }, [orderId]);

  async function handleStatusChange(status) {
    setActing(true);
    try {
      await updateOrderStatus(orderId, status);
      setData((prev) => ({ ...prev, order: { ...prev.order, status } }));
    } catch (err) {
      setError(err.message);
    } finally {
      setActing(false);
    }
  }

  if (error) return <div className="adm-alert adm-alert-danger">{error}</div>;
  if (!data) return <div className="adm-loading-row">Đang tải chi tiết đơn...</div>;

  const { order, address, items, payment } = data;

  return (
    <div>
      <button type="button" className="adm-btn adm-btn-ghost adm-back-btn" onClick={() => navigate('/admin/orders')}>
        ← Quay lại danh sách đơn hàng
      </button>

      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Đơn hàng #{order.id}</h1>
          <p className="adm-page-subtitle">{order.buyer?.name || order.buyer?.email || 'Không rõ người mua'}</p>
        </div>
        <div className="adm-cell-actions">
          <StatusBadge status={order.status} />
          <select
            className="adm-select"
            value={order.status}
            disabled={acting}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            {ORDER_STATUSES.map((status) => (
              <option key={status} value={status}>{STATUS_LABELS[status]}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="adm-detail-grid">
        <div className="adm-card adm-detail-card">
          <h3>Thông tin đơn hàng</h3>
          <dl className="adm-detail-list">
            <div><dt>Tổng tiền</dt><dd>{formatVnd(order.total_amount)}</dd></div>
            <div><dt>Ngày tạo</dt><dd>{new Date(order.created_at).toLocaleString('vi-VN')}</dd></div>
            <div><dt>Thanh toán</dt><dd>{payment ? <StatusBadge status={payment.payment_status} /> : '—'}</dd></div>
            <div><dt>Phương thức</dt><dd>{payment?.payment_method || '—'}</dd></div>
          </dl>
        </div>

        <div className="adm-card adm-detail-card">
          <h3>Địa chỉ giao hàng</h3>
          {address ? (
            <dl className="adm-detail-list">
              <div><dt>Người nhận</dt><dd>{address.full_name}</dd></div>
              <div><dt>Số điện thoại</dt><dd>{address.phone}</dd></div>
              <div>
                <dt>Địa chỉ</dt>
                <dd>{address.street_detail}, {address.ward ? `${address.ward}, ` : ''}{address.district}, {address.province}</dd>
              </div>
            </dl>
          ) : (
            <p className="adm-cell-secondary">Không có địa chỉ.</p>
          )}
        </div>
      </div>

      <div className="adm-card adm-detail-card-full">
        <h3>Sản phẩm trong đơn ({items.length})</h3>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Người bán</th>
                <th>Biến thể</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="adm-cell-primary">
                    {item.variant?.product ? (
                      <Link to={`/admin/products/${item.variant.product.id}`}>{item.variant.product.name}</Link>
                    ) : '—'}
                  </td>
                  <td>{item.variant?.product?.seller?.name || '—'}</td>
                  <td>{[item.variant?.color, item.variant?.size, item.variant?.storage].filter(Boolean).join(' / ') || '—'}</td>
                  <td>{item.quantity}</td>
                  <td>{formatVnd(item.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function formatVnd(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(value || 0));
}
