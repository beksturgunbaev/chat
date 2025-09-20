import { NavLink } from 'react-router-dom';
import noAva from '@/shared/assets/no-ava.jpeg';
import useSidebarContacts from '../model/useSidebarContacts';

const SidebarContacts = () => {
  const { user, chats } = useSidebarContacts();
  console.log(chats);
  return (
    <div className='flex-1 overflow-y-auto p-3'>
      {chats?.map((el) => (
        <NavLink
          to={`/app/chat/${el?.chatId}`}
          key={el?.chatId}
          className='p-2 cursor-pointer border-b border-gray-100 flex items-center gap-2'
        >
          <div className='w-10 h-10 min-w-[40px] rounded-full overflow-hidden border'>
            <img
              src={
                el?.data?.lastMsgReceiverUid === user?.uid
                  ? el?.data?.lastMsgSenderAvatar || noAva
                  : el?.data?.lastMsgReceiverAvatar || noAva
              }
              onError={(e) => {
                e.currentTarget.src = noAva;
              }}
              className='w-full h-full object-cover'
              alt='avatar'
            />
          </div>
          <div>
            <h3 className='font-semibold text-gray-800 line-clamp-1 break-all'>
              {el?.data?.lastMsgReceiverUid === user?.uid
                ? el?.data?.lastMsgSenderName
                : el?.data?.lastMsgReceiverName}
            </h3>
            <p className='text-sm text-gray-500 line-clamp-1 break-all'>
              {el?.data?.lastMsgText}
            </p>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default SidebarContacts;
