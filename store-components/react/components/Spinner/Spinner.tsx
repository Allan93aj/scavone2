import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import classNames from 'classnames';

import styles from './Spinner.styles.css';

const radius = 40;
const circ = 2 * radius * Math.PI;

function Spinner({ size = 24 }) {
  const { handles } = useCssHandles(['spinner']);

  return (
    <svg
      className={classNames(styles.rotate, handles.spinner)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      height={size}
      width={size}
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        r={radius}
        stroke="currentColor"
        strokeWidth="10"
        strokeDasharray={`0 0 ${circ * 0.65} ${circ}`}
        strokeLinecap="round"
        strokeDashoffset="1"
      />
    </svg>
  );
}

export default Spinner;
