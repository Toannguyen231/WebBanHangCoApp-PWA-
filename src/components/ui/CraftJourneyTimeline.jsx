import { useState } from 'react'

const steps = [
  {
    id: 1,
    badge: 'Bước 1',
    title: 'Gieo Trồng & Tuyển Chọn Cói',
    tagline: 'Cánh đồng cói 25 ha ven đầm Ô Loan',
    icon: '🌱',
    detail: 'Tại làng nghề Phú Tân (xã An Cư, huyện Tuy An, tỉnh Phú Yên), cây cói được canh tác tự nhiên ven đầm Ô Loan. Nghệ nhân cắt cói từ 2–3 giờ sáng, tỉ mỉ chọn những cọng cói già dài, thân tròn đều, sợi dai và óng màu phù sa.',
    highlight: '100% nguyên liệu bản địa Phú Tân'
  },
  {
    id: 2,
    badge: 'Bước 2',
    title: 'Chẻ Sợi & Phơi Nắng Gió Xứ Nẫu',
    tagline: 'Thu nhận nắng gió rực rỡ tháng 5 & tháng 7 âm lịch',
    icon: '☀️',
    detail: 'Cói tươi được chẻ thành sợi mảnh bằng lưỡi dao chuyên dụng, sau đó phơi trải dài từ 2 đến 3 nắng to tại thời điểm Phú Yên nắng rực rỡ nhất để sợi cói đạt độ dẻo dai tối ưu và lên màu mật ong tự nhiên.',
    highlight: 'Phơi 2–3 nắng to tự nhiên, không hóa chất'
  },
  {
    id: 3,
    badge: 'Bước 3',
    title: 'Nhuộm Màu Sắc Văn Hóa',
    tagline: 'Sắc đỏ gạch, xanh ngọc & vàng nắng thổ cẩm',
    icon: '🎨',
    detail: 'Những bó cói được nhúng vào nồi nước sôi sục với các tông màu thiên nhiên, lấy cảm hứng từ bảng màu thổ cẩm Ê Đê – M\'nông và nắng cao nguyên, giữ độ bền màu cao mà vẫn an toàn cho sức khỏe.',
    highlight: 'Bảng màu thổ cẩm bản địa & thảo mộc an toàn'
  },
  {
    id: 4,
    badge: 'Bước 4',
    title: 'Đan Tay Thủ Công Truyền Đời',
    tagline: 'Kỹ thuật hơn 100 năm di sản làng nghề',
    icon: '🪵',
    detail: 'Nghệ nhân dùng kỹ thuật đan ô vuông đều tay (basket-weave), đan xoáy ốc đồng tâm (coiling), và đan xòe nan cánh quạt. Từng đường đan đòi hỏi cảm nhận độ đàn hồi sợi cói mà máy dệt công nghiệp không thể thay thế.',
    highlight: '219 hộ gia đình & 550+ thợ thủ công làng nghề'
  },
  {
    id: 5,
    badge: 'Bước 5',
    title: 'Cách Tân Sản Phẩm Đương Đại',
    tagline: 'Cối Nắng Ban Mê, Quạt Thổ Cẩm, Túi Sê-rê-pốk & Thảm Mặt Trời',
    icon: '✨',
    detail: 'Từ chiếc chiếu thô truyền thống, sợi cói Phú Tân được tạo tác thành các dòng sản phẩm thời trang và lifestyle trung–cao cấp, chi trả 200.000₫ tiền công/sản phẩm (tăng giá trị giờ công gấp 11.9 lần).',
    highlight: 'Nâng giá trị tiền công lên 66.667₫/giờ (SDG 1 & 8)'
  }
]

export default function CraftJourneyTimeline() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="craft-journey-section">
      <div className="section-header">
        <span className="section-label">Quy trình thủ công</span>
        <h2 className="section-title">Hành Trình Tinh Hoa Sợi Cói Phú Tân</h2>
        <div className="section-divider" />
        <p className="section-description">
          Từ cây cói mộc mạc bên đầm Ô Loan đến những sản phẩm thủ công tinh xảo trên tay bạn là cả một hành trình gìn giữ văn hóa và kiến tạo sinh kế cho bà con làng nghề.
        </p>
      </div>

      {/* Steps Navigation Bar */}
      <div className="journey-steps-nav">
        {steps.map((step, idx) => (
          <button
            key={step.id}
            type="button"
            className={`journey-step-tab ${activeStep === idx ? 'active' : ''}`}
            onClick={() => setActiveStep(idx)}
          >
            <span className="step-tab-badge">{step.badge}</span>
            <span className="step-tab-title">{step.title}</span>
          </button>
        ))}
      </div>

      {/* Active Step Showcase */}
      <div className="journey-content-card">
        <div className="journey-content-header">
          <div className="journey-step-icon">{steps[activeStep].icon}</div>
          <div>
            <div className="journey-step-tag">{steps[activeStep].tagline}</div>
            <h3 className="journey-step-heading">{steps[activeStep].title}</h3>
          </div>
        </div>

        <p className="journey-step-detail">{steps[activeStep].detail}</p>

        <div className="journey-highlight-pill">
          <span className="pill-dot" />
          {steps[activeStep].highlight}
        </div>
      </div>
    </div>
  )
}
