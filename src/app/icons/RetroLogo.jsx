import React from 'react';

const RetroLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 64 64"
    >
      {/* Fondo */}
      <rect width="64" height="64" fill="#319795" />

      {/* Forma retro */}
      <path
        fill="none"
        stroke="#4FD1C5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14,32h8v-8h16v8h8"
      />
      <path
        fill="none"
        stroke="#2B6CB0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M32,24v-8l-8,16v8l-8,8h8"
      />
      <path
        fill="none"
        stroke="#D97706"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M32,40v8l8-16v-8l8-8h-8"
      />
    </svg>
  );
};

export default RetroLogo;


