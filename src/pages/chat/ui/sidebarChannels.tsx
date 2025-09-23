import { Loader } from '@/widgets';
import { NavLink } from 'react-router-dom';
import useSidebarChannels from '../model/useSidebarChannels';

const SidebarChannels = () => {
  const { user, loading, channels } = useSidebarChannels();

  if (loading) {
    return <Loader height='70vh' />;
  }

  return (
    <div className='flex-1 overflow-y-auto bg-white'>
      {channels.map((ch) => (
        <NavLink
          to={`/app/channels/${ch?.channelId}?channel=${ch.data.name}`}
          key={ch.channelId}
          className='flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 transition'
        >
          <div className='w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold text-lg mr-2'>
            {ch.data?.name.charAt(0)}
          </div>
          <div className='flex-1 min-w-0 mr-1'>
            <h3 className='font-semibold text-gray-800 line-clamp-1 break-all'>
              {ch?.data.name}{' '}
            </h3>
            <div className='text-xs flex items-center gap-1'>
              <span className='text-gray-500 italic'>Админ:</span>
              <p className='line-clamp-1 break-all italic text-gray-700'>
                {ch?.data?.owner === user?.uid ? 'Вы' : ch?.data?.ownerName}
              </p>
            </div>
          </div>
          {ch.unreadMessagesCount > 0 && (
            <span className='bg-green-600 text-xs px-1.5 py-[2px] font-medium text-nowrap rounded-full text-white'>
              {ch?.unreadMessagesCount}
            </span>
          )}
        </NavLink>
      ))}
      <NavLink
        to='users'
        className='absolute bottom-3 right-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 font-medium text-sm rounded-2xl shadow-lg flex items-center justify-center'
      >
        Создать канал +
      </NavLink>
    </div>
  );
};

export default SidebarChannels;
