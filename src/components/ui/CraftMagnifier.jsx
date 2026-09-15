import { useState, useRef, useCallback } from 'react'

export default function CraftMagnifier({
  src,
  alt = 'Chi tiết đan cói thủ công',
  zoomLevel = 2.4,
  className = ''
}) {
  const [active, setActive] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0, relX: 0, relY: 0 })
  const imgRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (!imgRef.current) return
    const rect = imgRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      setActive(false)
      return
    }

    const relX = (x / rect.width) * 100
    const relY = (y / rect.height) * 100

    setPos({ x, y, relX, relY })
    setActive(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setActive(false)
  }, [])

  return (
    <div className={`craft-magnifier-wrapper ${className}`.trim()}>
      <div
        className="craft-magnifier-container"
        ref={imgRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={src}
          alt={alt}
          className="craft-magnifier-base-img"
          loading="lazy"
        />

        {/* Magnifier Lens */}
        {active && (
          <div
            className="craft-magnifier-lens"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              backgroundImage: `url('${src}')`,
              backgroundPosition: `${pos.relX}% ${pos.relY}%`,
              backgroundSize: `${zoomLevel * 100}%`
            }}
          >
            <span className="craft-magnifier-lens-badge">{zoomLevel}x</span>
          </div>
        )}

        <div className="craft-magnifier-hint">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          <span>Rê chuột để soi chi tiết đan cói</span>
        </div>
      </div>
    </div>
  )
}
