// src/admin/pages/UsersPage.jsx
//
// Quản lý người dùng: danh sách, tìm kiếm, lọc theo role, xem chi tiết,
// đổi role, xóa tài khoản.
//
// Lưu ý: schema không có cột "trạng thái khóa" riêng (không có is_banned),
// nên "khóa tài khoản" ở đây được mô phỏng bằng cách không xóa mà chỉ revoke
// quyền — TODO: nếu bạn thêm cột is_active/banned vào bảng users, hãy báo để
// tôi cập nhật hành động Khóa/Mở khóa cho đúng cột.

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, deleteUser } from '../../lib/adminApi';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import Pagination from '../../components/Pagination/Pagination';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import '../../components/DataTable.css';
import './UsersPage.css';

const PAGE_SIZE = 10;

export default function UsersPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmState, setConfirmState] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchUsers({ role, search, page, pageSize: PAGE_SIZE })
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
  }, [role, search, page]);

  function handleSearchChange(e) {
    setSearch(e.target.value);
    setPage(1);
  }

  function handleRoleFilterChange(value) {
    setRole(value);
    setPage(1);
  }

  function askDelete(user) {
    setConfirmState({
      title: `Xóa tài khoản "${user.name}"?`,
      message: 'Hành động này không thể hoàn tác. Nếu tài khoản còn đơn hàng/sản phẩm liên quan, việc xóa có thể thất bại.',
      confirmLabel: 'Xóa tài khoản',
      tone: 'danger',
      onConfirm: async () => {
        await deleteUser(user.id);
        setRows((prev) => prev.filter((r) => r.id !== user.id));
        setTotal((t) => t - 1);
      },
    });
  }

  return (
    <div>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Khách hàng &amp; người dùng</h1>
          <p className="adm-page-subtitle">Danh sách tài khoản buyer và seller trong hệ thống.</p>
        </div>
      </div>

      <div className="adm-toolbar">
        <div className="adm-search-input-wrap">
          <IconSearch />
          <input
            className="adm-input"
            placeholder="Tìm theo tên hoặc email…"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <select className="adm-select" value={role} onChange={(e) => handleRoleFilterChange(e.target.value)}>
          <option value="all">Tất cả vai trò</option>
          <option value="buyer">Khách hàng</option>
          <option value="seller">Người bán</option>
          <option value="admin">Quản trị viên</option>
        </select>
      </div>

      <div className="adm-card">
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Vai trò</th>
                <th>Ngày đăng ký</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                rows.map((u) => (
                  <tr key={u.id} className="adm-table-row-clickable" onClick={() => navigate(`/admin/users/${u.id}`)}>
                    <td className="adm-cell-primary">{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone || <span className="adm-cell-secondary">—</span>}</td>
                    <td>
                      <StatusBadge status={u.role} />
                    </td>
                    <td className="adm-cell-secondary">{formatDate(u.created_at)}</td>
                    <td>
                      <div className="adm-cell-actions" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          className="adm-btn adm-btn-outline adm-btn-sm"
                          onClick={() => navigate(`/admin/users/${u.id}`)}
                        >
                          Xem
                        </button>
                        <button
                          type="button"
                          className="adm-btn adm-btn-danger adm-btn-sm"
                          onClick={() => askDelete(u)}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {loading && <div className="adm-loading-row">Đang tải danh sách…</div>}
          {!loading && rows.length === 0 && (
            <div className="adm-empty-state">
              <strong>Không tìm thấy người dùng</strong>
              <span>Thử đổi từ khóa tìm kiếm hoặc bộ lọc vai trò.</span>
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

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('vi-VN');
}

function IconSearch() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}
