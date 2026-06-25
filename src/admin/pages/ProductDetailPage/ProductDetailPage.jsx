// src/admin/pages/ProductDetailPage.jsx
//
// Chi tiết sản phẩm: thông tin chính, người bán, hình ảnh, các biến thể
// (color/size/storage/price/stock), và hành động duyệt/khóa/xóa.

import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchProductDetail, updateProductStatus, deleteProduct } from '../../lib/adminApi';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import '../../components/DataTable.css';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [acting, setActing] = useState(false);
  const [confirmState, setConfirmState] = useState(null);

  useEffect(() => {
    let active = true;
    fetchProductDetail(productId)
      .then((d) => active && setData(d))
      .catch((err) => active && setError(err.message));
    return () => {
      active = false;
    };
  }, [productId]);

  async function handleStatusChange(newStatus) {
    setActing(true);
    try {
      await updateProductStatus(productId, newStatus);
      setData((prev) => ({ ...prev, product: { ...prev.product, status: newStatus } }));
    } catch (err) {
      setError(err.message);
    } finally {
      setActing(false);
    }
  }

  function askDelete() {
    setConfirmState({
      title: `Xóa sản phẩm "${data.product.name}"?`,
      message: 'Hành động này không thể hoàn tác.',
      confirmLabel: 'Xóa sản phẩm',
      onConfirm: async () => {
        await deleteProduct(productId);
        navigate('/admin/products');
      },
    });
  }

  if (error) return <div className="adm-alert adm-alert-danger">{error}</div>;
  if (!data) return <div className="adm-loading-row">Đang tải…</div>;

  const { product, images, variants } = data;

  return (
    <div>
      <button type="button" className="adm-btn adm-btn-ghost adm-back-btn" onClick={() => navigate('/admin/products')}>
        ← Quay lại danh sách sản phẩm
      </button>

      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">{product.name}</h1>
          <p className="adm-page-subtitle">
            Người bán:{' '}
            {product.seller ? (
              <Link to={`/admin/sellers/${product.seller.id}`}>{product.seller.name}</Link>
            ) : (
              '—'
            )}
          </p>
        </div>
        <div className="adm-product-actions">
          <StatusBadge status={product.status} />
          {product.status === 'pending' && (
            <>
              <button type="button" className="adm-btn adm-btn-primary" disabled={acting} onClick={() => handleStatusChange('active')}>
                Duyệt sản phẩm
              </button>
              <button type="button" className="adm-btn adm-btn-danger" disabled={acting} onClick={() => handleStatusChange('locking')}>
                Từ chối
              </button>
            </>
          )}
          {product.status === 'active' && (
            <button type="button" className="adm-btn adm-btn-danger" disabled={acting} onClick={() => handleStatusChange('locking')}>
              Khóa sản phẩm
            </button>
          )}
          {product.status === 'locking' && (
            <button type="button" className="adm-btn adm-btn-outline" disabled={acting} onClick={() => handleStatusChange('active')}>
              Mở lại
            </button>
          )}
          <button type="button" className="adm-btn adm-btn-danger" onClick={askDelete}>
            Xóa
          </button>
        </div>
      </div>

      <div className="adm-detail-grid">
        <div className="adm-card adm-detail-card">
          <h3>Thông tin chung</h3>
          <dl className="adm-detail-list">
            <div>
              <dt>Danh mục</dt>
              <dd>{product.category?.name || '—'}</dd>
            </div>
            <div>
              <dt>Thương hiệu</dt>
              <dd>{product.brand?.name || '—'}</dd>
            </div>
            <div>
              <dt>Giá gốc</dt>
              <dd>{formatVnd(product.base_price)}</dd>
            </div>
            <div>
              <dt>Ngày tạo</dt>
              <dd>{new Date(product.created_at).toLocaleDateString('vi-VN')}</dd>
            </div>
          </dl>
          {product.description && (
            <>
              <h4 className="adm-detail-sub-h">Mô tả</h4>
              <p className="adm-product-description">{product.description}</p>
            </>
          )}
        </div>

        <div className="adm-card adm-detail-card">
          <h3>Hình ảnh ({images.length})</h3>
          {images.length === 0 ? (
            <p className="adm-cell-secondary">Sản phẩm chưa có hình ảnh.</p>
          ) : (
            <div className="adm-image-grid">
              {images.map((img) => (
                <img key={img.id} src={img.image_url} alt={product.name} loading="lazy" />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="adm-card adm-detail-card-full">
        <h3>Biến thể sản phẩm ({variants.length})</h3>
        {variants.length === 0 ? (
          <p className="adm-cell-secondary">Sản phẩm chưa có biến thể nào.</p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Màu sắc</th>
                  <th>Kích thước</th>
                  <th>Dung lượng</th>
                  <th>Giá</th>
                  <th>Tồn kho</th>
                </tr>
              </thead>
              <tbody>
                {variants.map((v) => (
                  <tr key={v.id}>
                    <td className="adm-cell-primary">{v.sku || '—'}</td>
                    <td>{v.color || '—'}</td>
                    <td>{v.size || '—'}</td>
                    <td>{v.storage || '—'}</td>
                    <td>{formatVnd(v.price)}</td>
                    <td>
                      <span className={v.stock === 0 ? 'adm-stock-zero' : ''}>{v.stock}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmDialog state={confirmState} onClose={() => setConfirmState(null)} />
    </div>
  );
}

function formatVnd(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}
