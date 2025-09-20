import useAuth from '../model';

const AuthForm = () => {
  const { formData, handleChange, handleSubmit } = useAuth();

  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      <div>
        <label
          htmlFor='email'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          E-mail
        </label>
        <input
          type='text'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Введите e-mail'
          className='w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-gray-400 outline-none'
          required
        />
      </div>
      <div>
        <label
          htmlFor='password'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          Пароль
        </label>
        <input
          type='password'
          id='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='Введите пароль'
          className='w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-gray-400 outline-none'
          required
        />
      </div>
      <button
        type='submit'
        className='w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition font-medium'
      >
        Войти
      </button>
    </form>
  );
};

export default AuthForm;
