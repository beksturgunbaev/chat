export const SingleCheck = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='14'
    height='14'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='3'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M20 6L9 17l-5-5' />
  </svg>
);

export const DoubleCheck = ({ read }: { read: boolean }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    stroke={read ? '#2563eb' : 'gray'}
    strokeWidth='3'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M1 12l5 5L15 5' />
    <path d='M8 12l5 5L22 5' />
  </svg>
);
