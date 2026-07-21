// Pequeña llama viva — firma de marca. Parpadeo orgánico vía CSS (.flame / .flame-glow).
export default function Flame({ className = '', size = 18 }) {
  return (
    <svg
      width={size}
      height={size * 1.6}
      viewBox="0 0 20 32"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="flame-glow"
        cx="10"
        cy="14"
        r="9"
        fill="#E9D9B4"
        opacity="0.4"
        style={{ transformOrigin: '10px 14px', filter: 'blur(2.5px)' }}
      />
      <g
        className="flame"
        style={{ transformBox: 'fill-box', transformOrigin: 'center bottom' }}
      >
        <path
          d="M10 30 C2 24, 3 12, 10 2 C17 12, 18 24, 10 30 Z"
          fill="#A67C2E"
        />
        <path
          d="M10 28 C5 23, 6 14, 10 7 C14 14, 15 23, 10 28 Z"
          fill="#E9B84C"
        />
        <path
          d="M10 26 C7 22, 7.5 16, 10 12 C12.5 16, 13 22, 10 26 Z"
          fill="#F0E6CE"
        />
      </g>
    </svg>
  );
}
