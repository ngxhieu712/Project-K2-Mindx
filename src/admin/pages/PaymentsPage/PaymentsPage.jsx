// src/admin/pages/PaymentsPage/PaymentsPage.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPayments, refundPayment } from '../../lib/adminApi';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import Pagination from '../../components/Pagination/Pagination';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import '../../components/DataTable.css';

const PAGE_SIZE = 10;

const PAYMENT_STATUS_LABELS = {
  all: 'Tất cả trạng thái',
  pending: 'Chờ xử lý',
  paid: 'Đã thanh toán',
  failed: 'Thất bại',
  refunded: 'Đã hoàn tiền',
};

export default function PaymentsPage() {
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmState, setConfirmState] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchPayments({ status, page, pageSize: PAGE_SIZE })
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
  }, [status, page]);

  function askRefund(payment) {
    setConfirmState({
      title: `Hoàn tiền giao dịch #${payment.id}?`,
      message: 'Trạng thái thanh toán sẽ được chuyển sang đã hoàn tiền.',
      confirmLabel: 'Hoàn tiền',
      onConfirm: async () => {
        await refundPayment(payment.id);
        setRows((prev) => prev.map((row) => (
          row.id === payment.id ? { ...row, payment_status: 'refunded' } : row
        )));
      },
    });
  }

  return (
    <div>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Thanh toán</h1>
          <p className="adm-page-subtitle">Theo dõi giao dịch, trạng thái thanh toán và hoàn tiền.</p>
        </div>
      </div>

      <div className="adm-toolbar">
        <select
          className="adm-select"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
        >
          {Object.entries(PAYMENT_STATUS_LABELS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      <div className="adm-card">
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Mã giao dịch</th>
                <th>Đơn hàng</th>
                <th>Người mua</th>
                <th>Số tiền</th>
                <th>Phương thức</th>
                <th>Trạng thái</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {!loading && rows.map((payment) => (
                <tr key={payment.id}>
                  <td className="adm-cell-primary">#{payment.id}</td>
                  <td><Link to={`/admin/orders/${payment.order?.id}`}>#{payment.order?.id}</Link></td>
                  <td>{payment.order?.buyer?.name || payment.order?.buyer?.email || '—'}</td>
                  <td>{formatVnd(payment.order?.total_amount)}</td>
                  <td>{payment.payment_method}</td>
                  <td><StatusBadge status={payment.payment_status} /></td>
                  <td>
                    {payment.payment_status === 'paid' && (
                      <button type="button" className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => askRefund(payment)}>
                        Hoàn tiền
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <div className="adm-loading-row">Đang tải thanh toán...</div>}
          {!loading && rows.length === 0 && <div className="adm-empty-state"><strong>Không có giao dịch</strong></div>}
          {error && <div className="adm-alert adm-alert-danger">{error}</div>}
        </div>
        <Pagination page={page} pageSize={PAGE_SIZE} total={total} onPageChange={setPage} />
      </div>

      <ConfirmDialog state={confirmState} onClose={() => setConfirmState(null)} />
    </div>
  );
}

function formatVnd(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(value || 0));
}
