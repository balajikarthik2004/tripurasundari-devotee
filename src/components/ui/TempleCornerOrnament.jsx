import React from "react";

/**
 * TempleCornerOrnament — Minimal, delicate traditional corner ornament
 * Light antique-gold linework (10-15% visual weight) that frames the panel softly.
 *
 * @param {"top-left"|"top-right"|"bottom-left"|"bottom-right"} position
 * @param {string} className
 * @param {number} size
 */
export default function TempleCornerOrnament({
  position = "top-left",
  className = "",
  size = 38,
}) {
  const getTransform = () => {
    switch (position) {
      case "top-right":
        return "scale(-1, 1)";
      case "bottom-left":
        return "scale(1, -1)";
      case "bottom-right":
        return "scale(-1, -1)";
      default:
        return "none";
    }
  };

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: getTransform(),
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-35"
      >
        {/* Soft outer corner bracket */}
        <path
          d="M2 38 L2 10 C2 5.5 5.5 2 10 2 L38 2"
          stroke="#B68A36"
          strokeWidth="0.8"
        />
        {/* Subtle inner concentric curve */}
        <path
          d="M6 34 L6 14 C6 9.5 9.5 6 14 6 L34 6"
          stroke="#E2BC6B"
          strokeWidth="0.6"
          strokeDasharray="2 2"
        />
        {/* Tiny corner pip */}
        <circle cx="5" cy="5" r="1.2" fill="#B68A36" />
      </svg>
    </div>
  );
}
