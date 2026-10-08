"use client";

import { useId } from "react";

/**
 * The homepage hero visual: a student robotics workbench, not an abstract
 * machine. Every object here is meant to be legible at a glance — wheels,
 * motor, battery, controller PCB, wiring, an ultrasonic sensor, a robotic
 * arm reaching for a spare part, a laptop showing code — so a visitor
 * recognizes "robotics + coding classroom" immediately, not a sci-fi prop.
 *
 * The composition itself is still fixed (no scroll-driven sequence — see the
 * comment in Hero.tsx on why), but it's no longer inert: the parts tray arm
 * idles through a slow reaching sway and the laptop has a blinking text
 * cursor, both pure CSS keyframes so this stays a server-renderable SVG with
 * no client JS of its own, exactly like the existing LED/sensor pulses.
 */
export function RoboticsWorkbenchScene({ className }: { className?: string }) {
  const uid = useId();

  return (
    <svg viewBox="0 0 700 420" className={className} overflow="visible" aria-hidden="true">
      <style>{`
        @keyframes wb-arm-sway { 0%, 100% { transform: rotate(-18deg); } 50% { transform: rotate(-24deg); } }
        .wb-arm-sway { animation: wb-arm-sway 4.5s ease-in-out infinite; transform-box: view-box; transform-origin: 600px 300px; }
        @keyframes wb-cursor-blink { 0%, 45% { opacity: 1; } 50%, 100% { opacity: 0; } }
        .wb-cursor-blink { animation: wb-cursor-blink 1.1s step-end infinite; }
        @keyframes wb-mast-scan { 0%, 100% { transform: rotate(-7deg); } 50% { transform: rotate(7deg); } }
        .wb-mast-scan { animation: wb-mast-scan 5s ease-in-out infinite; transform-box: view-box; transform-origin: 285px 204px; }
        @keyframes wb-holo-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .wb-holo-rotate { animation: wb-holo-rotate 7s linear infinite; }
        @keyframes wb-holo-pulse { 0%, 100% { opacity: 0.85; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
        .wb-holo-pulse { animation: wb-holo-pulse 2.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
      `}</style>
      <defs>
        <linearGradient id={`${uid}-metal`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#eef2f9" />
          <stop offset="45%" stopColor="#a7b0c8" />
          <stop offset="100%" stopColor="#5b6480" />
        </linearGradient>
        <radialGradient id={`${uid}-sensor`} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#eafcff" />
          <stop offset="60%" stopColor="#3fe3f5" />
          <stop offset="100%" stopColor="#0e7490" />
        </radialGradient>
        <radialGradient id={`${uid}-screen`} cx="30%" cy="20%" r="80%">
          <stop offset="0%" stopColor="#1b2a5c" />
          <stop offset="100%" stopColor="#0a1330" />
        </radialGradient>
        <linearGradient id={`${uid}-metal-dim`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#8891a8" />
          <stop offset="45%" stopColor="#5f6a86" />
          <stop offset="100%" stopColor="#3d465f" />
        </linearGradient>
        <radialGradient id={`${uid}-pool`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8fe9f5" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#8fe9f5" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ---- workbench ---- */}
      <rect x="20" y="300" width="660" height="14" rx="4" fill="#1a2340" />
      <rect x="20" y="296" width="660" height="4" fill="#2c396b" />

      {/* soft pool of light under the rover — the hero object — instead of a beam reaching off-frame */}
      <ellipse cx="370" cy="296" rx="150" ry="46" fill={`url(#${uid}-pool)`} />

      {/* ground shadows */}
      <ellipse cx="110" cy="300" rx="55" ry="7" fill="#000" opacity="0.35" />
      <ellipse cx="370" cy="304" rx="110" ry="9" fill="#000" opacity="0.4" />
      <ellipse cx="600" cy="302" rx="30" ry="6" fill="#000" opacity="0.3" />

      {/* ================= laptop: the coding side of the story ================= */}
      <g>
        <rect x="60" y="288" width="100" height="9" rx="2" fill={`url(#${uid}-metal)`} />
        <rect x="70" y="222" width="80" height="58" rx="4" fill="#0a1330" stroke="#2c396b" strokeWidth="1.5" />
        <rect x="76" y="228" width="68" height="46" rx="2" fill={`url(#${uid}-screen)`} />
        {/* abstracted syntax-highlighted code lines */}
        <rect x="82" y="234" width="24" height="3" rx="1.5" fill="#8b7bf5" opacity="0.9" />
        <rect x="82" y="240" width="40" height="3" rx="1.5" fill="#5b6480" opacity="0.8" />
        <rect x="88" y="246" width="30" height="3" rx="1.5" fill="#3fe3f5" opacity="0.85" />
        <rect x="88" y="252" width="20" height="3" rx="1.5" fill="#3fe3f5" opacity="0.6" />
        <rect x="82" y="258" width="46" height="3" rx="1.5" fill="#5b6480" opacity="0.8" />
        <rect x="88" y="264" width="16" height="3" rx="1.5" fill="#ffc93c" className="animate-pulse-soft" opacity="0.85" />
        {/* blinking text cursor — someone is actively typing, not looking at frozen code */}
        <rect x="106" y="262.5" width="2.2" height="5" fill="#eafcff" className="wb-cursor-blink" />
      </g>

      {/* ================= parts tray + robotic arm: about to prepare a component ================= */}
      <g>
        <rect x="606" y="272" width="46" height="18" rx="3" fill="#232d52" stroke="#3a4573" />
        {/* spare wheel waiting to be picked up */}
        <circle cx="629" cy="272" r="10" fill="#232033" stroke="#3a415a" strokeWidth="1.5" />
        <circle cx="629" cy="272" r="4" fill={`url(#${uid}-metal)`} />
      </g>

      <g opacity="0.88">
        {/* arm base, mounted on the bench — dimmer than the rover so it reads as supporting cast, not competing focus */}
        <circle cx="600" cy="300" r="13" fill={`url(#${uid}-metal-dim)`} stroke="#2c3348" strokeWidth="1" />
        <circle cx="600" cy="300" r="4" fill="#3fe3f5" className="animate-pulse-soft" />
        {/* resting pose: reaching down toward the tray, gripper open — a
            slow idle sway (CSS transform, replacing the old static SVG
            `transform` attribute so the keyframe doesn't have to compose
            with it) instead of frozen at rest */}
        <g className="wb-arm-sway">
          <rect x="594" y="250" width="12" height="52" rx="5" fill={`url(#${uid}-metal-dim)`} stroke="#2c3348" strokeWidth="1" />
          <circle cx="600" cy="252" r="8" fill={`url(#${uid}-metal-dim)`} stroke="#2c3348" strokeWidth="1" />
          <g transform="rotate(58 600 252)">
            <rect x="595" y="212" width="10" height="42" rx="4" fill={`url(#${uid}-metal-dim)`} stroke="#2c3348" strokeWidth="1" />
            <circle cx="600" cy="214" r="6" fill={`url(#${uid}-metal-dim)`} stroke="#2c3348" strokeWidth="1" />
            <g transform="rotate(-38 600 214)">
              <rect x="596" y="188" width="8" height="28" rx="3" fill={`url(#${uid}-metal-dim)`} stroke="#2c3348" strokeWidth="1" />
              <g transform="rotate(-24 600 188)">
                <rect x="590" y="176" width="5" height="14" rx="2" fill="#2c3348" />
              </g>
              <g transform="rotate(24 600 188)">
                <rect x="605" y="176" width="5" height="14" rx="2" fill="#2c3348" />
              </g>
            </g>
          </g>
        </g>
      </g>

      {/* ================= the rover: the hero object ================= */}
      <g>
        {/* wheels */}
        <g>
          <circle cx="310" cy="300" r="27" fill="#141a2e" stroke="#2c396b" strokeWidth="2" />
          <circle cx="310" cy="300" r="12" fill={`url(#${uid}-metal)`} stroke="#3a415a" strokeWidth="1" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <line
              key={deg}
              x1="310"
              y1="300"
              x2={310 + 24 * Math.cos((deg * Math.PI) / 180)}
              y2={300 + 24 * Math.sin((deg * Math.PI) / 180)}
              stroke="#2c396b"
              strokeWidth="2"
            />
          ))}
        </g>
        <g>
          <circle cx="430" cy="300" r="27" fill="#141a2e" stroke="#2c396b" strokeWidth="2" />
          <circle cx="430" cy="300" r="12" fill={`url(#${uid}-metal)`} stroke="#3a415a" strokeWidth="1" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <line
              key={deg}
              x1="430"
              y1="300"
              x2={430 + 24 * Math.cos((deg * Math.PI) / 180)}
              y2={300 + 24 * Math.sin((deg * Math.PI) / 180)}
              stroke="#2c396b"
              strokeWidth="2"
            />
          ))}
        </g>

        {/* axle housing */}
        <rect x="300" y="288" width="140" height="10" rx="3" fill="#1c2748" />

        {/* motors, mounted right at the wheel hubs */}
        <rect x="298" y="280" width="18" height="14" rx="3" fill="#3a415a" />
        <rect x="424" y="280" width="18" height="14" rx="3" fill="#3a415a" />

        {/* chassis */}
        <rect x="295" y="248" width="150" height="42" rx="9" fill={`url(#${uid}-metal)`} stroke="#3a415a" strokeWidth="1.5" />
        <line x1="295" y1="252" x2="445" y2="252" stroke="#eef2f9" strokeWidth="1" opacity="0.5" />

        {/* battery pack */}
        <rect x="306" y="232" width="38" height="18" rx="3" fill="#232d52" stroke="#3a4573" />
        <line x1="318" y1="234" x2="318" y2="248" stroke="#3a4573" strokeWidth="1.2" />
        <line x1="330" y1="234" x2="330" y2="248" stroke="#3a4573" strokeWidth="1.2" />

        {/* controller PCB, with idle status LEDs */}
        <rect x="352" y="230" width="62" height="20" rx="2" fill="#0f1830" stroke="#2c396b" strokeWidth="1" />
        <line x1="360" y1="238" x2="380" y2="238" stroke="#3fe3f5" strokeWidth="1" opacity="0.7" />
        <line x1="360" y1="243" x2="372" y2="243" stroke="#8b7bf5" strokeWidth="1" opacity="0.6" />
        <rect x="386" y="235" width="10" height="10" rx="1.5" fill="#232d52" />
        <circle cx="404" cy="236" r="2" fill="#ff7a45" />
        <circle cx="404" cy="243" r="2" fill="#3fe3f5" className="animate-pulse-soft" />

        {/* wiring, battery -> controller -> motors, with real slack */}
        <path d="M 344 240 Q 348 246 352 240" stroke="#e5484d" strokeWidth="1.5" fill="none" />
        <path d="M 316 250 Q 310 268 300 282" stroke="#232033" strokeWidth="1.5" fill="none" />
        <path d="M 424 250 Q 432 268 440 282" stroke="#232033" strokeWidth="1.5" fill="none" />

        {/* front sensor mast — twin-eye ultrasonic sensor, the most
            recognizable "robot" cue, panning slowly like it's scanning the
            room (the pole stays fixed; only the sensor head sweeps) */}
        <rect x="281" y="204" width="7" height="46" fill="#3a415a" />
        <g className="wb-mast-scan">
          <rect x="260" y="188" width="50" height="22" rx="7" fill={`url(#${uid}-metal)`} stroke="#3a415a" strokeWidth="1" />
          <circle cx="275" cy="199" r="7.5" fill={`url(#${uid}-sensor)`} className="animate-pulse-soft" />
          <circle cx="296" cy="199" r="7.5" fill={`url(#${uid}-sensor)`} className="animate-pulse-soft" style={{ animationDelay: "0.4s" }} />
        </g>

        {/* antenna beacon */}
        <line x1="438" y1="250" x2="448" y2="214" stroke="#8892ab" strokeWidth="2" strokeLinecap="round" />
        <circle cx="448" cy="210" r="4.5" fill="#ffc93c" className="animate-pulse-soft" style={{ animationDelay: "0.8s" }} />

        {/* holographic data readout — a floating rotating marker "projected"
            above the controller board, connected by a thin light beam. This
            is deliberately abstract/geometric rather than a character, so
            the hero gets its own unique bit of motion instead of reusing the
            AnimatedRobot mascot that already appears in the footer/WhoWeAre/
            FinalCTA. */}
        <line x1="383" y1="230" x2="383" y2="208" stroke="#3fe3f5" strokeWidth="0.8" opacity="0.4" />
        <g transform="translate(383 195)">
          <path
            d="M0 -15 L13 -7.5 L13 7.5 L0 15 L-13 7.5 L-13 -7.5 Z"
            fill="none"
            stroke="#3fe3f5"
            strokeWidth="1"
            opacity="0.55"
            className="wb-holo-rotate"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <circle r="3.5" fill="#eafcff" opacity="0.9" className="wb-holo-pulse" />
        </g>
      </g>
    </svg>
  );
}
