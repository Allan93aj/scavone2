import React from 'react';

function CategoryBulletArrowNew(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 23 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.958252 7.81689L21.0833 7.81689"
        stroke="#373435"
        strokeWidth="1.71429"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M16.4285 13.5669L22.1785 7.81689L16.4285 2.06689"
        stroke="#373435"
        strokeWidth="1.71429"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CategoryBulletArrowNew;
