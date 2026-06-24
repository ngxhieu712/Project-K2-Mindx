// src/admin/components/RevenueBarChart.jsx
//
// Biểu đồ cột doanh thu theo ngày, vẽ bằng SVG thuần — không phụ thuộc
// thư viện chart ngoài (project hiện tại chưa cài recharts/chart.js).

import './RevenueBarChart.css';

export default function RevenueBarChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="adm-empty-state">Chưa có dữ liệu doanh thu trong khoảng thời gian này.</div>;
  }

  const max = Math.max(...data.map((d) => d.revenue), 1);
  const width = 720;
  const height = 220;
  const paddingBottom = 28;
  const barGap = 6;
  const barWidth = Math.max(8, width / data.length - barGap);

  return (
    <div className="adm-revenue-chart">
      <svg viewBox={`0 0 ${width} ${height}`} className="adm-revenue-chart-svg" preserveAspectRatio="none">
        {data.map((d, i) => {
          const barHeight = (d.revenue / max) * (height - paddingBottom - 10);
          const x = i * (barWidth + barGap);
          const y = height - paddingBottom - barHeight;
          return (
            <g key={d.date} className="adm-revenue-bar-group">
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={Math.max(barHeight, 1)}
                rx="3"
                className="adm-revenue-bar"
              />
              <title>
                {formatDateShort(d.date)}: {formatVnd(d.revenue)}
              </title>
            </g>
          );
        })}
      </svg>
      <div className="adm-revenue-chart-axis">
        <span>{formatDateShort(data[0].date)}</span>
        <span>{formatDateShort(data[data.length - 1].date)}</span>
      </div>
    </div>
  );
}

function formatDateShort(iso) {
  const d = new Date(iso);
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

function formatVnd(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}