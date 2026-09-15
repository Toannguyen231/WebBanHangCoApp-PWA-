import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider'
import CraftJourneyTimeline from '../components/ui/CraftJourneyTimeline'
import SocialImpactBento from '../components/ui/SocialImpactBento'
import HeroSection from '../components/ui/HeroSection'
import ProductCard from '../components/ui/ProductCard'
import SocialLinks from '../components/ui/SocialLinks'
import { products } from '../data/products'
import { useScrollReveal, useCounter } from '../hooks/useAnimations'

function RevealSection({ className, children, ...props }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className || ''}`} {...props}>{children}</div>
}

function StatItem({ target, suffix, label }) {
  const ref = useCounter(target, suffix)
  return (
    <div className="stat-item">
      <div className="stat-number" ref={ref}>0</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

function Accordion() {
  const [active, setActive] = useState(0)
  const items = [
    { icon: '🌱', title: 'Sứ mệnh', text: 'Gìn giữ và nâng tầm nghề dệt chiếu cói hơn 100 năm tại Làng nghề Phú Tân (xã An Cư, Tuy An, Phú Yên ven đầm Ô Loan). Tạo sinh kế bền vững cho 219 hộ gia đình và đưa thủ công xứ Nẫu vươn xa.' },
    { icon: '🎯', title: 'Tầm nhìn', text: 'Chuyển đổi từ dệt chiếu thô sang các dòng phụ kiện thời trang và decor cao cấp, nâng giá trị giờ công lao động của người thợ lên 66.667₫/giờ (tăng gấp ~11.9 lần).' },
    { icon: '💚', title: 'Giá trị bền vững', text: '100% sợi cói nguyên bản từ cánh đồng 25 ha ven đầm Ô Loan, phơi 2–3 nắng to dẻo dai lên màu mật ong ấm áp, hoàn toàn không hóa chất hay sợi nhựa PE/PP.' },
    { icon: '🤝', title: 'Cộng đồng', text: 'Hợp tác chặt chẽ cùng HTX Chiếu cói An Cư và hơn 550 lao động địa phương, chi trả 200.000₫ tiền công/sản phẩm, đóng góp trực tiếp vào mục tiêu SDG 1 & SDG 8 Liên Hợp Quốc.' }
  ]

  return (
    <div className="philosophy-content reveal-right">
      {items.map((item, i) => (
        <div key={i} className={`accordion-item ${active === i ? 'active' : ''}`}>
          <div className="accordion-header" onClick={() => setActive(active === i ? -1 : i)}>
            <h3 className="accordion-title">{item.icon} {item.title}</h3>
            <div className="accordion-icon">
              <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>
          <div className="accordion-body">
            <p>{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <HeroSection
        badge="Thủ công truyền thống Việt Nam"
        title='Gìn Nghề — <em><span style="white-space:nowrap">Giữ Sinh Kế</span></em>'
        subtitle="Từ một chiếc chiếu truyền thống, chúng tôi tạo nên những sản phẩm mang giá trị mới — gìn giữ nghề xưa, lan tỏa bản sắc văn hóa dân tộc và kiến tạo tương lai xanh."
        image="/assets/images/hero_banner.jpg"
        cta={
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            <Link to="/san-pham" className="hero-cta">
              Khám phá sản phẩm
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link
              to="/quet-ma"
              className="hero-cta"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                border: '1.5px solid rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
                <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
                <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
                <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
                <rect x="7" y="7" width="10" height="10" rx="1.5"></rect>
              </svg>
              Quét mã / Xác thực
            </Link>
          </div>
        }
      />

      {/* Quote Banner */}
      <RevealSection className="quote-banner">
        <p className="quote-text">Từ một chiếc chiếu truyền thống, chúng tôi tạo nên những sản phẩm mang giá trị mới – gìn giữ nghề xưa, lan tỏa bản sắc văn hóa dân tộc và kiến tạo tương lai xanh.</p>
      </RevealSection>

      {/* Products */}
      <section className="section section-cream" id="products">
        <div className="section-inner">
          <RevealSection className="section-header">
            <span className="section-label">Sản phẩm thủ công</span>
            <h2 className="section-title">Hệ Sinh Thái Sản Phẩm</h2>
            <div className="section-divider"></div>
            <p className="section-description">Mỗi sản phẩm là sự kết hợp giữa kỹ thuật đan truyền thống và thiết kế hiện đại, mang đến vẻ đẹp tự nhiên cho cuộc sống hàng ngày.</p>
          </RevealSection>
          <div className="products-grid stagger-children">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Before / After Transformation Slider */}
      <section className="section section-cream" style={{ paddingTop: '1rem', paddingBottom: '3rem' }}>
        <div className="section-inner">
          <BeforeAfterSlider />
        </div>
      </section>

      {/* Craft Journey 5-Step Timeline */}
      <section className="section" id="quy-trinh">
        <div className="section-inner">
          <CraftJourneyTimeline />
        </div>
      </section>

      {/* Philosophy */}
      <section className="section section-cream" id="philosophy">
        <div className="section-inner">
          <RevealSection className="section-header">
            <span className="section-label">Triết lý thương hiệu</span>
            <h2 className="section-title">Giá Trị Cốt Lõi</h2>
            <div className="section-divider"></div>
          </RevealSection>
          <div className="philosophy-grid">
            <div className="philosophy-image reveal-left">
              <img src="/assets/images/artisan_weaving.jpg" alt="Nghệ nhân đan chiếu cói" />
            </div>
            <Accordion />
          </div>
        </div>
      </section>

      {/* Social Impact Bento Grid */}
      <section className="section" id="tac-dong">
        <div className="section-inner">
          <SocialImpactBento />
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <RevealSection className="cta-content">
          <span className="section-label" style={{ color: 'var(--accent-gold)' }}>Liên hệ với chúng tôi</span>
          <h2 className="cta-title">Kết Nối Với Chiếu Nẫu</h2>
          <p className="cta-text">Bạn muốn tìm hiểu thêm về sản phẩm hoặc đặt hàng? Hãy liên hệ với chúng tôi qua các kênh bên dưới.</p>
          <SocialLinks />
        </RevealSection>
      </section>
    </>
  )
}
