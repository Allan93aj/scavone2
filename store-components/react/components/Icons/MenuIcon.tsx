import React from 'react';

function MenuIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="16"
      height="9"
      viewBox="0 0 16 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 2L8 8L14 2"
        stroke="#373435"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default MenuIcon;
