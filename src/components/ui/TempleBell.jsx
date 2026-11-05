import React from "react";

/**
 * TempleBell — Authentic Traditional Indian Temple Brass Bell (Ghanti)
 * with an elongated, clearly visible antique-gold suspension chain connecting
 * directly to the panel's upper border line.
 * 
 * The entire chain + bell assembly swings naturally as a pendulum
 * anchored at the top border (transform-origin: 14px 0px).
 *
 * @param {string} className - Optional Tailwind or custom classes
 * @param {number} delaySeconds - Delay offset for animation timing offset
 * @param {number} height - Total height in pixels (default 68px for prominent hanging chain)
 */
export default function TempleBell({
  className = "",
  delaySeconds = 0,
  height = 68,
}) {
  // Proportional width: 28px width for 70px height (viewBox: 0 0 28 70)
  const width = Math.round((height * 28) / 70);

  return (
    <div
      className={`inline-block select-none pointer-events-none ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 28 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs temple-bell-swing"
        style={{
          transformOrigin: "14px 0px",
          animationDelay: `${delaySeconds}s`,
        }}
      >
        <defs>
          {/* Antique Gold Gradient (Master Theme Palette) */}
          <linearGradient id="antiqueGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7E5716" />
            <stop offset="18%" stopColor="#B68A36" />
            <stop offset="50%" stopColor="#F9E8B8" />
            <stop offset="82%" stopColor="#C79A3B" />
            <stop offset="100%" stopColor="#63420E" />
          </linearGradient>

          {/* Soft Gold Rim Highlight Gradient */}
          <linearGradient id="softGoldRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#63420E" />
            <stop offset="25%" stopColor="#E2BC6B" />
            <stop offset="50%" stopColor="#FFF7DD" />
            <stop offset="75%" stopColor="#DEC077" />
            <stop offset="100%" stopColor="#55370A" />
          </linearGradient>

          {/* Chain Link Metallic Gradient */}
          <linearGradient id="chainLinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3DC9B" />
            <stop offset="45%" stopColor="#C79A3B" />
            <stop offset="100%" stopColor="#7E5716" />
          </linearGradient>
        </defs>

        {/* ========================================================= */}
        {/* 1. TOP BORDER ANCHOR BRACKET                              */}
        {/* ========================================================= */}
        {/* Fixed mount bracket touching the top border (y=0) */}
        <path
          d="M11 0 H17 V2 H11 Z"
          fill="#B68A36"
        />
        <rect x="12" y="1.5" width="4" height="1.2" rx="0.6" fill="#F9E8B8" />

        {/* ========================================================= */}
        {/* 2. ELONGATED INTERLOCKING CHAIN (y=2 to y=38)             */}
        {/* 6 clearly defined vertical links with golden connector rings*/}
        {/* ========================================================= */}
        
        {/* Link 1 */}
        <rect
          x="12.8"
          y="2.2"
          width="2.4"
          height="5.4"
          rx="1.2"
          stroke="url(#chainLinkGrad)"
          strokeWidth="0.95"
          fill="none"
        />
        <line x1="14" y1="3" x2="14" y2="6.6" stroke="#FFF7DD" strokeWidth="0.6" opacity="0.85" />
        <circle cx="14" cy="7.2" r="1.3" fill="url(#chainLinkGrad)" />

        {/* Link 2 */}
        <rect
          x="12.8"
          y="7.8"
          width="2.4"
          height="5.4"
          rx="1.2"
          stroke="url(#chainLinkGrad)"
          strokeWidth="0.95"
          fill="none"
        />
        <line x1="14" y1="8.6" x2="14" y2="12.2" stroke="#FFF7DD" strokeWidth="0.6" opacity="0.85" />
        <circle cx="14" cy="12.8" r="1.3" fill="url(#chainLinkGrad)" />

        {/* Link 3 */}
        <rect
          x="12.8"
          y="13.4"
          width="2.4"
          height="5.4"
          rx="1.2"
          stroke="url(#chainLinkGrad)"
          strokeWidth="0.95"
          fill="none"
        />
        <line x1="14" y1="14.2" x2="14" y2="17.8" stroke="#FFF7DD" strokeWidth="0.6" opacity="0.85" />
        <circle cx="14" cy="18.4" r="1.3" fill="url(#chainLinkGrad)" />

        {/* Link 4 */}
        <rect
          x="12.8"
          y="19"
          width="2.4"
          height="5.4"
          rx="1.2"
          stroke="url(#chainLinkGrad)"
          strokeWidth="0.95"
          fill="none"
        />
        <line x1="14" y1="19.8" x2="14" y2="23.4" stroke="#FFF7DD" strokeWidth="0.6" opacity="0.85" />
        <circle cx="14" cy="24" r="1.3" fill="url(#chainLinkGrad)" />

        {/* Link 5 */}
        <rect
          x="12.8"
          y="24.6"
          width="2.4"
          height="5.4"
          rx="1.2"
          stroke="url(#chainLinkGrad)"
          strokeWidth="0.95"
          fill="none"
        />
        <line x1="14" y1="25.4" x2="14" y2="29" stroke="#FFF7DD" strokeWidth="0.6" opacity="0.85" />
        <circle cx="14" cy="29.6" r="1.3" fill="url(#chainLinkGrad)" />

        {/* Link 6 (Enters the Bell Suspension Ring) */}
        <rect
          x="12.8"
          y="30.2"
          width="2.4"
          height="5.4"
          rx="1.2"
          stroke="url(#chainLinkGrad)"
          strokeWidth="0.95"
          fill="none"
        />
        <line x1="14" y1="31" x2="14" y2="34.6" stroke="#FFF7DD" strokeWidth="0.6" opacity="0.85" />

        {/* ========================================================= */}
        {/* 3. BELL SUSPENSION LOOP & CROWN FINIAL (y=35 to y=42)     */}
        {/* ========================================================= */}
        {/* Bell Suspension Ring */}
        <ellipse
          cx="14"
          cy="36.5"
          rx="3.2"
          ry="2.6"
          stroke="url(#antiqueGoldGrad)"
          strokeWidth="1.3"
          fill="none"
        />
        <ellipse
          cx="14"
          cy="36.5"
          rx="1.6"
          ry="1.2"
          fill="#FFF7DD"
          opacity="0.6"
        />

        {/* Crown Finial / Dome Cap */}
        <ellipse cx="14" cy="40.5" rx="4.2" ry="1.5" fill="url(#softGoldRimGrad)" />
        <path
          d="M10.8 40.5 C10.8 38 17.2 38 17.2 40.5 Z"
          fill="url(#antiqueGoldGrad)"
        />

        {/* ========================================================= */}
        {/* 4. INTERNAL HANGING CLAPPER                               */}
        {/* ========================================================= */}
        {/* Clapper Rod */}
        <line
          x1="14"
          y1="50"
          x2="14"
          y2="63.5"
          stroke="#55370A"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* Clapper Ball / Teardrop bottom */}
        <circle cx="14" cy="64.5" r="2.5" fill="url(#antiqueGoldGrad)" stroke="#4A2E07" strokeWidth="0.6" />
        <circle cx="13.3" cy="63.8" r="0.9" fill="#FFFDF7" opacity="0.85" />

        {/* ========================================================= */}
        {/* 5. MAIN BELL BODY (Flared Indian Temple Bell Silhouette)  */}
        {/* ========================================================= */}
        <path
          d="M10 41
             C10.5 44.5 9.6 48.5 7.8 53.5
             C6.2 58 3.8 61.8 3 63.3
             C2.6 64.1 3 65.2 4 65.2
             L24 65.2
             C25 65.2 25.4 64.1 25 63.3
             C24.2 61.8 21.8 58 20.2 53.5
             C18.4 48.5 17.5 44.5 18 41
             Z"
          fill="url(#antiqueGoldGrad)"
          stroke="#4A2E07"
          strokeWidth="0.75"
        />

        {/* Embossed Decorative Rings */}
        <ellipse cx="14" cy="46.5" rx="4.2" ry="0.9" fill="none" stroke="#F9E8B8" strokeWidth="0.65" opacity="0.9" />
        <ellipse cx="14" cy="53" rx="6" ry="1.1" fill="none" stroke="#4A2E07" strokeWidth="0.6" opacity="0.8" />
        <ellipse cx="14" cy="53.7" rx="6.2" ry="1.1" fill="none" stroke="#F9E8B8" strokeWidth="0.65" opacity="0.9" />

        {/* Flared Bottom Lip Rim Highlight */}
        <ellipse cx="14" cy="65.2" rx="10.5" ry="2" fill="url(#softGoldRimGrad)" stroke="#4A2E07" strokeWidth="0.6" />
        <ellipse cx="14" cy="64.8" rx="9" ry="1.2" fill="none" stroke="#FFF7DD" strokeWidth="0.5" opacity="0.75" />
      </svg>
    </div>
  );
}
