/**
 * Univerzia's robot character — redesigned from the ground up as an angular,
 * faceted "AI robotics prototype" rather than a rounded cartoon mascot: a
 * cut-corner visor head (no big cartoon eyeballs — a scanning sensor bar and
 * two small sensor nodes instead), a segmented neck joint, armored shoulder
 * plates, a glowing hex reactor core in the chest, and a two-segment
 * articulated arm. Brushed-steel gradients with cyan/violet edge-lighting
 * instead of pastel plastic.
 *
 * Hand-drawn SVG (not a photo), so it stays transparent and works on any
 * background. Idle bob + a waving arm + a pulsing sensor visor, all pure CSS
 * keyframes (no client JS), so it renders for free on the server and freezes
 * cleanly under the site-wide `prefers-reduced-motion` rule in globals.css.
 *
 * `lookX`/`lookY` are optional, tiny live offsets a CLIENT wrapper (see
 * HeroRobot) can pass in to make the head/visor subtly track the cursor —
 * this component itself stays a plain, server-renderable SVG with no JS of
 * its own.
 */
export function AnimatedRobot({
  className,
  lookX = 0,
  lookY = 0,
}: {
  className?: string;
  lookX?: number;
  lookY?: number;
}) {
  return (
    <svg
      viewBox="0 0 100 112"
      className={`ar-bob h-full w-full ${className ?? ""}`}
      style={{ overflow: "visible" }}
    >
      <style>{`
        @keyframes ar-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .ar-bob { animation: ar-bob 5.5s ease-in-out infinite; }

        @keyframes ar-wave { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-14deg); } }
        .ar-wave { animation: ar-wave 2.4s ease-in-out infinite; }

        @keyframes ar-scan { 0%,100% { opacity: 0.55; transform: scaleY(1); } 50% { opacity: 1; transform: scaleY(1.3); } }
        .ar-scan { animation: ar-scan 3.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }

        @keyframes ar-glow { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }
        .ar-glow { animation: ar-glow 3s ease-in-out infinite; }
      `}</style>

      <defs>
        {/* brushed steel — cool highlight/midtone/shadow bands instead of a
            flat pastel plastic fill */}
        <linearGradient id="arSteel" x1="0.1" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#eef2f9" />
          <stop offset="30%" stopColor="#c3ccdd" />
          <stop offset="55%" stopColor="#8892ab" />
          <stop offset="80%" stopColor="#5b6480" />
          <stop offset="100%" stopColor="#98a2bd" />
        </linearGradient>
        <linearGradient id="arSteelDark" x1="0.1" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#3a415a" />
          <stop offset="100%" stopColor="#1c2033" />
        </linearGradient>
        <linearGradient id="arShadowMap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="55%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#05070f" stopOpacity="0.35" />
        </linearGradient>
        <radialGradient id="arCore" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#e8fdff" />
          <stop offset="35%" stopColor="#3fd7ec" />
          <stop offset="75%" stopColor="#6a5cf0" />
          <stop offset="100%" stopColor="#2c2470" />
        </radialGradient>
        <linearGradient id="arVisorGlass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0a1330" />
          <stop offset="50%" stopColor="#141d42" />
          <stop offset="100%" stopColor="#0a1330" />
        </linearGradient>
        <filter id="arDrop" x="-40%" y="-20%" width="180%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.4" floodColor="#050814" floodOpacity="0.4" />
        </filter>
      </defs>

      <ellipse cx="50" cy="104" rx="24" ry="3.5" fill="#050814" opacity="0.3" />

      <g filter="url(#arDrop)">
        {/* antenna / dorsal sensor mast — a thin mechanical mast with a
            glowing hex tip, not a bright cartoon ball */}
        <line x1="50" y1="12" x2="50" y2="1" stroke="#6b7494" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M50 -3 L54 -0.5 L54 4.5 L50 7 L46 4.5 L46 -0.5 Z" fill="url(#arCore)" className="ar-glow" />

        {/* head — an octagonal cut-corner faceplate instead of a rounded blob */}
        <g style={{ transform: `rotate(${lookX * 0.4}deg)`, transformOrigin: "50px 34px" }}>
          <path
            d="M34 12 L66 12 L74 20 L74 46 L66 54 L34 54 L26 46 L26 20 Z"
            fill="url(#arSteel)"
            stroke="#4a5170"
            strokeWidth="0.7"
          />
          <path d="M34 12 L66 12 L74 20 L74 46 L66 54 L34 54 L26 46 L26 20 Z" fill="url(#arShadowMap)" />
          {/* top bevel highlight */}
          <path d="M35 13.2 L65 13.2 L71.5 20" stroke="#ffffff" strokeWidth="1" opacity="0.55" fill="none" strokeLinecap="round" />
          {/* corner rivets */}
          <circle cx="30" cy="22" r="1" fill="#2b3151" opacity="0.7" />
          <circle cx="70" cy="22" r="1" fill="#2b3151" opacity="0.7" />

          {/* visor — a single dark sensor band with a scanning cyan line and
              two small sensor nodes, replacing big cartoon eyeballs */}
          <g style={{ transform: `translate(${lookX}px, ${lookY}px)` }}>
            <rect x="31" y="27" width="38" height="13" rx="3" fill="url(#arVisorGlass)" stroke="#000" strokeOpacity="0.3" />
            <rect x="33.5" y="32.4" width="33" height="1.4" rx="0.7" fill="#3fe3f5" className="ar-scan" />
            <circle cx="40" cy="33.5" r="2.1" fill="#3fe3f5" className="ar-glow" />
            <circle cx="60" cy="33.5" r="2.1" fill="#8b7bf5" className="ar-glow" />
          </g>

          {/* chin vents — mechanical detail where a cartoon smile used to be */}
          <g stroke="#4a5170" strokeWidth="0.8" opacity="0.6">
            <line x1="43" y1="47" x2="57" y2="47" />
            <line x1="44.5" y1="49.6" x2="55.5" y2="49.6" />
          </g>
        </g>

        {/* neck joint — a visible segmented cylinder connecting head to
            torso, instead of the head sitting directly on the shoulders */}
        <rect x="43" y="54" width="14" height="9" fill="url(#arSteelDark)" />
        <ellipse cx="50" cy="54" rx="8.5" ry="2.2" fill="none" stroke="#3fe3f5" strokeWidth="0.8" opacity="0.55" className="ar-glow" />
        <line x1="45" y1="58" x2="55" y2="58" stroke="#000" strokeOpacity="0.35" strokeWidth="0.7" />

        {/* armored shoulder plates — angular pauldrons instead of round
            cartoon spheres */}
        <path d="M14 78 L27 66 L34 71 L34 88 L24 95 L12 88 Z" fill="url(#arSteel)" stroke="#4a5170" strokeWidth="0.6" />
        <path d="M14 78 L27 66 L34 71 L34 88 L24 95 L12 88 Z" fill="url(#arShadowMap)" />
        <path d="M86 78 L73 66 L66 71 L66 88 L76 95 L88 88 Z" fill="url(#arSteel)" stroke="#4a5170" strokeWidth="0.6" />
        <path d="M86 78 L73 66 L66 71 L66 88 L76 95 L88 88 Z" fill="url(#arShadowMap)" />
        <circle cx="24" cy="74" r="1.1" fill="#3fe3f5" opacity="0.7" />
        <circle cx="76" cy="74" r="1.1" fill="#8b7bf5" opacity="0.7" />

        {/* torso — a trapezoidal cut-corner chest plate */}
        <path
          d="M36 66 L64 66 L72 74 L72 100 L64 106 L36 106 L28 100 L28 74 Z"
          fill="url(#arSteel)"
          stroke="#4a5170"
          strokeWidth="0.7"
        />
        <path d="M36 66 L64 66 L72 74 L72 100 L64 106 L36 106 L28 100 L28 74 Z" fill="url(#arShadowMap)" />
        <path d="M37 67.4 L63 67.4 L69.5 74" stroke="#ffffff" strokeWidth="0.9" opacity="0.5" fill="none" strokeLinecap="round" />

        {/* reactor core — a glowing hex, replacing the cartoon "N" badge
            circle, still legible as the brand mark */}
        <path d="M50 78 L58 82.5 L58 91.5 L50 96 L42 91.5 L42 82.5 Z" fill="#0a1330" />
        <path d="M50 79.4 L56.5 83.2 L56.5 90.8 L50 94.6 L43.5 90.8 L43.5 83.2 Z" fill="url(#arCore)" className="ar-glow" />
        <text x="50" y="90.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="#04101c" fontFamily="var(--font-space-grotesk, sans-serif)">
          U
        </text>

        {/* status lights */}
        <circle cx="41" cy="100.5" r="1.1" fill="#3fe3f5" className="ar-glow" />
        <circle cx="50" cy="101.3" r="1.1" fill="#8b7bf5" className="ar-glow" style={{ animationDelay: "0.4s" }} />
        <circle cx="59" cy="100.5" r="1.1" fill="#3fe3f5" className="ar-glow" style={{ animationDelay: "0.8s" }} />

        {/* two-segment articulated waving arm — upper arm + forearm meeting
            at a visible elbow joint, instead of one straight cartoon line */}
        <g className="ar-wave" style={{ transformOrigin: "24px 82px" }}>
          <line x1="24" y1="82" x2="12" y2="72" stroke="url(#arSteel)" strokeWidth="5" strokeLinecap="round" />
          <circle cx="12" cy="72" r="3" fill="url(#arSteelDark)" stroke="#3fe3f5" strokeWidth="0.6" />
          <line x1="12" y1="72" x2="6" y2="60" stroke="url(#arSteel)" strokeWidth="4.2" strokeLinecap="round" />
          <rect x="1.5" y="54" width="9" height="7" rx="2" fill="url(#arSteelDark)" stroke="#4a5170" strokeWidth="0.5" />
        </g>
      </g>
    </svg>
  );
}
