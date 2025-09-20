import { NavLink } from 'react-router-dom';
import mainImg from '@/shared/assets/main.png';

const HomePage = () => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  return (
    <div className='bg-gradient-to-r from-blue-500 to-purple-600 min-h-[calc(100vh-144px)] py-5 flex flex-col'>
      <main className='flex-1 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16'>
        <div className='text-white max-w-lg space-y-6'>
          <h2 className='text-4xl font-bold'>
            Общайся с друзьями и коллегами в Chatify
          </h2>
          <p className='text-lg'>
            Создавай свои каналы, подписывайся на интересные и общайся в
            реальном времени. Всё что нужно для продуктивного общения!
          </p>
          <div className='flex gap-4'>
            <NavLink
              to={user ? '/app/chat' : '/sign-up'}
              className='px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition'
            >
              Начать
            </NavLink>
            <NavLink
              to={user ? '/app/chat' : '/sign-in'}
              className='px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition'
            >
              {user ? 'Перейти в чат' : 'Войти'}
            </NavLink>
          </div>
        </div>
        <div>
          <img src={mainImg} alt='chat image' />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
