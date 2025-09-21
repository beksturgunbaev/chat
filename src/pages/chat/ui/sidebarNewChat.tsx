import { Loader } from '@/widgets';
import useSidebarNewChat from '../model/useSidebarNewChat';

const SidebarNewChat = () => {
  const { clients, loading, navigate, handleCreateChat } = useSidebarNewChat();

  if (loading) {
    return <Loader height='70vh' />;
  }

  return (
    <div className='flex-1 overflow-y-auto px-3 pb-3'>
      <button
        onClick={() => navigate(-1)}
        className='flex items-center gap-1 font-medium mb-1 text-sm bg-transparent outline-none border-none text-gray-700 hover:text-black'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className='w-4 h-4'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.75 19.5L8.25 12l7.5-7.5'
          />
        </svg>
        Вернуться в чат
      </button>

      {clients?.map((el) => (
        <button
          key={el.uid}
          onClick={() => handleCreateChat(el)}
          className='p-2 cursor-pointer border-b border-gray-100 flex items-center gap-2'
        >
          <div className='w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold text-lg'>
            {el?.fullName.charAt(0)}
          </div>
          <div className='flex-1'>
            <div className='flex justify-between items-center'>
              <h3 className='font-semibold text-gray-800 line-clamp-1 break-all'>
                {el?.fullName}
              </h3>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default SidebarNewChat;
