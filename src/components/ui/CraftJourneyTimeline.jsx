import { useState } from 'react'
import { playWoodTap } from '../../utils/audioEffects'

const steps = [
  {
    id: 1,
    stepNum: '01',
    badge: 'Bước 01',
    title: 'Gieo Trồng & Tuyển Chọn Cói',
    tagline: 'Cánh đồng cói 25 ha ven đầm Ô Loan',
    icon: '🌱',
    image: '/assets/images/hero_social_impact.jpg',
    imageCaption: 'Cánh đồng cói 25 ha ven đầm Ô Loan, xã An Cư',
    detail: 'Tại làng nghề Phú Tân (xã An Cư, huyện Tuy An, tỉnh Phú Yên), cây cói được canh tác tự nhiên ven đầm Ô Loan. Nghệ nhân cắt cói từ 2–3 giờ sáng khi sương sớm còn đọng, tỉ mỉ chọn những cọng cói già đạt độ tuổi, thân tròn đều, sợi dai và óng ả sắc màu phù sa.',
    highlight: '100% nguyên liệu bản địa Phú Yên ven đầm Ô Loan',
    stat: '25 ha vùng nguyên liệu'
  },
  {
    id: 2,
    stepNum: '02',
    badge: 'Bước 02',
    title: 'Chẻ Sợi & Phơi Nắng Gió Xứ Nẫu',
    tagline: 'Thu nhận nắng gió rực rỡ tháng 5 & tháng 7 âm lịch',
    icon: '☀️',
    image: '/assets/images/story_hero.jpg',
    imageCaption: 'Phơi cói tự nhiên dưới nắng vàng óng ả duyên hải',
    detail: 'Cói tươi được chẻ thành sợi mảnh bằng lưỡi dao chuyên dụng của thợ già, sau đó phơi trải dài từ 2 đến 3 nắng to tại thời điểm Phú Yên nắng rực rỡ nhất để sợi cói khô kiệt tự nhiên, đạt độ dẻo dai tối ưu và lên màu mật ong tự nhiên mà không cần hóa chất.',
    highlight: 'Phơi 2–3 nắng to tự nhiên, 0% hóa chất chống mốc',
    stat: '2–3 nắng to tự nhiên'
  },
  {
    id: 3,
    stepNum: '03',
    badge: 'Bước 03',
    title: 'Nhuộm Màu Sắc Văn Hóa',
    tagline: 'Sắc đỏ gạch, xanh ngọc & vàng thổ cẩm Tây Nguyên',
    icon: '🎨',
    image: '/assets/images/hero_care_guide.jpg',
    imageCaption: 'Bảng màu thảo mộc an toàn & sắc màu thổ cẩm',
    detail: 'Những bó cói được nhúng vào nồi nước sôi sục với các tông màu thiên nhiên, lấy cảm hứng từ bảng màu thổ cẩm Ê Đê – M\'nông và nắng cao nguyên. Quy trình nhuộm thủ công gia nhiệt giữ độ bền màu cao, tươi sáng theo năm tháng mà vẫn an toàn tuyệt đối cho sức khỏe.',
    highlight: 'Bảng màu thổ cẩm bản địa & thảo mộc an toàn cho da',
    stat: '100% màu thảo mộc an toàn'
  },
  {
    id: 4,
    stepNum: '04',
    badge: 'Bước 04',
    title: 'Đan Tay Thủ Công Truyền Đời',
    tagline: 'Kỹ thuật hơn 100 năm di sản làng nghề Phú Tân',
    icon: '🪵',
    image: '/assets/images/artisan_weaving.jpg',
    imageCaption: 'Nghệ nhân Phú Tân dệt từng đường nét tỉ mỉ',
    detail: 'Nghệ nhân dùng kỹ thuật đan ô vuông đều tay (basket-weave), đan xoáy ốc đồng tâm (coiling), và đan xòe nan cánh quạt. Từng đường đan đòi hỏi cảm nhận tinh tế về độ đàn hồi của sợi cói mà máy dệt công nghiệp không thể thay thế được.',
    highlight: '219 hộ gia đình & 550+ thợ thủ công làng nghề',
    stat: '550+ nghệ nhân gìn giữ nghề'
  },
  {
    id: 5,
    stepNum: '05',
    badge: 'Bước 05',
    title: 'Cách Tân Sản Phẩm Đương Đại',
    tagline: 'Cối Nắng Ban Mê, Quạt Thổ Cẩm, Túi Sê-rê-pốk & Thảm Mặt Trời',
    icon: '✨',
    image: '/assets/images/hero_banner.jpg',
    imageCaption: 'Bộ sưu tập thời trang & quà tặng phong cách sống',
    detail: 'Từ chiếc chiếu thô truyền thống, sợi cói Phú Tân được tạo tác thành các dòng sản phẩm thời trang và lifestyle trung–cao cấp, chi trả 200.000₫ tiền công/sản phẩm (tăng giá trị giờ công gấp 11.9 lần so với dệt chiếu thô, từ 5.625₫ lên 66.667₫/giờ).',
    highlight: 'Nâng giá trị tiền công lên 66.667₫/giờ (SDG 1 & 8)',
    stat: '11.9x giá trị giờ công thợ'
  }
]

export default function CraftJourneyTimeline() {
  const [activeStep, setActiveStep] = useState(0)

  const handleSelectStep = (idx) => {
    setActiveStep(idx)
    playWoodTap()
  }

  const handlePrev = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))
    playWoodTap()
  }

  const handleNext = () => {
    setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))
    playWoodTap()
  }

  const current = steps[activeStep]

  return (
    <section className="craft-journey-section" aria-label="Quy trình thủ công làng nghề">
      <div className="section-header">
        <span className="section-label">Quy trình thủ công</span>
        <h2 className="section-title">Hành Trình Tinh Hoa Sợi Cói Phú Tân</h2>
        <div className="section-divider" />
        <p className="section-description">
          Từ cây cói mộc mạc bên đầm Ô Loan đến những sản phẩm thủ công tinh xảo trên tay bạn là cả một hành trình gìn giữ văn hóa và kiến tạo sinh kế cho bà con làng nghề.
        </p>
      </div>

      {/* Steps Navigation Bar */}
      <div className="journey-steps-nav" role="tablist" aria-label="Các bước quy trình">
        {steps.map((step, idx) => (
          <button
            key={step.id}
            type="button"
            role="tab"
            aria-selected={activeStep === idx}
            className={`journey-nav-btn ${activeStep === idx ? 'active' : ''}`}
            onClick={() => handleSelectStep(idx)}
          >
            <div className="journey-nav-icon">{step.icon}</div>
            <div className="journey-nav-meta">
              <span className="journey-nav-step">{step.badge}</span>
              <span className="journey-nav-name">{step.title}</span>
            </div>
            {activeStep === idx && <span className="journey-nav-indicator" />}
          </button>
        ))}
      </div>

      {/* Active Step Showcase Card */}
      <div className="journey-feature-card">
        <div className="journey-card-content">
          {/* Left: Text Information */}
          <div className="journey-info-col">
            <div className="journey-card-header-row">
              <div className="journey-card-badge">
                <span className="journey-badge-dot" />
                {current.badge} / 05
              </div>
              <span className="journey-card-stat-pill">{current.stat}</span>
            </div>

            <span className="journey-card-tagline">{current.tagline}</span>
            <h3 className="journey-card-title">{current.title}</h3>

            <p className="journey-card-detail">{current.detail}</p>

            <div className="journey-card-highlight">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{current.highlight}</span>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="journey-actions-row">
              <button
                type="button"
                className="journey-step-btn prev"
                onClick={handlePrev}
                title="Bước trước"
                aria-label="Bước trước"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                <span>Bước trước</span>
              </button>

              <span className="journey-step-counter">
                <strong>0{activeStep + 1}</strong> / 05
              </span>

              <button
                type="button"
                className="journey-step-btn next"
                onClick={handleNext}
                title="Bước tiếp theo"
                aria-label="Bước tiếp theo"
              >
                <span>Bước sau</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: Rich Visual Showcase */}
          <div className="journey-visual-col">
            <div className="journey-image-wrapper">
              <img
                src={current.image}
                alt={current.title}
                className="journey-showcase-img"
                loading="lazy"
              />
              <div className="journey-image-gradient" />
              <div className="journey-image-caption">
                <span className="caption-pin">📍</span>
                <span>{current.imageCaption}</span>
              </div>
              <div className="journey-big-icon-floating">
                {current.icon}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="journey-card-progress" aria-hidden="true">
          <div
            className="journey-card-progress-bar"
            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  )
}

