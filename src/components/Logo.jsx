import React from 'react';

const Logo = ({ size = 88, className = '' }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 220 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="110" cy="110" r="110" fill="#dc2626" />
    <circle cx="110" cy="110" r="88" fill="#f59e0b" />
    <circle cx="110" cy="110" r="70" fill="#ffffff" opacity="0.14" />
    <path d="M56 110h108" stroke="#dc2626" strokeWidth="12" strokeLinecap="round" />
    <path d="M110 56v108" stroke="#dc2626" strokeWidth="12" strokeLinecap="round" />
    <text
      x="110"
      y="138"
      textAnchor="middle"
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="42"
      fontWeight="700"
      fill="#111827"
    >
      DILG
    </text>
  </svg>
);

export default Logo;
