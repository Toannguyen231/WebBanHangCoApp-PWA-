import { useCounter } from '../../hooks/useAnimations'

function AnimatedMetric({ target, suffix = '', label }) {
  const ref = useCounter(target, suffix)
  return (
    <div className="bento-metric">
      <span className="bento-metric-num" ref={ref}>0</span>
      <span className="bento-metric-label">{label}</span>
    </div>
  )
}

export default function SocialImpactBento() {
  return (
    <div className="impact-bento-section">
      <div className="section-header">
        <span className="section-label">Số liệu & Tác động xã hội</span>
        <h2 className="section-title">Gìn Nghề Trăm Năm — Giữ Trọn Sinh Kế</h2>
        <div className="section-divider" />
        <p className="section-description">
          Dựa trên khảo sát thực tế tại Làng nghề chiếu cói Phú Tân, xã An Cư, Tuy An, Phú Yên (ven đầm Ô Loan) — Chiếu Nẫu cam kết tái phân bổ công bằng giá trị gia tăng cho người thợ thủ công.
        </p>
      </div>

      <div className="bento-grid">
        {/* Card 1: Hero Large - 550+ lao động & 219 hộ gia đình */}
        <div className="bento-card bento-card--hero">
          <div className="bento-card-bg-gradient" />
          <div className="bento-badge">
            <span className="craft-badge-dot" />
            Làng nghề Phú Tân — Phú Yên
          </div>
          <div className="bento-hero-body">
            <AnimatedMetric target={550} suffix="+" label="Lao động trực tiếp & 219 hộ làm nghề" />
            <h3 className="bento-card-title">Hồi Sinh Sinh Kế Ven Đầm Ô Loan</h3>
            <p className="bento-card-text">
              Làng nghề chiếu cói Phú Tân có lịch sử hơn 100 năm, được UBND tỉnh Phú Yên công nhận năm 2013. Chiếu Nẫu hợp tác cùng HTX An Cư đưa các dòng phụ kiện cói cao cấp ra thị trường, tạo thu nhập ổn định giúp bà con gắn bó lâu dài với nghề quê hương.
            </p>
          </div>
        </div>

        {/* Card 2: Tiền công tăng 11.9 lần */}
        <div className="bento-card bento-card--stat">
          <div className="bento-icon-wrap">📈</div>
          <div className="bento-metric">
            <span className="bento-metric-num">~11.9×</span>
            <span className="bento-metric-label">Tăng giá trị tiền công mỗi giờ lao động</span>
          </div>
          <p className="bento-stat-sub">
            Từ 5.625đ/giờ (chiếu thủ công truyền thống 45.000đ/8h cho 3 đôi) lên 66.667đ/giờ với túi cói Chiếu Nẫu (trả 200.000đ tiền công/túi 3h).
          </p>
        </div>

        {/* Card 3: 25 ha cánh đồng cói */}
        <div className="bento-card bento-card--eco">
          <div className="bento-icon-wrap">🌾</div>
          <AnimatedMetric target={25} suffix=" ha" label="Vùng nguyên liệu cói tự nhiên" />
          <p className="bento-stat-sub">
            Cánh đồng cói Phú Tân ven đầm Ô Loan được phơi 2–3 nắng to dẻo dai, lên màu mật ong ấm áp, hoàn toàn không hóa chất hay sợi nhựa PE/PP.
          </p>
        </div>

        {/* Card 4: UN SDGs 1 & 8 */}
        <div className="bento-card bento-card--impact">
          <div className="bento-icon-wrap">🎯</div>
          <div className="bento-metric">
            <span className="bento-metric-num" style={{ fontSize: '1.85rem' }}>SDG 1 & 8</span>
            <span className="bento-metric-label">Mục tiêu Phát triển Bền vững LHQ</span>
          </div>
          <p className="bento-stat-sub">
            Xóa nghèo qua kỹ năng sinh kế bản địa (SDG 1.4) và kiến tạo việc làm tốt, tăng trưởng kinh tế tuần hoàn địa phương (SDG 8).
          </p>
        </div>

        {/* Card 5: Kế thừa hơn 100 năm di sản */}
        <div className="bento-card bento-card--heritage">
          <div className="bento-icon-wrap">🏮</div>
          <div className="bento-metric">
            <span className="bento-metric-num">100+ Năm</span>
            <span className="bento-metric-label">Di sản dệt chiếu được gìn giữ</span>
          </div>
          <p className="bento-stat-sub">
            Kế thừa tri thức qua 3–5 đời nghệ nhân làng nghề, kết hợp cùng tư duy thiết kế đương đại của người trẻ để văn hóa không bị mai một.
          </p>
        </div>
      </div>
    </div>
  )
}
