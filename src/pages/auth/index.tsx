import AuthForm from './ui/form';
import { NavLink } from 'react-router-dom';

const AuthPage = () => {
  return (
    <div className='min-h-[calc(100vh-144px)] flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 px-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-xl p-8'>
        <h1 className='text-2xl font-semibold text-gray-800 text-center mb-6'>
          Авторизация
        </h1>
        <AuthForm />
        <p className='text-center text-sm text-gray-600 mt-4'>
          Нет аккаунта?{' '}
          <NavLink
            to='/sign-up'
            className='text-blue-600 hover:underline font-medium'
          >
            Зарегистрироваться
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
