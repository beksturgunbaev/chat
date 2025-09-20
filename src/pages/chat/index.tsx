import useMain from './model/useMain';
import EmptyChat from './ui/emptyChat';
import { SidebarOutlet } from './ui/outlet';
import { NavLink, Outlet } from 'react-router-dom';

const ChatPage = () => {
  const { isEmptyRight } = useMain();

  return (
    <div className='flex h-[calc(100vh-142px)] bg-gray-100'>
      <aside className='w-1/4 bg-white border-r border-gray-300 flex flex-col'>
        <div className='flex items-center p-2'>
          <NavLink
            to='chat'
            className='px-3 py-1 text-sm w-1/2 border-b-2 border-gray-200 aria-[current=page]:border-blue-600 aria-[current=page]:text-blue-600 text-center transition-all font-medium text-gray-600 hover:border-blue-600 hover:text-blue-600'
          >
            Чаты
          </NavLink>
          <NavLink
            to='channels'
            className='px-3 py-1 text-sm w-1/2 border-b-2 border-gray-200 aria-[current=page]:border-blue-600 aria-[current=page]:text-blue-600 text-center transition-all font-medium text-gray-600 hover:border-blue-600 hover:text-blue-600'
          >
            Каналы
          </NavLink>
        </div>
        <SidebarOutlet />
      </aside>
      <main className='flex-1 flex items-center justify-center'>
        {isEmptyRight ? (
          <EmptyChat
            title='Выберите чат или канал'
            desc='Начните общение с друзьями, создайте новые каналы или подпишитесь на существующие'
          />
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default ChatPage;
