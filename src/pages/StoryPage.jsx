import { Link } from 'react-router-dom'
import HeroSection from '../components/ui/HeroSection'
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider'
import ArtisanSeal from '../components/ui/ArtisanSeal'
import { useCounter, useScrollReveal } from '../hooks/useAnimations'

function Reveal({ className, children }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className || ''}`}>{children}</div>
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

export default function StoryPage() {
  const founders = [
    {
      name: 'Lê Cao Trí',
      birthYear: '2003',
      role: 'Trưởng nhóm — Hoạt động chung & Tài chính',
      background: 'Học viên Thạc sĩ Quản trị kinh doanh. Tác giả nhiều bài báo và công trình nghiên cứu về hành vi người tiêu dùng và các vấn đề môi trường trên các tạp chí khoa học uy tín.',
      icon: '📊'
    },
    {
      name: 'Nguyễn Minh Anh',
      birthYear: '2005',
      role: 'Quản lý Nhân sự & Thương hiệu',
      background: 'Xây dựng thương hiệu & Quản trị thời trang (ĐH Văn Lang). Nhiều năm kinh nghiệm trong kỹ thuật may đo, tự tay thực hiện các bộ sưu tập thời trang mang dấu ấn cá nhân.',
      icon: '👗'
    },
    {
      name: 'Phạm Hà',
      birthYear: '2006',
      role: 'Quản lý Marketing',
      background: 'Chuyên ngành Marketing. Sinh trưởng trong gia đình có truyền thống làm nghề chiếu cói 3 đời tại làng Phú Tân, am hiểu sâu sắc về chất liệu, quy trình dệt và câu chuyện di sản.',
      icon: '📣'
    },
    {
      name: 'Võ Thùy Thanh Thư',
      birthYear: '2006',
      role: 'Nhân viên R&D & Phát triển sản phẩm',
      background: 'Chuyên ngành Marketing. Từng làm việc tại Quỹ Ươm Mầm Xanh — tổ chức hỗ trợ và phát triển các dự án khởi nghiệp bền vững và trách nhiệm xã hội.',
      icon: '🔬'
    },
    {
      name: 'Nguyễn Ngọc Toàn',
      birthYear: '2006',
      role: 'Quản lý Kỹ thuật & QC',
      background: 'Kỹ thuật phần mềm. Phụ trách hạ tầng công nghệ số, website thương mại điện tử và số hóa quy trình kiểm soát chất lượng (QC) phối hợp chặt chẽ cùng nghệ nhân làng nghề.',
      icon: '💻'
    }
  ]

  const advisors = [
    {
      name: 'PGS. TS. Bùi Huy Khôi',
      title: 'Trưởng bộ môn Marketing, ĐH Công nghiệp TP.HCM',
      role: 'Giảng viên hướng dẫn — Cố vấn Quản trị & Marketing',
      contact: 'buihuykhoi@iuh.edu.vn'
    },
    {
      name: 'ThS. Nguyễn Tấn Hoàng Hải',
      title: 'Giảng viên Trường Đại học Luật TP.HCM',
      role: 'Cố vấn Pháp lý & Tuân thủ doanh nghiệp',
      contact: 'nthoanghai@gmail.com'
    },
    {
      name: 'Nghệ nhân Trần Thị Mỹ Trang',
      title: 'Quản lý điều hành HTX Chiếu cói An Cư, Phú Yên',
      role: 'Cố vấn Kỹ thuật Sản xuất & Kết nối Nghệ nhân',
      contact: 'HTX An Cư — Tuy An'
    },
    {
      name: 'Cử nhân Nguyễn Thị Bích Ngọc',
      title: 'Thiết kế Thời trang, Trường ĐH Công nghiệp TP.HCM',
      role: 'Cố vấn Thẩm mỹ & Thiết kế sản phẩm',
      contact: 'bichngocnn02@gmail.com'
    },
    {
      name: 'Bà Nguyễn Thị Thu Thủy',
      title: 'Thương lái kinh doanh chiếu cói tại Phú Yên',
      role: 'Cố vấn Thị trường & Kênh phân phối truyền thống',
      contact: 'Thị trường Phú Yên'
    }
  ]

  const coreFiveQualities = [
    {
      badge: '1. Chất Liệu',
      title: 'Cói Phú Tân nguyên bản',
      desc: 'Sợi cói được chọn từ cánh đồng 25 ha ven đầm Ô Loan, phơi 2–3 nắng to dẻo dai và lên sắc mật ong tự nhiên. Không hóa chất, không pha nhựa PE/PP.'
    },
    {
      badge: '2. Chất Nghề',
      title: 'Đan tay 100% truyền đời',
      desc: 'Mỗi sản phẩm đi qua bàn tay nghệ nhân làng nghề hơn 100 năm: kỹ thuật đan lưới ô vuông, đan xoáy ốc coiling, đan xòe nan mà máy móc không thể thay thế.'
    },
    {
      badge: '3. Chất Riêng',
      title: 'Mỗi sản phẩm là độc bản',
      desc: 'Từng tác phẩm có sai số thủ công vi tế — đó không phải lỗi mà là "dấu vân tay" của nghệ nhân, khiến mỗi chiếc túi là phiên bản duy nhất trên đời.'
    },
    {
      badge: '4. Chất Văn Hóa',
      title: 'Mỗi món đồ là một câu chuyện',
      desc: 'Gắn liền với hình tượng sông Sê-rê-pốk chảy ngược, nắng Ban Mê, thổ cẩm Ê Đê – M\'nông, biểu tượng mặt trời tụ sinh khí và nét đẹp xứ Nẫu Phú Yên.'
    },
    {
      badge: '5. Chất Bền Vững',
      title: 'Nuôi sống cộng đồng bản địa',
      desc: 'Nguyên liệu tự phân hủy sinh học, quy trình phát thải thấp; đồng thời tái phân bổ 200.000₫ tiền công/sản phẩm, nâng giá trị giờ lao động gấp 11.9 lần.'
    }
  ]

  return (
    <>
      <HeroSection
        badge="Câu chuyện di sản"
        title='Hành Trình Của <em>Chiếu Nẫu</em>'
        subtitle="Khởi nguồn từ Làng nghề dệt chiếu cói Phú Tân hơn 100 năm tuổi ven đầm Ô Loan, Phú Yên — chúng tôi tiếp nối ngọn lửa cha ông để kiến tạo sinh kế xanh bền vững."
        image="/assets/images/story_hero.jpg"
        inner
      />

      {/* Narrative Section 1: Làng nghề Phú Tân */}
      <section className="section">
        <div className="section-inner">
          <div className="narrative-section">
            <div className="narrative-image reveal-left">
              <img src="/assets/images/story_hero.jpg" alt="Đồng cói Phú Tân ven đầm Ô Loan" />
            </div>
            <div className="narrative-text reveal-right">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <ArtisanSeal size={64} />
                <h3 style={{ margin: 0 }}>Làng nghề Phú Tân — Hơn 100 năm bên đầm Ô Loan</h3>
              </div>
              <p>
                Tại Phú Yên, nghề dệt chiếu truyền thống không chỉ là sinh kế mà còn gắn liền mật thiết với đời sống văn hóa xứ Nẫu. <strong>Làng nghề dệt chiếu cói Phú Tân, xã An Cư, huyện Tuy An, tỉnh Phú Yên</strong> đã tồn tại hơn một thế kỷ bên cạnh thắng cảnh quốc gia đầm Ô Loan và được UBND tỉnh Phú Yên chính thức công nhận làng nghề truyền thống vào năm 2013.
              </p>
              <p>
                Theo tạp chí Làng nghề Việt (2024), tại đây hiện có <strong>219 hộ gia đình làm nghề</strong> với hơn <strong>550 lao động trực tiếp</strong> gắn bó bên cánh đồng cói rộng 25 ha. Từng cọng cói được người dân đi cắt từ 2–3 giờ sáng trong vùng sình mặn, chẻ đôi, phơi nắng gió rực rỡ và dệt nên những tấm chiếu bền chắc, thấm đẫm tình đất tình người.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section 2: Thách thức & Sự ra đời của Chiếu Nẫu */}
      <section className="section section-sage">
        <div className="section-inner">
          <div className="narrative-section reverse">
            <div className="narrative-image reveal-right">
              <img src="/assets/images/artisan_weaving.jpg" alt="Nghệ nhân dệt chiếu Phú Tân" />
            </div>
            <div className="narrative-text reveal-left">
              <h3>Thách thức hiện tại & Lối ra cho sinh kế</h3>
              <p>
                Theo Báo Thanh Niên ghi nhận, để làm ra 3 đôi chiếu thủ công cần tới 8 giờ lao động cật lực nhưng tiền công người thợ nhận được chỉ khoảng <strong>45.000 đồng/ngày</strong> (tương đương 5.625 đồng/giờ). Giá trị kinh tế quá thấp so với công sức khiến thế hệ trẻ dần rời quê, nguy cơ thất truyền một di sản quý báu.
              </p>
              <p>
                Tham gia <strong>Cuộc thi Ý tưởng Khởi nghiệp 2026 (BizSpark Initiative)</strong> tại Nhóm 2 – Cộng đồng bền vững & Thực hành kinh tế tuần hoàn, dự án <strong>CHIẾU NẪU: Gìn Nghề – Giữ Sinh Kế</strong> được thành lập bởi nhóm 5 bạn trẻ tâm huyết dưới sự hướng dẫn của PGS. TS. Bùi Huy Khôi (ĐH Công nghiệp TP.HCM).
              </p>
              <p>
                Chiếu Nẫu lựa chọn con đường không cạnh tranh bằng chiếu đại trà giá rẻ, mà ứng dụng kỹ thuật thủ công đan cói truyền đời để kiến tạo các dòng sản phẩm thời trang & lifestyle trung–cao cấp: <em>Cối Nắng Ban Mê, Quạt Cói Thổ Cẩm, Túi Bán Nguyệt Sê-rê-pốk, Thảm Mặt Trời</em>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Chất Cốt Lõi */}
      <section className="section section-cream">
        <div className="section-inner">
          <Reveal className="section-header">
            <span className="section-label">Đặc tính sản phẩm</span>
            <h2 className="section-title">"5 Chất" Làm Nên Giá Trị Chiếu Nẫu</h2>
            <div className="section-divider"></div>
            <p className="section-description">
              Định vị giá trị cốt lõi giúp Chiếu Nẫu chinh phục phân khúc khách hàng yêu văn hóa và lối sống xanh.
            </p>
          </Reveal>

          <div className="values-grid stagger-children">
            {coreFiveQualities.map((item, idx) => (
              <div key={idx} className="value-card" style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-warm)', textTransform: 'uppercase' }}>
                  {item.badge}
                </span>
                <h3 style={{ margin: '8px 0', fontSize: '1.2rem', color: 'var(--primary-dark)' }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After Transformation */}
      <section className="section" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
        <div className="section-inner">
          <Reveal className="section-header">
            <span className="section-label">Đổi mới sáng tạo</span>
            <h2 className="section-title">Chuyển Mình Từ Chiếu Thô Đến Phụ Kiện Cao Cấp</h2>
            <div className="section-divider"></div>
          </Reveal>
          <BeforeAfterSlider />
        </div>
      </section>

      {/* Đội ngũ sáng lập */}
      <section className="section section-cream">
        <div className="section-inner">
          <Reveal className="section-header">
            <span className="section-label">Con người kiến tạo</span>
            <h2 className="section-title">Nhóm Đồng Sáng Lập</h2>
            <div className="section-divider"></div>
            <p className="section-description">
              Sự kết hợp giữa tri thức học thuật, kỹ thuật may đo thời trang, truyền thống gia đình 3 đời làm cói và năng lực công nghệ số.
            </p>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            {founders.map((member, i) => (
              <div
                key={i}
                className="value-card"
                style={{
                  textAlign: 'left',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '2rem' }}>{member.icon}</span>
                    <span style={{ fontSize: '0.8rem', padding: '3px 10px', borderRadius: '12px', backgroundColor: 'rgba(45,90,45,0.1)', color: 'var(--primary)', fontWeight: 600 }}>
                      Sinh năm {member.birthYear}
                    </span>
                  </div>
                  <h3 style={{ margin: '0 0 6px 0', fontSize: '1.25rem', color: 'var(--primary-dark)' }}>{member.name}</h3>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-warm)', marginBottom: '12px' }}>
                    {member.role}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {member.background}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hội đồng Cố vấn */}
      <section className="section">
        <div className="section-inner">
          <Reveal className="section-header">
            <span className="section-label">Nền tảng chuyên môn</span>
            <h2 className="section-title">Hội Đồng Cố Vấn & Đồng Hành</h2>
            <div className="section-divider"></div>
            <p className="section-description">
              Hội đồng cố vấn phủ đủ 5 mắt xích thiết yếu: Quản trị – Marketing, Pháp lý, Sản xuất làng nghề, Thẩm mỹ thiết kế và Thị trường.
            </p>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            {advisors.map((adv, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '1.5rem',
                  borderRadius: '14px',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {adv.role}
                  </span>
                  <h4 style={{ margin: '6px 0', fontSize: '1.15rem', color: 'var(--primary-dark)' }}>{adv.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {adv.title}
                  </p>
                </div>
                <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px dashed #eee', fontSize: '0.8rem', color: '#888' }}>
                  {adv.contact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thống kê làng nghề */}
      <section className="section section-dark">
        <div className="section-inner">
          <div className="stats-grid visible">
            <StatItem target={219} suffix=" hộ" label="Gia đình làng nghề Phú Tân" />
            <StatItem target={550} suffix="+" label="Lao động dệt chiếu trực tiếp" />
            <StatItem target={25} suffix=" ha" label="Vùng nguyên liệu cói Ô Loan" />
            <StatItem target={100} suffix="+ năm" label="Di sản làng nghề truyền thống" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-content visible">
          <span className="section-label" style={{ color: 'var(--accent-gold)' }}>Bộ sưu tập di sản</span>
          <h2 className="cta-title">Khám Phá Sản Phẩm Chiếu Nẫu</h2>
          <p className="cta-text">Mỗi chiếc giỏ, chiếc quạt, tấm thảm là một tác phẩm chứa đựng tâm huyết của nghệ nhân Phú Tân và ước mơ của người trẻ.</p>
          <Link to="/san-pham" className="hero-cta" style={{ opacity: 1, transform: 'none' }}>
            Xem bộ sưu tập
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </>
  )
}
