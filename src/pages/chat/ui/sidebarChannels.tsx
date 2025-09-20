const SidebarChannels = () => {
  return (
    <div className='flex-1 overflow-y-auto'>
      <h4>Каналы</h4>
      <div className='p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100'>
        <h3 className='font-semibold text-gray-800'>Frontend канал</h3>
        <p className='text-sm text-gray-500 truncate'>Последнее сообщение...</p>
      </div>
      <div className='p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100'>
        <h3 className='font-semibold text-gray-800'>Backend канал</h3>
        <p className='text-sm text-gray-500 truncate'>Привет 👋</p>
      </div>
    </div>
  );
};

export default SidebarChannels;
