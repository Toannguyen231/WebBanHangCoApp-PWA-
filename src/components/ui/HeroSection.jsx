import { useParallax } from '../../hooks/useAnimations'
import ArtisanSeal from './ArtisanSeal'

export default function HeroSection({
  badge,
  title,
  subtitle,
  cta,
  image,
  bgImage,
  inner = false,
  className = ''
}) {
  const bgRef = useParallax(0.4)
  const heroImage = image || bgImage || '/assets/images/hero_banner.jpg'

  return (
    <section className={`hero ${inner ? 'hero-inner' : ''} ${className}`.trim()}>
      <div className="hero-bg" ref={bgRef} style={{ backgroundImage: `url('${heroImage}')` }}></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        {badge && <div className="hero-badge">{badge}</div>}
        {typeof title === 'string' ? (
          <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: title }} />
        ) : (
          <h1 className="hero-title">{title}</h1>
        )}
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        {cta && cta}
      </div>
      {!inner && (
        <>
          <div className="hero-seal-badge">
            <ArtisanSeal size={105} />
          </div>
          <div className="hero-scroll-indicator">
            <span>Cuộn xuống</span>
            <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
          </div>
        </>
      )}
    </section>
  )
}

