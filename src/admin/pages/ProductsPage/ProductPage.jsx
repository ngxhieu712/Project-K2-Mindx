// src/admin/pages/ProductsPage.jsx
//
// Quản lý sản phẩm: danh sách, lọc theo trạng thái (pending/active/locking),
// tìm theo tên, duyệt nhanh ngay trên danh sách (đổi status), xem chi tiết.

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, updateProductStatus, deleteProduct } from '../../lib/adminApi';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import Pagination from '../../components/Pagination/Pagination';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import '../../components/DataTable.css';

const PAGE_SIZE = 10;

export default function ProductsPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmState, setConfirmState] = useState(null);
  const [actingId, setActingId] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchProducts({ status, search, page, pageSize: PAGE_SIZE })
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

  async function handleStatusAction(product, newStatus) {
    setActingId(product.id);
    try {
      await updateProductStatus(product.id, newStatus);
      setRows((prev) => prev.map((r) => (r.id === product.id ? { ...r, status: newStatus } : r)));
    } catch (err) {
      setError(err.message);
    } finally {
      setActingId(null);
    }
  }

  function askDelete(product) {
    setConfirmState({
      title: `Xóa sản phẩm "${product.name}"?`,
      message: 'Hành động này không thể hoàn tác. Đơn hàng đã có chứa sản phẩm này sẽ không bị ảnh hưởng, nhưng sản phẩm sẽ bị xóa khỏi catalog.',
      confirmLabel: 'Xóa sản phẩm',
      onConfirm: async () => {
        await deleteProduct(product.id);
        setRows((prev) => prev.filter((r) => r.id !== product.id));
        setTotal((t) => t - 1);
      },
    });
  }

  return (
    <div>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Sản phẩm</h1>
          <p className="adm-page-subtitle">Duyệt sản phẩm mới, kiểm soát trạng thái bán hàng.</p>
        </div>
      </div>

      <div className="adm-toolbar">
        <div className="adm-search-input-wrap">
          <IconSearch />
          <input
            className="adm-input"
            placeholder="Tìm theo tên sản phẩm…"
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
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">Chờ duyệt</option>
          <option value="active">Đang bán</option>
          <option value="locking">Đã khóa</option>
        </select>
      </div>

      <div className="adm-card">
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Người bán</th>
                <th>Danh mục</th>
                <th>Giá</th>
                <th>Trạng thái</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                rows.map((p) => (
                  <tr key={p.id} className="adm-table-row-clickable" onClick={() => navigate(`/admin/products/${p.id}`)}>
                    <td className="adm-cell-primary">{p.name}</td>
                    <td>{p.seller?.name || <span className="adm-cell-secondary">—</span>}</td>
                    <td>{p.category?.name || <span className="adm-cell-secondary">—</span>}</td>
                    <td>{formatVnd(p.base_price)}</td>
                    <td>
                      <StatusBadge status={p.status} />
                    </td>
                    <td>
                      <div className="adm-cell-actions" onClick={(e) => e.stopPropagation()}>
                        {p.status === 'pending' && (
                          <>
                            <button
                              type="button"
                              className="adm-btn adm-btn-primary adm-btn-sm"
                              disabled={actingId === p.id}
                              onClick={() => handleStatusAction(p, 'active')}
                            >
                              Duyệt
                            </button>
                            <button
                              type="button"
                              className="adm-btn adm-btn-danger adm-btn-sm"
                              disabled={actingId === p.id}
                              onClick={() => handleStatusAction(p, 'locking')}
                            >
                              Từ chối
                            </button>
                          </>
                        )}
                        {p.status === 'active' && (
                          <button
                            type="button"
                            className="adm-btn adm-btn-danger adm-btn-sm"
                            disabled={actingId === p.id}
                            onClick={() => handleStatusAction(p, 'locking')}
                          >
                            Khóa
                          </button>
                        )}
                        {p.status === 'locking' && (
                          <button
                            type="button"
                            className="adm-btn adm-btn-outline adm-btn-sm"
                            disabled={actingId === p.id}
                            onClick={() => handleStatusAction(p, 'active')}
                          >
                            Mở lại
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {loading && <div className="adm-loading-row">Đang tải danh sách…</div>}
          {!loading && rows.length === 0 && (
            <div className="adm-empty-state">
              <strong>Không tìm thấy sản phẩm</strong>
              <span>Thử đổi từ khóa tìm kiếm hoặc bộ lọc trạng thái.</span>
            </div>
          )}
          {error && <div className="adm-alert adm-alert-danger">{error}</div>}
        </div>
        <Pagination page={page} pageSize={PAGE_SIZE} total={total} onPageChange={setPage} />
      </div>

      <ConfirmDialog state={confirmState} onClose={() => setConfirmState(null)} />
    </div>
  );
}

function formatVnd(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}

function IconSearch() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}
