import React from "react";

// Um padrão geométrico inspirado em vitrais e arquitetura gótica
export const GothicRosePattern = ({
  color = "currentColor",
  opacity = 0.1,
}) => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern
        id="gothic-pattern"
        x="0"
        y="0"
        width="60"
        height="60"
        patternUnits="userSpaceOnUse"
      >
        {/* Cruz/Flor estilizada */}
        <path
          d="M30 0 L35 10 L45 10 L38 20 L42 30 L30 24 L18 30 L22 20 L15 10 L25 10 Z"
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity="0.8"
        />
        <circle
          cx="30"
          cy="30"
          r="12"
          fill="none"
          stroke={color}
          strokeWidth="0.5"
        />
        <circle
          cx="0"
          cy="0"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          opacity="0.5"
        />
        <circle
          cx="60"
          cy="60"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          opacity="0.5"
        />
        <circle
          cx="60"
          cy="0"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          opacity="0.5"
        />
        <circle
          cx="0"
          cy="60"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          opacity="0.5"
        />
      </pattern>
    </defs>
    <rect
      x="0"
      y="0"
      width="100%"
      height="100%"
      fill="url(#gothic-pattern)"
      style={{ opacity: opacity }}
    />
  </svg>
);

// Ornamento circular grande para destaque (Estilo Hóstia/Rosácea)
export const LargeRosette = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", pointerEvents: "none" }}
  >
    <circle
      cx="50"
      cy="50"
      r="48"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeDasharray="4 2"
      opacity="0.3"
    />
    <circle
      cx="50"
      cy="50"
      r="35"
      stroke="currentColor"
      strokeWidth="0.8"
      opacity="0.2"
    />
    <path
      d="M50 10 L55 35 L80 30 L60 50 L80 70 L55 65 L50 90 L45 65 L20 70 L40 50 L20 30 L45 35 Z"
      fill="currentColor"
      opacity="0.1"
    />
  </svg>
);
