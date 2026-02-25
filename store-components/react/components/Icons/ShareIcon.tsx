import React from 'react';

interface ShareIconProps {
  fill?: string;
}

const ShareIcon = ({ fill }: ShareIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.28599 15.4286C6.17954 15.4286 7.71456 13.8935 7.71456 12C7.71456 10.1065 6.17954 8.57143 4.28599 8.57143C2.39245 8.57143 0.857422 10.1065 0.857422 12C0.857422 13.8935 2.39245 15.4286 4.28599 15.4286Z"
        fill={fill}
        stroke="#ceccc3"
        strokeWidth="1.71429"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.7147 7.71429C21.6083 7.71429 23.1433 6.17927 23.1433 4.28572C23.1433 2.39217 21.6083 0.857147 19.7147 0.857147C17.8212 0.857147 16.2861 2.39217 16.2861 4.28572C16.2861 6.17927 17.8212 7.71429 19.7147 7.71429Z"
        fill={fill}
        stroke="#ceccc3"
        strokeWidth="1.71429"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.7147 23.1429C21.6083 23.1429 23.1433 21.6078 23.1433 19.7143C23.1433 17.8207 21.6083 16.2857 19.7147 16.2857C17.8212 16.2857 16.2861 17.8207 16.2861 19.7143C16.2861 21.6078 17.8212 23.1429 19.7147 23.1429Z"
        fill={fill}
        stroke="#ceccc3"
        strokeWidth="1.71429"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.36035 9.2743L16.3889 5.10858"
        stroke="#ceccc3"
        strokeWidth="1.71429"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.36035 14.7257L16.3889 18.8914"
        stroke="#ceccc3"
        strokeWidth="1.71429"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ShareIcon;
