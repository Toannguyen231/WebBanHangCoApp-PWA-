import { useState, useRef, useCallback, useEffect } from 'react'

export default function BeforeAfterSlider({
  beforeImage = '/assets/images/artisan_weaving.jpg',
  afterImage = '/assets/images/hero_banner.jpg',
  beforeLabel = 'Chiếu truyền thống nguyên bản',
  afterLabel = 'Bộ sưu tập cách tân đương đại',
  beforeDesc = 'Kỹ thuật dệt chiếu cói thủ công hơn 100 năm',
  afterDesc = 'Túi xách, lót nồi decor & phụ kiện xanh bền vững'
}) {
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.min(Math.max((x / rect.width) * 100, 5), 95)
    setSliderPos(percent)
  }, [])

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }, [isDragging, handleMove])

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }, [isDragging, handleMove])

  const handleStopDrag = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleStopDrag)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', handleStopDrag)
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleStopDrag)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleStopDrag)
    }
  }, [isDragging, handleMouseMove, handleTouchMove, handleStopDrag])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      setSliderPos(prev => Math.max(prev - 5, 5))
    } else if (e.key === 'ArrowRight') {
      setSliderPos(prev => Math.min(prev + 5, 95))
    }
  }

  return (
    <div className="before-after-wrapper">
      <div className="before-after-header">
        <div className="before-after-tag">
          <span className="craft-badge-dot" />
          Sự Chuyển Mình Của Làng Nghề
        </div>
        <h3 className="before-after-title">Từ Chiếu Xưa Đến Sáng Tạo Nay</h3>
        <p className="before-after-subtitle">
          Kéo thanh trượt để chứng kiến hành trình hồi sinh nghề cói — giữ trọn kỹ thuật thủ công, nâng tầm hình thái đương đại.
        </p>
      </div>

      <div
        className="before-after-container"
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="slider"
        aria-valuenow={Math.round(sliderPos)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Thanh so sánh trước và sau chuyển đổi làng nghề"
      >
        {/* After (Bottom image - Full) */}
        <div className="before-after-layer after-layer">
          <img src={afterImage} alt={afterLabel} loading="lazy" />
          <div className="layer-overlay layer-overlay--after" />
          <div className="layer-badge layer-badge--after">
            <span className="layer-badge-tag">Hôm nay</span>
            <strong>{afterLabel}</strong>
            <small>{afterDesc}</small>
          </div>
        </div>

        {/* Before (Top image - Clipped by sliderPos) */}
        <div
          className="before-after-layer before-layer"
          style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
        >
          <img src={beforeImage} alt={beforeLabel} loading="lazy" />
          <div className="layer-overlay layer-overlay--before" />
          <div className="layer-badge layer-badge--before">
            <span className="layer-badge-tag">Truyền thống</span>
            <strong>{beforeLabel}</strong>
            <small>{beforeDesc}</small>
          </div>
        </div>

        {/* Slider Divider Bar */}
        <div
          className="before-after-handle-line"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="before-after-handle-button">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M8.5 7l-5 5 5 5V7zm7 0v10l5-5-5-5z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="before-after-instruction">
        <span>◄ Kéo thả để so sánh sự thay đổi ►</span>
      </div>
    </div>
  )
}
