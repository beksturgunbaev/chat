const ChannelMessage = () => {
  return (
    <div className='flex-1 flex flex-col'>
      <div className='flex items-center justify-between px-4 py-3 border-b border-gray-300 bg-white'>
        <div>
          <h2 className='text-lg font-bold text-gray-800'>Frontend канал</h2>
          <p className='text-sm text-gray-500'>35 участников</p>
        </div>
        <button className='text-blue-600 text-sm font-medium hover:underline'>
          Профиль
        </button>
      </div>
      <div className='flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50'>
        <div className='self-start max-w-xs px-4 py-2 rounded-2xl bg-white shadow text-gray-800'>
          Привет, ребята!
        </div>
        <div className='self-end max-w-xs px-4 py-2 rounded-2xl bg-blue-600 text-white shadow'>
          Всем привет 👋
        </div>
        <div className='self-start max-w-xs px-4 py-2 rounded-2xl bg-white shadow text-gray-800'>
          Как у вас дела?
        </div>
      </div>
      <div className='p-3 border-t border-gray-300 bg-white flex items-center gap-3'>
        <input
          type='text'
          placeholder='Введите сообщение...'
          className='flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button className='px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition'>
          Отправить
        </button>
      </div>
    </div>
  );
};

export default ChannelMessage;
