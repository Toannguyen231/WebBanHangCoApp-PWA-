import { useEffect, useMemo, useState, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCustomerAuth } from '../contexts/CustomerAuthContext'

/* ─── tiny eye icon svg ─── */
const EyeIcon = ({ open }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
)

/* ─── password strength helper ─── */
function getPasswordStrength(pw) {
  if (!pw) return { level: 0, label: '', color: '' }
  let score = 0
  if (pw.length >= 6) score++
  if (pw.length >= 10) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++

  if (score <= 1) return { level: 1, label: 'Yếu', color: '#ef4444' }
  if (score <= 2) return { level: 2, label: 'Trung bình', color: '#f59e0b' }
  if (score <= 3) return { level: 3, label: 'Khá', color: '#22c55e' }
  return { level: 4, label: 'Mạnh', color: '#16a34a' }
}

/* ─── floating decorative dots ─── */
function FloatingDots() {
  return (
    <div className="auth-floating-dots" aria-hidden="true">
      {[...Array(6)].map((_, i) => (
        <span key={i} className={`auth-dot auth-dot--${i + 1}`} />
      ))}
    </div>
  )
}

/* ─── Social Login Buttons ─── */
function SocialLoginButtons({ onSocialLogin, disabled }) {
  return (
    <div className="auth-social-section">
      <div className="auth-divider-text">
        <span>hoặc đăng nhập nhanh</span>
      </div>
      <div className="auth-social-buttons">
        <button
          type="button"
          className="auth-social-btn auth-social-btn--google"
          onClick={() => onSocialLogin('google')}
          disabled={disabled}
          aria-label="Đăng nhập bằng Google"
        >
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>
        <button
          type="button"
          className="auth-social-btn auth-social-btn--facebook"
          onClick={() => onSocialLogin('facebook')}
          disabled={disabled}
          aria-label="Đăng nhập bằng Facebook"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </button>
      </div>
      <p className="auth-social-hint">Đăng nhập chỉ với 1 chạm — không cần mật khẩu</p>
    </div>
  )
}

export default function AccountPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { customer, isCustomer, loading, login, register, loginSocial, loginDemo, logout } = useCustomerAuth()
  const initialMode = location.pathname === '/dang-ky' ? 'register' : 'login'
  const [mode, setMode] = useState(initialMode)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [loginMethod, setLoginMethod] = useState('email') // 'email' or 'phone'
  const [rememberMe, setRememberMe] = useState(() => {
    return localStorage.getItem('chieunau_remember') === 'true'
  })
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem('chieunau_saved_login')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        return { name: '', email: parsed.email || '', phone: parsed.phone || '', password: '' }
      } catch { /* ignore */ }
    }
    return { name: '', email: '', phone: '', password: '' }
  })

  useEffect(() => {
    setMode(initialMode)
    setError('')
    setSuccess('')
  }, [initialMode])

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const title = useMemo(() => mode === 'register' ? 'Tạo Tài Khoản' : 'Đăng Nhập', [mode])
  const subtitle = useMemo(() =>
    mode === 'register'
      ? 'Tạo tài khoản để lưu thông tin và đặt hàng nhanh hơn.'
      : 'Đăng nhập để quản lý đơn hàng và thông tin cá nhân.',
    [mode]
  )

  const pwStrength = useMemo(() => getPasswordStrength(form.password), [form.password])

  const handleChange = useCallback((event) => {
    setForm(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      if (mode === 'register') {
        await register(form)
        setSuccess('Đăng ký thành công! Đang chuyển hướng...')
      } else {
        const identifier = loginMethod === 'phone' ? form.phone : form.email
        await login(identifier, form.password)
        setSuccess('Đăng nhập thành công!')

        // Save login info if remember me is checked
        if (rememberMe) {
          localStorage.setItem('chieunau_remember', 'true')
          localStorage.setItem('chieunau_saved_login', JSON.stringify({
            email: loginMethod === 'email' ? form.email : '',
            phone: loginMethod === 'phone' ? form.phone : ''
          }))
        } else {
          localStorage.removeItem('chieunau_remember')
          localStorage.removeItem('chieunau_saved_login')
        }
      }
      setTimeout(() => navigate('/tai-khoan'), 400)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleSocialLogin = async (provider) => {
    setError('')
    setSubmitting(true)
    const pName = provider === 'google' ? 'Google' : 'Facebook'
    setSuccess(`Đang kết nối nhanh với ${pName}...`)
    try {
      await loginSocial(provider)
      setSuccess(`Đăng nhập qua ${pName} thành công! Đang chuyển hướng...`)
      setTimeout(() => navigate('/tai-khoan'), 400)
    } catch (err) {
      setError(err.message || `Đăng nhập qua ${pName} thất bại. Vui lòng thử lại.`)
    } finally {
      setSubmitting(false)
    }
  }

  const handleQuickDemoLogin = async () => {
    setError('')
    setSubmitting(true)
    setSuccess('Đang xác thực siêu tốc với tài khoản mẫu...')
    try {
      await loginDemo()
      setSuccess('Đăng nhập siêu tốc thành công! Đang chuyển hướng...')
      setTimeout(() => navigate('/tai-khoan'), 400)
    } catch (err) {
      setError(err.message || 'Không thể đăng nhập nhanh lúc này.')
    } finally {
      setSubmitting(false)
    }
  }

  const switchMode = (nextMode) => {
    setMode(nextMode)
    setError('')
    setSuccess('')
    setShowPw(false)
    navigate(nextMode === 'register' ? '/dang-ky' : '/dang-nhap', { replace: true })
  }

  /* ─── Loading ─── */
  if (loading) {
    return (
      <main className="auth-page">
        <div className="auth-card">
          <div className="auth-loading-skeleton">
            <div className="skeleton-circle" />
            <div className="skeleton-line w60" />
            <div className="skeleton-line w80" />
            <div className="skeleton-line w40" />
          </div>
        </div>
      </main>
    )
  }

  /* ─── Profile dashboard ─── */
  if (isCustomer) {
    return (
      <main className="auth-page">
        <FloatingDots />
        <section className={`auth-card auth-card--profile ${mounted ? 'auth-card--visible' : ''}`}>
          {/* Header */}
          <div className="auth-profile-header">
            <div className="auth-profile-avatar">
              {customer.avatar ? (
                <img src={customer.avatar} alt={customer.name} />
              ) : (
                <span>{customer.name?.charAt(0)?.toUpperCase() || 'K'}</span>
              )}
            </div>
            <div className="auth-profile-badge">
              <span className="auth-badge-dot" />
              <span>Tài khoản của bạn</span>
            </div>
            <h1 className="auth-profile-title">Xin chào, {customer.name}! 👋</h1>
            <p className="auth-profile-subtitle">Chào mừng bạn đã trở lại với Chiếu Nẫu</p>
          </div>

          {/* User Info */}
          <div className="auth-profile-info">
            <div className="auth-info-item">
              <div className="auth-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="auth-info-text">
                <span className="auth-info-label">Email</span>
                <strong className="auth-info-value">{customer.email || 'Chưa cập nhật'}</strong>
              </div>
            </div>

            <div className="auth-info-item">
              <div className="auth-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <div className="auth-info-text">
                <span className="auth-info-label">Số điện thoại</span>
                <strong className="auth-info-value">{customer.phone || 'Chưa cập nhật'}</strong>
              </div>
            </div>

            {customer.address && (
              <div className="auth-info-item">
                <div className="auth-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="auth-info-text">
                  <span className="auth-info-label">Địa chỉ nhận hàng</span>
                  <strong className="auth-info-value">{customer.address}</strong>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions Nav */}
          <div className="auth-profile-nav">
            <Link to="/san-pham" className="auth-nav-card auth-nav-card--primary">
              <div className="auth-nav-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
              <div className="auth-nav-text">
                <strong className="auth-nav-title">Tiếp tục mua sắm</strong>
                <span className="auth-nav-desc">Khám phá bộ sưu tập chiếu thủ công & quà tặng</span>
              </div>
              <div className="auth-nav-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="18" height="18">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </Link>

            <Link to="/quet-ma" className="auth-nav-card">
              <div className="auth-nav-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
                  <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
                  <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
                  <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
                  <rect x="7" y="7" width="10" height="10" rx="1.5"/>
                </svg>
              </div>
              <div className="auth-nav-text">
                <strong className="auth-nav-title">Quét mã & Xác thực sản phẩm</strong>
                <span className="auth-nav-desc">Tra cứu nguồn gốc và bảo hành làng nghề</span>
              </div>
              <div className="auth-nav-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="18" height="18">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </Link>
          </div>

          {/* Logout Action */}
          <div className="auth-profile-footer">
            <button type="button" className="auth-logout-btn" onClick={logout}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              <span>Đăng xuất tài khoản</span>
            </button>
          </div>
        </section>
      </main>
    )
  }

  /* ─── Login / Register form ─── */
  return (
    <main className="auth-page">
      <FloatingDots />
      <section className={`auth-card ${mounted ? 'auth-card--visible' : ''}`}>
        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo-mark" style={{ overflow: 'hidden', padding: '3px', background: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
            <img src="/logo.png" alt="Chiếu Nẫu Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
          </div>
          <span className="section-label">Tài khoản khách hàng</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        {/* Tabs */}
        <div className="auth-tabs" role="tablist" aria-label="Chọn đăng nhập hoặc đăng ký">
          <button
            className={mode === 'login' ? 'active' : ''}
            onClick={() => switchMode('login')}
            type="button"
            role="tab"
            aria-selected={mode === 'login'}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
            Đăng nhập
          </button>
          <button
            className={mode === 'register' ? 'active' : ''}
            onClick={() => switchMode('register')}
            type="button"
            role="tab"
            aria-selected={mode === 'register'}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
            Đăng ký
          </button>
          <div className={`auth-tab-slider ${mode === 'register' ? 'auth-tab-slider--right' : ''}`} />
        </div>

        {/* Quick 1-touch Demo Access */}
        {mode === 'login' && (
          <div className="auth-quick-demo-container">
            <button
              type="button"
              className="auth-quick-demo-card"
              onClick={handleQuickDemoLogin}
              disabled={submitting}
              title="Đăng nhập ngay chỉ với 1 chạm"
            >
              <div className="auth-quick-demo-badge">
                <span className="auth-quick-badge-pulse" />
                ⚡ 1 CHẠM SIÊU TỐC
              </div>
              <div className="auth-quick-demo-body">
                <div className="auth-quick-demo-avatar">
                  <span>NT</span>
                </div>
                <div className="auth-quick-demo-meta">
                  <div className="auth-quick-demo-name">Đăng nhập tài khoản mẫu</div>
                  <div className="auth-quick-demo-sub">Nguyễn Ngọc Toàn • 0909055594</div>
                </div>
                <div className="auth-quick-demo-arrow">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Social Login (login mode only) */}
        {mode === 'login' && (
          <SocialLoginButtons onSocialLogin={handleSocialLogin} disabled={submitting} />
        )}

        {/* Messages */}
        {error && (
          <div className="auth-message auth-message--error">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            {error}
          </div>
        )}
        {success && (
          <div className="auth-message auth-message--success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            {success}
          </div>
        )}

        {/* Login Method Toggle (login mode only) */}
        {mode === 'login' && (
          <div className="auth-login-method-toggle">
            <button
              type="button"
              className={`auth-method-btn ${loginMethod === 'email' ? 'active' : ''}`}
              onClick={() => setLoginMethod('email')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Email
            </button>
            <button
              type="button"
              className={`auth-method-btn ${loginMethod === 'phone' ? 'active' : ''}`}
              onClick={() => setLoginMethod('phone')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              Số điện thoại
            </button>
          </div>
        )}

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} autoComplete="on">
          {mode === 'register' && (
            <div className="auth-field">
              <label htmlFor="auth-name">Họ và tên</label>
              <div className="auth-input-wrap">
                <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <input
                  id="auth-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nguyễn Văn A"
                  required
                  autoComplete="name"
                />
              </div>
            </div>
          )}

          {/* Login: show email or phone based on toggle */}
          {mode === 'login' && loginMethod === 'email' && (
            <div className="auth-field">
              <label htmlFor="auth-email">Email</label>
              <div className="auth-input-wrap">
                <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <input
                  id="auth-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  required
                  autoComplete="username"
                />
              </div>
            </div>
          )}

          {mode === 'login' && loginMethod === 'phone' && (
            <div className="auth-field">
              <label htmlFor="auth-phone-login">Số điện thoại</label>
              <div className="auth-input-wrap">
                <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                <input
                  id="auth-phone-login"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="0901234567"
                  required
                  autoComplete="tel"
                  inputMode="numeric"
                  pattern="[0-9]{10,11}"
                />
              </div>
            </div>
          )}

          {/* Register: always show email */}
          {mode === 'register' && (
            <div className="auth-field">
              <label htmlFor="auth-email">Email</label>
              <div className="auth-input-wrap">
                <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <input
                  id="auth-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>
          )}

          {mode === 'register' && (
            <div className="auth-field">
              <label htmlFor="auth-phone">Số điện thoại <span className="auth-optional">(tuỳ chọn)</span></label>
              <div className="auth-input-wrap">
                <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                <input
                  id="auth-phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="0901234567"
                  autoComplete="tel"
                />
              </div>
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="auth-password">Mật khẩu</label>
            <div className="auth-input-wrap">
              <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              <input
                id="auth-password"
                name="password"
                type={showPw ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                placeholder="Tối thiểu 6 ký tự"
                required
                minLength="6"
                autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
              />
              <button
                type="button"
                className="auth-pw-toggle"
                onClick={() => setShowPw(!showPw)}
                tabIndex={-1}
                aria-label={showPw ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                <EyeIcon open={showPw} />
              </button>
            </div>

            {/* Password strength (register only) */}
            {mode === 'register' && form.password && (
              <div className="auth-pw-strength">
                <div className="auth-pw-bar">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className={`auth-pw-segment ${i <= pwStrength.level ? 'active' : ''}`}
                      style={i <= pwStrength.level ? { background: pwStrength.color } : {}}
                    />
                  ))}
                </div>
                <span style={{ color: pwStrength.color }}>{pwStrength.label}</span>
              </div>
            )}
          </div>

          {/* Remember me (login only) */}
          {mode === 'login' && (
            <label className="auth-remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="auth-checkbox-custom">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="12" height="12">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              Nhớ đăng nhập
            </label>
          )}

          <button
            type="submit"
            className="auth-btn auth-btn--submit"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="auth-spinner" />
                Đang xử lý...
              </>
            ) : (
              <>
                {title}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </>
            )}
          </button>
        </form>

        {/* Footer links */}
        <div className="auth-footer">
          {mode === 'login' ? (
            <p>Chưa có tài khoản? <button type="button" onClick={() => switchMode('register')}>Đăng ký ngay</button></p>
          ) : (
            <p>Đã có tài khoản? <button type="button" onClick={() => switchMode('login')}>Đăng nhập</button></p>
          )}
        </div>
      </section>
    </main>
  )
}

