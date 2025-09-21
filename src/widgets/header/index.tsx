import { NavLink } from 'react-router-dom';

const Header = () => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  return (
    <header className='bg-gradient-to-r from-blue-500 to-purple-600 flex justify-between items-center border-b border-b-gray-400 px-8 h-[72px] bg-white/10'>
      <NavLink to='' className='text-2xl font-bold text-white'>
        Chatify
      </NavLink>
      {user ? (
        <div className='flex items-center gap-6'>
          <div className='flex items-center gap-3 text-white hover:opacity-80 transition'>
            <span className='font-medium hidden md:block'>
              {user.fullName || 'Профиль'}
            </span>
            <div className='w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold text-lg'>
              {user?.fullName.charAt(0)}
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('user');
              window.location.reload();
            }}
            className='px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition'
          >
            Выйти
          </button>
        </div>
      ) : (
        <div className='flex gap-4'>
          <NavLink
            to='/sign-in'
            className='px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition'
          >
            Войти
          </NavLink>
          <NavLink
            to='/sign-up'
            className='px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition'
          >
            Регистрация
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
