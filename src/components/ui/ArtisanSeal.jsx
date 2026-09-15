export default function ArtisanSeal({ className = '', size = 110 }) {
  return (
    <div
      className={`artisan-seal ${className}`.trim()}
      style={{ width: size, height: size }}
      title="Con dấu chứng nhận di sản làng nghề chiếu cói Phú Tân"
      aria-label="Con dấu di sản thủ công Chiếu Nẫu"
    >
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        className="artisan-seal-svg"
      >
        <defs>
          <path
            id="sealCirclePath"
            d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
          />
        </defs>

        {/* Outer dashed craft ring */}
        <circle
          cx="60"
          cy="60"
          r="56"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          className="seal-ring-outer"
        />

        {/* Inner solid border */}
        <circle
          cx="60"
          cy="60"
          r="51"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="seal-ring-inner"
        />

        {/* Rotating text around the circle */}
        <text className="seal-text">
          <textPath href="#sealCirclePath" startOffset="0%">
            • LÀNG NGHỀ PHÚ TÂN • DI SẢN 100 NĂM • THỦ CÔNG 100% •
          </textPath>
        </text>

        {/* Center core seal */}
        <circle
          cx="60"
          cy="60"
          r="26"
          fill="rgba(201, 169, 110, 0.12)"
          stroke="currentColor"
          strokeWidth="1.2"
        />

        {/* Center icon: Handcrafted sedge leaf + loom motif */}
        <g transform="translate(48, 48) scale(1)" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </g>
      </svg>
      <span className="seal-center-year">1924</span>
    </div>
  )
}
