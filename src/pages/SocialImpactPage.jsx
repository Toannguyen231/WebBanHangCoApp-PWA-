import HeroSection from '../components/ui/HeroSection'
import SocialLinks from '../components/ui/SocialLinks'
import SocialImpactBento from '../components/ui/SocialImpactBento'
import { useScrollReveal } from '../hooks/useAnimations'

function Reveal({ className, children }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className || ''}`}>{children}</div>
}

export default function SocialImpactPage() {
  return (
    <>
      <HeroSection
        badge="Báo cáo Tác động Xã hội & Sinh kế"
        title='Tác Động Xã Hội <em>& Giá Trị Sinh Kế</em>'
        subtitle="Mô hình chuyển hóa giá trị lao động thủ công — từ 5.625đ/giờ dệt chiếu thô lên 66.667đ/giờ với sản phẩm cói cao cấp, bảo tồn bền vững làng nghề hơn 100 năm ven đầm Ô Loan."
        image="/assets/images/hero_social_impact.jpg"
        inner
      />

      {/* Bento Grid Metrics */}
      <section className="section section-cream" style={{ paddingTop: '2.5rem', paddingBottom: '3.5rem' }}>
        <div className="section-inner">
          <SocialImpactBento />
        </div>
      </section>

      {/* Chi tiết kinh tế lao động & Bảng so sánh trực quan */}
      <section className="section">
        <div className="section-inner">
          <Reveal className="section-header">
            <span className="section-label">Mô hình kinh tế lao động</span>
            <h2 className="section-title">So Sánh Giá Trị Giờ Lao Động Nghệ Nhân</h2>
            <div className="section-divider"></div>
            <p className="section-description">
              Dựa trên khảo sát thực tế được ghi nhận bởi Báo Thanh Niên (2024), VnExpress và Báo Làng Nghề Việt tại làng nghề chiếu cói Phú Tân, xã An Cư, Tuy An, Phú Yên.
            </p>
          </Reveal>

          <div style={{ maxWidth: '900px', margin: '0 auto', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid rgba(0,0,0,0.08)' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--primary)', color: '#ffffff', textAlign: 'left' }}>
                  <th style={{ padding: '16px 20px', fontSize: '0.95rem' }}>Chỉ số kinh tế (trong 8 giờ làm việc)</th>
                  <th style={{ padding: '16px 20px', fontSize: '0.95rem', backgroundColor: '#3e4a3e' }}>Dệt chiếu thủ công truyền thống</th>
                  <th style={{ padding: '16px 20px', fontSize: '0.95rem', backgroundColor: 'var(--accent-warm)' }}>Mô hình sản phẩm Chiếu Nẫu</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 600 }}>Sản lượng trong 8 giờ</td>
                  <td style={{ padding: '14px 20px', color: '#666' }}>3 đôi chiếu (cần 2 người phối hợp)</td>
                  <td style={{ padding: '14px 20px', color: 'var(--primary)', fontWeight: 700 }}>≈ 2.67 túi / thảm cói cao cấp</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f0f0f0', backgroundColor: '#faf9f6' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 600 }}>Giá bán trung bình / đơn vị</td>
                  <td style={{ padding: '14px 20px', color: '#666' }}>50.000 – 60.000₫ / cặp chiếu</td>
                  <td style={{ padding: '14px 20px', color: 'var(--primary)', fontWeight: 700 }}>550.000 – 750.000₫ / túi cao cấp</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 600 }}>Tổng giá trị tạo ra / 8 giờ</td>
                  <td style={{ padding: '14px 20px', color: '#666' }}>150.000 – 180.000₫</td>
                  <td style={{ padding: '14px 20px', color: 'var(--primary)', fontWeight: 700 }}>≈ 2.000.000₫ (Gấp 11–13 lần)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f0f0f0', backgroundColor: '#faf9f6' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 600 }}>Tiền công trực tiếp cho thợ / đơn vị</td>
                  <td style={{ padding: '14px 20px', color: '#c0392b' }}>15.000₫ / cặp (45.000₫ cho 3 cặp)</td>
                  <td style={{ padding: '14px 20px', color: 'var(--accent-warm)', fontWeight: 700 }}>200.000₫ / túi (3 giờ công tỉ mỉ)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 600 }}>Tiền công nhận được trong 8 giờ</td>
                  <td style={{ padding: '14px 20px', color: '#c0392b' }}>45.000₫ / ngày làm việc</td>
                  <td style={{ padding: '14px 20px', color: 'var(--accent-warm)', fontWeight: 700 }}>≈ 533.333₫ / 8 giờ lao động</td>
                </tr>
                <tr style={{ backgroundColor: '#eaf4ea', borderTop: '2px solid var(--primary)' }}>
                  <td style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--primary-dark)', fontSize: '1.05rem' }}>
                    Tiền công bình quân mỗi giờ
                  </td>
                  <td style={{ padding: '16px 20px', color: '#c0392b', fontWeight: 700 }}>
                    5.625₫ / giờ
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--primary)', fontWeight: 800, fontSize: '1.15rem' }}>
                    66.667₫ / giờ <span style={{ fontSize: '0.85rem', color: 'var(--accent-warm)' }}>(Tăng ~11.9 lần)</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ maxWidth: '850px', margin: '2rem auto 0 auto', padding: '1.5rem', borderRadius: '12px', backgroundColor: '#f5f7f2', borderLeft: '4px solid var(--primary)' }}>
            <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
              <strong>Bản chất tác động xã hội:</strong> Chiếu Nẫu không chạy đua bán túi giá cao để tối đa hóa biên lợi nhuận đơn thuần, mà tập trung <em>tái phân bổ giá trị gia tăng trực tiếp cho nghệ nhân</em> (200.000₫/sản phẩm). Khi tiền công theo giờ tăng xứng đáng với tay nghề, nghề dệt chiếu mới đủ sức hấp dẫn kinh tế để giữ chân thế hệ trẻ tiếp nối.
            </p>
          </div>
        </div>
      </section>

      {/* Tiếng nói từ Nghệ nhân & Làng nghề */}
      <section className="section section-cream">
        <div className="section-inner">
          <Reveal className="section-header">
            <span className="section-label">Tiếng nói người trong cuộc</span>
            <h2 className="section-title">Những Người Giữ Hồn Chiếu Cói Phú Tân</h2>
            <div className="section-divider"></div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            {/* Nghệ nhân Phùng Thị Sâm */}
            <div className="value-card" style={{ textAlign: 'left', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(45,90,45,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                  👵
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--primary-dark)' }}>Bà Phùng Thị Sâm (63 tuổi)</h4>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Thôn Phú Tân, 50 năm gắn bó dệt chiếu</span>
                </div>
              </div>
              <p style={{ fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                "Mỗi ngày tôi dệt được 3 đôi chiếu, từ 5 giờ sáng đến 13 giờ thì về. Thu nhập cũng thấp lắm, 3 đôi chiếu thì được trả 45.000 đồng tiền công dệt. Người ở vùng này chuyển sang dệt máy hết rồi, đời sau cũng ít người theo nghề vì làm chiếu vừa cực lại vừa ít tiền..."
              </p>
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed #ddd', fontSize: '0.82rem', color: 'var(--primary)' }}>
                Nguồn: Báo Thanh Niên ghi nhận thực trạng làng nghề chiếu Phú Tân (2024)
              </div>
            </div>

            {/* Nghệ nhân Phạm Thị Huệ */}
            <div className="value-card" style={{ textAlign: 'left', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(45,90,45,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                  🌾
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--primary-dark)' }}>Nghệ nhân Phạm Thị Huệ (65 tuổi)</h4>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Thế hệ thứ 5 làm nghề chiếu cói Phú Tân</span>
                </div>
              </div>
              <p style={{ fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                "Gia đình tôi làm nghề chiếu cói đã trải qua 5 đời và tôi là đời thứ 5. Khâu vất vả nhất là đi cắt cói ngoài đồng lúc tầm 2, 3 giờ sáng, nghề này đòi hỏi sự chịu khó, tỉ mỉ... Nghề này chủ yếu cho người lớn tuổi làm lúc nông nhàn để kiếm thêm thu nhập."
              </p>
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed #ddd', fontSize: '0.82rem', color: 'var(--primary)' }}>
                Nguồn: Tạp chí Điện tử Làng nghề Việt (2024)
              </div>
            </div>

            {/* Nghệ nhân Trần Thị Mỹ Trang */}
            <div className="value-card" style={{ textAlign: 'left', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(45,90,45,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                  🤝
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--primary-dark)' }}>Nghệ nhân Trần Thị Mỹ Trang</h4>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Quản lý điều hành HTX Chiếu cói An Cư — Cố vấn Sản xuất Chiếu Nẫu</span>
                </div>
              </div>
              <p style={{ fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                "Chiếu Nẫu không cạnh tranh với làng nghề mà đóng vai trò kết nối — chuẩn hóa chất lượng, thiết kế lại và mở kênh phân phối mới cho sản phẩm thủ công truyền thống. Dự án giúp bà con nhận được tiền công xứng đáng với bàn tay tài hoa của mình."
              </p>
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed #ddd', fontSize: '0.82rem', color: 'var(--primary)' }}>
                HTX Sản xuất – Dịch vụ – Du lịch chiếu cói An Cư, Phú Yên
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cam kết Mục tiêu Bền vững Liên Hợp Quốc UN SDGs */}
      <section className="section">
        <div className="section-inner">
          <Reveal className="section-header">
            <span className="section-label">Phát triển bền vững</span>
            <h2 className="section-title">Đóng Góp Vào Khung SDG Của Liên Hợp Quốc</h2>
            <div className="section-divider"></div>
            <p className="section-description">
              Dự án thuộc Nhóm 2 – Cộng đồng bền vững & Thực hành kinh tế tuần hoàn trong khuôn khổ BizSpark Initiative 2026.
            </p>
          </Reveal>

          <div className="values-grid stagger-children">
            <div className="value-card" style={{ borderTop: '4px solid #e5243b' }}>
              <div className="value-icon" style={{ color: '#e5243b' }}>🎯</div>
              <h3 style={{ color: '#e5243b' }}>SDG 1 — Xóa Nghèo (Target 1.4)</h3>
              <p>
                Không tiếp cận theo nghĩa trợ cấp tài chính tạm thời, Chiếu Nẫu tạo ra <strong>nguồn sinh kế có thu nhập tốt hơn và ổn định hơn</strong> từ chính kỹ năng dệt cói sẵn có của bà con Phú Tân. Nâng cao năng lực kinh tế tự chủ cho 219 hộ gia đình, giảm nguy cơ bỏ xứ tha hương.
              </p>
            </div>
            <div className="value-card" style={{ borderTop: '4px solid #a21942' }}>
              <div className="value-icon" style={{ color: '#a21942' }}>💼</div>
              <h3 style={{ color: '#a21942' }}>SDG 8 — Việc Làm Tốt & Tăng Trưởng</h3>
              <p>
                Chuyển từ mô hình khoán công số lượng giá rẻ sang mô hình <strong>xác định tiền công dựa trên thời gian lao động, kỹ năng và tính độc bản</strong> của tác phẩm (66.667₫/giờ). Khi dự án nhân rộng, việc làm lan tỏa đến các công đoạn sơ chế, phơi sấy, QC và logistics địa phương.
              </p>
            </div>
            <div className="value-card" style={{ borderTop: '4px solid #bf8b2e' }}>
              <div className="value-icon" style={{ color: '#bf8b2e' }}>♻️</div>
              <h3 style={{ color: '#bf8b2e' }}>SDG 12 — Tiêu Dùng & Sản Xuất Bền Vững</h3>
              <p>
                Khai thác vùng nguyên liệu 25 ha cói ven đầm Ô Loan với quy trình sinh thái 100%: nhuộm thảo mộc tự nhiên, không hóa chất độc hại, phơi nắng tự nhiên và tận dụng phần cói ngắn dệt chiếu để làm đĩa thảm lót nhỏ — tối ưu hóa kinh tế tuần hoàn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Reveal className="cta-content">
          <span className="section-label" style={{ color: 'var(--accent-gold)' }}>Chung tay giữ nghề</span>
          <h2 className="cta-title">Đồng Hành Cùng Làng Nghề Chiếu Nẫu</h2>
          <p className="cta-text">
            Mỗi sản phẩm bạn cầm trên tay trực tiếp đóng góp 200.000₫ tiền công cho bàn tay tài hoa của người thợ Phú Tân, giúp ngọn lửa làng nghề trăm năm không bao giờ tắt.
          </p>
          <SocialLinks />
        </Reveal>
      </section>
    </>
  )
}
