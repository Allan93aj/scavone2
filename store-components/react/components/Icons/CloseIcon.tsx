import React from 'react';

function CloseIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="66"
      height="66"
      viewBox="0 0 66 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_225_12878)">
        <rect x="10" y="5" width="46" height="46" rx="23" fill="white" />
      </g>
      <path
        d="M39.5 21.5L26.5 34.5"
        stroke="#231F20"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M26.5 21.5L39.5 34.5"
        stroke="#231F20"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <defs>
        <filter
          id="filter0_d_225_12878"
          x="0"
          y="0"
          width="66"
          height="66"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="5" />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.215686 0 0 0 0 0.203922 0 0 0 0 0.207843 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_225_12878"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_225_12878"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default CloseIcon;
