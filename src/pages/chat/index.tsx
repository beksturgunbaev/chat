import { useState } from 'react';
import useMain from './model/useMain';
import EmptyChat from './ui/emptyChat';
import { SidebarOutlet } from './ui/outlet';
import { NavLink, Outlet } from 'react-router-dom';

const ChatPage = () => {
  const { isEmptyRight } = useMain();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className='flex h-[calc(100vh-142px)] bg-gray-100 relative'>
      <aside
        className={`
          w-64 sm:w-80 bg-white border-r border-gray-300 flex flex-col
          fixed sm:relative sm:flex z-30 h-full
          ${sidebarOpen ? 'left-0' : '-left-full'} transition-all duration-300
        `}
      >
        <div className='flex items-center p-2'>
          <NavLink
            to='chat'
            className='px-3 py-1 text-sm w-1/2 border-b-2 border-gray-200 aria-[current=page]:border-blue-600 aria-[current=page]:text-blue-600 text-center transition-all font-medium text-gray-600'
          >
            Чаты
          </NavLink>
          <NavLink
            to='channels'
            className='px-3 py-1 text-sm w-1/2 border-b-2 border-gray-200 aria-[current=page]:border-blue-600 aria-[current=page]:text-blue-600 text-center transition-all font-medium text-gray-600'
          >
            Каналы
          </NavLink>
        </div>
        <SidebarOutlet />
      </aside>

      {/* Overlay для мобильного sidebar */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/30 z-20 sm:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className='flex-1 flex flex-col'>
        {/* Верхняя панель с кнопкой для mobile */}
        <div className='flex items-center justify-between p-2 sm:hidden bg-white border-b border-gray-300'>
          <button
            onClick={() => setSidebarOpen(true)}
            className='px-3 py-1 bg-blue-600 text-white rounded-lg'
          >
            Меню
          </button>
          <h2 className='text-lg font-bold'>Chatify</h2>
          <div />
        </div>

        {/* Контент */}
        <div className='flex-1 flex items-center justify-center'>
          {isEmptyRight ? (
            <EmptyChat
              title='Выберите чат или канал'
              desc='Начните общение с друзьями, создайте новые каналы или подпишитесь на существующие'
            />
          ) : (
            <Outlet />
          )}
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
