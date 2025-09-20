type IProps = {
  title: string;
  desc: string;
};

const EmptyChat = ({ title, desc }: IProps) => {
  return (
    <div className='flex-1 flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <div className='w-24 h-24 flex items-center justify-center bg-blue-100 rounded-full animate-pulse'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-12 w-12 text-blue-500'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.001 9.001 0 01-8.485-6.032L3 14l.515-.968A9.001 9.001 0 0121 12z'
            />
          </svg>
        </div>
        <div>
          <h2 className='text-xl text-center mb-2 font-semibold text-gray-700'>
            {title}
          </h2>
          <p className='text-gray-500 text-center max-w-xs'>{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyChat;
