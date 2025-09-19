import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className='bg-gradient-to-r from-blue-500 to-purple-600 flex justify-between items-center border-b border-b-gray-400 px-8 py-4 bg-white/10'>
      <NavLink to='' className='text-2xl font-bold text-white'>
        Chatify
      </NavLink>
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
    </header>
  );
};

export default Header;
