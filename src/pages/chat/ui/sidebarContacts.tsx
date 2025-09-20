import { NavLink } from 'react-router-dom';

const SidebarContacts = () => {
  return (
    <div className='flex-1 overflow-y-auto p-3'>
      <NavLink
        to='/app/chat/csdsd'
        className='p-2 cursor-pointer border-b border-gray-100 flex'
      >
        <div>
          <h3 className='font-semibold text-gray-800'>Frontend канал</h3>
          <p className='text-sm text-gray-500 truncate'>
            Последнее сообщение...
          </p>
        </div>
      </NavLink>
      <NavLink
        to='/app/chat/dfvd'
        className='p-2 cursor-pointer border-b border-gray-100 flex'
      >
        <div>
          <h3 className='font-semibold text-gray-800'>Backend канал</h3>
          <p className='text-sm text-gray-500 truncate'>Привет 👋</p>
        </div>
      </NavLink>
    </div>
  );
};

export default SidebarContacts;
