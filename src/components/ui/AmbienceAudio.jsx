import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SOUNDSCAPES = {
  'lang-nghe': {
    id: 'lang-nghe',
    title: 'Nhịp Thoi Làng Nghề',
    subtitle: 'Tiếng thoi dệt cửi gỗ & gió lay đồng cói',
    icon: '🌾',
    file: '/assets/audio/lang-nghe-ambience.wav',
    badge: 'Trang chủ & Sản phẩm'
  },
  'di-san': {
    id: 'di-san',
    title: 'Giai Điệu Di Sản Xứ Nẫu',
    subtitle: 'Khúc ca ngũ cung âm hưởng đàn tranh & đàn đá',
    icon: '🎶',
    file: '/assets/audio/giai-dieu-di-san.wav',
    badge: 'Câu chuyện & Cẩm nang'
  },
  'o-loan': {
    id: 'o-loan',
    title: 'Bình Minh Đầm Ô Loan',
    subtitle: 'Sóng nước vỗ mạn thuyền & sinh kế sớm mai',
    icon: '🛶',
    file: '/assets/audio/sinh-ke-o-loan.wav',
    badge: 'Tác động xã hội'
  }
}

// Xác định âm thanh theo từng trang
function getSoundscapeForRoute(pathname) {
  const p = pathname.toLowerCase()
  if (p.includes('cau-chuyen') || p.includes('cam-nang')) {
    return 'di-san'
  }
  if (p.includes('tac-dong') || p.includes('qua-tang')) {
    return 'o-loan'
  }
  return 'lang-nghe'
}

export default function AmbienceAudio() {
  const location = useLocation()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackKey, setCurrentTrackKey] = useState(() => getSoundscapeForRoute(location.pathname))
  const [volume, setVolume] = useState(0.28)
  const [showMenu, setShowMenu] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const audioRef = useRef(null)
  const previousRouteKeyRef = useRef(getSoundscapeForRoute(location.pathname))

  const currentTrack = SOUNDSCAPES[currentTrackKey] || SOUNDSCAPES['lang-nghe']

  const triggerToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage('')
    }, 3800)
  }

  // Khởi tạo hoặc đổi audio
  const playTrack = (trackKey, vol = volume) => {
    const track = SOUNDSCAPES[trackKey]
    if (!track) return

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    try {
      const audio = new Audio(track.file)
      audio.loop = true
      audio.volume = vol
      audio.play()
        .then(() => {
          setIsPlaying(true)
          setCurrentTrackKey(trackKey)
          triggerToast(`🎵 Đang phát: ${track.title} (${track.subtitle})`)
        })
        .catch((err) => {
          console.warn('Audio play request blocked or failed:', err)
          setIsPlaying(false)
        })
      audioRef.current = audio
    } catch (e) {
      console.warn('Audio error:', e)
    }
  }

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    setIsPlaying(false)
    setShowMenu(false)
  }

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio()
    } else {
      const expectedKey = getSoundscapeForRoute(location.pathname)
      playTrack(expectedKey)
    }
  }

  const handleSelectTrack = (trackKey) => {
    setCurrentTrackKey(trackKey)
    if (isPlaying) {
      playTrack(trackKey)
    }
  }

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value)
    setVolume(val)
    if (audioRef.current) {
      audioRef.current.volume = val
    }
  }

  // Tự động chuyển đổi âm thanh khi chuyển trang (nếu người dùng đang nghe)
  useEffect(() => {
    const pageTrackKey = getSoundscapeForRoute(location.pathname)
    if (pageTrackKey !== previousRouteKeyRef.current) {
      previousRouteKeyRef.current = pageTrackKey
      setCurrentTrackKey(pageTrackKey)
      if (isPlaying) {
        playTrack(pageTrackKey)
      }
    }
  }, [location.pathname])

  // Cleanup khi unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  return (
    <div className="ambience-audio-widget">
      {/* Toast thông báo không gian âm thanh */}
      {toastMessage && (
        <div className="ambience-toast" role="status">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Menu lựa chọn âm thanh theo trang */}
      {showMenu && (
        <div className="ambience-sound-menu">
          <div className="sound-menu-header">
            <h4>🌿 Không Gian Âm Thanh Theo Bối Cảnh</h4>
            <button
              type="button"
              className="sound-menu-close"
              onClick={() => setShowMenu(false)}
              aria-label="Đóng bảng âm thanh"
            >
              ✕
            </button>
          </div>

          <p className="sound-menu-intro">
            Âm thanh được thiết kế riêng theo từng bối cảnh trang — tự động chuyển đổi khi bạn khám phá làng nghề.
          </p>

          <div className="sound-track-list">
            {Object.values(SOUNDSCAPES).map((track) => {
              const isSelected = track.id === currentTrackKey
              return (
                <button
                  key={track.id}
                  type="button"
                  className={`sound-track-item ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    handleSelectTrack(track.id)
                    if (!isPlaying) {
                      playTrack(track.id)
                    }
                  }}
                >
                  <span className="sound-track-icon">{track.icon}</span>
                  <div className="sound-track-info">
                    <div className="sound-track-name">
                      {track.title}
                      <span className="sound-track-badge">{track.badge}</span>
                    </div>
                    <div className="sound-track-sub">{track.subtitle}</div>
                  </div>
                  {isSelected && isPlaying && (
                    <span className="sound-playing-dot" title="Đang phát" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Thanh chỉnh âm lượng */}
          <div className="sound-volume-box">
            <span className="volume-icon">🔈</span>
            <input
              type="range"
              min="0.05"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="sound-volume-slider"
              aria-label="Điều chỉnh âm lượng"
            />
            <span className="volume-percent">{Math.round(volume * 100)}%</span>
          </div>
        </div>
      )}

      {/* Nút điều khiển âm thanh chính */}
      <div className="ambience-controls-wrapper">
        <button
          type="button"
          className={`ambience-btn ${isPlaying ? 'active' : ''}`}
          onClick={togglePlay}
          title={isPlaying ? 'Bấm để tắt âm thanh làng nghề' : `Nghe âm thanh bối cảnh: ${currentTrack.title}`}
          aria-label="Bật tắt âm thanh bối cảnh làng nghề"
        >
          <span className="ambience-icon">{currentTrack.icon}</span>
          <span className="ambience-text">
            {isPlaying ? currentTrack.title : 'Âm thanh làng nghề'}
          </span>
          <span className="ambience-sound-wave" aria-hidden="true">
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </span>
        </button>

        {/* Nút mở danh sách kênh âm thanh */}
        <button
          type="button"
          className="ambience-settings-btn"
          onClick={() => setShowMenu((prev) => !prev)}
          title="Chọn không gian âm thanh"
          aria-label="Mở danh sách không gian âm thanh"
        >
          ⚙️
        </button>
      </div>
    </div>
  )
}
