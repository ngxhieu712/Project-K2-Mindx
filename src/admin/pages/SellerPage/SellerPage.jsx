// src/admin/pages/SellersPage.jsx
//
// Quản lý người bán (seller): danh sách rút ra từ bảng users (role = 'seller'),
// dẫn tới trang báo cáo chi tiết từng seller.

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../../lib/adminApi';
import Pagination from '../../components/Pagination/Pagination';
import '../../components/DataTable.css';

const PAGE_SIZE = 10;

export default function SellersPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchUsers({ role: 'seller', search, page, pageSize: PAGE_SIZE })
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
  }, [search, page]);

  return (
    <div>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Người bán</h1>
          <p className="adm-page-subtitle">Quản lý các tài khoản người bán và xem báo cáo hiệu suất.</p>
        </div>
      </div>

      <div className="adm-toolbar">
        <div className="adm-search-input-wrap">
          <IconSearch />
          <input
            className="adm-input"
            placeholder="Tìm theo tên hoặc email…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Người bán</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Tham gia từ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                rows.map((s) => (
                  <tr
                    key={s.id}
                    className="adm-table-row-clickable"
                    onClick={() => navigate(`/admin/sellers/${s.id}`)}
                  >
                    <td className="adm-cell-primary">{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.phone || <span className="adm-cell-secondary">—</span>}</td>
                    <td className="adm-cell-secondary">{new Date(s.created_at).toLocaleDateString('vi-VN')}</td>
                    <td>
                      <button
                        type="button"
                        className="adm-btn adm-btn-outline adm-btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/admin/sellers/${s.id}`);
                        }}
                      >
                        Xem báo cáo
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {loading && <div className="adm-loading-row">Đang tải danh sách…</div>}
          {!loading && rows.length === 0 && (
            <div className="adm-empty-state">
              <strong>Chưa có người bán nào</strong>
              <span>Người bán sẽ xuất hiện ở đây sau khi đăng ký với vai trò seller.</span>
            </div>
          )}
          {error && <div className="adm-alert adm-alert-danger">{error}</div>}
        </div>
        <Pagination page={page} pageSize={PAGE_SIZE} total={total} onPageChange={setPage} />
      </div>
    </div>
  );
}

function IconSearch() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}
