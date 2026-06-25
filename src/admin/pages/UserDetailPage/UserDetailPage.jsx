// src/admin/pages/UserDetailPage.jsx
//
// Chi tiết 1 người dùng: thông tin cá nhân, địa chỉ giao hàng, lịch sử đơn hàng,
// và hành động đổi vai trò (role).

import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchUserDetail, updateUserRole } from '../../lib/adminApi';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import '../../components/DataTable.css';
import './UserDetailPage.css';

export default function UserDetailPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [savingRole, setSavingRole] = useState(false);

  useEffect(() => {
    let active = true;
    fetchUserDetail(userId)
      .then((d) => active && setData(d))
      .catch((err) => active && setError(err.message));
    return () => {
      active = false;
    };
  }, [userId]);

  async function handleRoleChange(newRole) {
    setSavingRole(true);
    try {
      await updateUserRole(userId, newRole);
      setData((prev) => ({ ...prev, user: { ...prev.user, role: newRole } }));
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingRole(false);
    }
  }

  if (error) return <div className="adm-alert adm-alert-danger">{error}</div>;
  if (!data) return <div className="adm-loading-row">Đang tải…</div>;

  const { user, addresses, orders } = data;

  return (
    <div>
      <button type="button" className="adm-btn adm-btn-ghost adm-back-btn" onClick={() => navigate('/admin/users')}>
        ← Quay lại danh sách
      </button>

      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">{user.name}</h1>
          <p className="adm-page-subtitle">{user.email}</p>
        </div>
        <div className="adm-detail-role-control">
          <span>Vai trò:</span>
          <select
            className="adm-select"
            value={user.role}
            disabled={savingRole}
            onChange={(e) => handleRoleChange(e.target.value)}
          >
            <option value="buyer">Khách hàng</option>
            <option value="seller">Người bán</option>
            <option value="admin">Quản trị viên</option>
          </select>
        </div>
      </div>

      <div className="adm-detail-grid">
        <div className="adm-card adm-detail-card">
          <h3>Thông tin cá nhân</h3>
          <dl className="adm-detail-list">
            <div>
              <dt>Số điện thoại</dt>
              <dd>{user.phone || '—'}</dd>
            </div>
            <div>
              <dt>Vai trò</dt>
              <dd>
                <StatusBadge status={user.role} />
              </dd>
            </div>
            <div>
              <dt>Ngày đăng ký</dt>
              <dd>{new Date(user.created_at).toLocaleString('vi-VN')}</dd>
            </div>
            <div>
              <dt>Cập nhật gần nhất</dt>
              <dd>{user.updated_at ? new Date(user.updated_at).toLocaleString('vi-VN') : '—'}</dd>
            </div>
          </dl>
        </div>

        <div className="adm-card adm-detail-card">
          <h3>Địa chỉ giao hàng ({addresses.length})</h3>
          {addresses.length === 0 ? (
            <p className="adm-cell-secondary">Chưa có địa chỉ nào.</p>
          ) : (
            <ul className="adm-address-list">
              {addresses.map((addr) => (
                <li key={addr.id}>
                  <strong>
                    {addr.full_name} {addr.is_default && <span className="adm-default-tag">Mặc định</span>}
                  </strong>
                  <span>{addr.phone}</span>
                  <span>
                    {addr.street_detail}, {addr.ward ? `${addr.ward}, ` : ''}
                    {addr.district}, {addr.province}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="adm-card adm-detail-card-full">
        <h3>Lịch sử đơn hàng ({orders.length})</h3>
        {orders.length === 0 ? (
          <p className="adm-cell-secondary">Người dùng chưa có đơn hàng nào.</p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Giá trị</th>
                  <th>Trạng thái</th>
                  <th>Ngày tạo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td className="adm-cell-primary">#{o.id}</td>
                    <td>{formatVnd(o.total_amount)}</td>
                    <td>
                      <StatusBadge status={o.status} />
                    </td>
                    <td className="adm-cell-secondary">{new Date(o.created_at).toLocaleDateString('vi-VN')}</td>
                    <td>
                      <Link to={`/admin/orders/${o.id}`} className="adm-btn adm-btn-outline adm-btn-sm">
                        Xem đơn
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
