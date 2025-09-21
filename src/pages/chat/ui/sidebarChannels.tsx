import { NavLink } from 'react-router-dom';

const SidebarChannels = () => {
  const channels = [
    {
      id: 1,
      name: 'Frontend канал',
      lastMessage: 'Последнее сообщение...',
      time: '12:45',
      unread: 2,
    },
    {
      id: 2,
      name: 'Backend канал',
      lastMessage: 'Привет 👋',
      time: 'Вчера',
      unread: 0,
    },
  ];

  return (
    <div className='flex-1 overflow-y-auto bg-white'>
      {channels.map((ch) => (
        <div
          key={ch.id}
          className='flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 transition'
        >
          <div className='w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold text-lg mr-3'>
            {ch.name.charAt(0)}
          </div>
          <div className='flex-1 min-w-0'>
            <div className='flex justify-between items-center'>
              <h3 className='font-semibold text-gray-800 truncate'>
                {ch.name}
              </h3>
              <span className='text-xs text-gray-400'>{ch.time}</span>
            </div>
            <p className='text-sm text-gray-500 truncate'>{ch.lastMessage}</p>
          </div>
          {ch.unread > 0 && (
            <div className='ml-3 flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs'>
              {ch.unread}
            </div>
          )}
        </div>
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
