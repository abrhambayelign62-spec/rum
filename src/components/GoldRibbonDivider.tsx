interface GoldRibbonDividerProps {
  inverted?: boolean;
  className?: string;
}

export default function GoldRibbonDivider({ inverted = false, className = '' }: GoldRibbonDividerProps) {
  return (
    <div className={`w-full overflow-hidden leading-none select-none pointer-events-none relative z-10 ${className} ${inverted ? 'rotate-180' : ''}`}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-10 md:h-16 block"
      >
        <defs>
          <linearGradient id="goldSheenGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7A5A2E" />
            <stop offset="25%" stopColor="#C9A66B" />
            <stop offset="50%" stopColor="#F4E3B2" />
            <stop offset="75%" stopColor="#B8874E" />
            <stop offset="100%" stopColor="#7A5A2E" />
          </linearGradient>
          <linearGradient id="goldSheenGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B8874E" />
            <stop offset="35%" stopColor="#F4E3B2" />
            <stop offset="70%" stopColor="#C9A66B" />
            <stop offset="100%" stopColor="#5A3F1E" />
          </linearGradient>
          <filter id="ribbonGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#C9A66B" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Back metallic shadow wave */}
        <path
          d="M0,0 C200,85 450,110 600,45 C750,-20 1000,105 1200,20 L1200,120 L0,120 Z"
          fill="url(#goldSheenGrad1)"
          opacity="0.85"
        />

        {/* Front glowing wave ribbon */}
        <path
          d="M0,15 C220,95 430,95 600,35 C780,-25 980,95 1200,40 L1200,120 L0,120 Z"
          fill="url(#goldSheenGrad2)"
          filter="url(#ribbonGlow)"
        />

        {/* Thin lustrous highlight streak */}
        <path
          d="M0,16 C220,96 430,96 600,36 C780,-24 980,96 1200,41"
          fill="none"
          stroke="#FFF2D6"
          strokeWidth="1.5"
          opacity="0.9"
        />
      </svg>
    </div>
  );
}
