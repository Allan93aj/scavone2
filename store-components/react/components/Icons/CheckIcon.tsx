import React from 'react';

function CheckIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="17"
      height="18"
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.1654 4.5L6.3737 12.75L2.83203 9"
        stroke="#373435"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CheckIcon;
