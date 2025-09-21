import { Loader } from '@/widgets';
import { NavLink } from 'react-router-dom';
import noAva from '@/shared/assets/no-ava.jpeg';
import useSidebarContacts from '../model/useSidebarContacts';
import { DoubleCheck, SingleCheck } from '@/shared/assets/svg';

const SidebarContacts = () => {
  const { user, chats, loading } = useSidebarContacts();

  if (loading) {
    return <Loader height='70vh' />;
  }

  return (
    <>
      <div className='flex-1 overflow-y-auto p-3'>
        {chats?.length > 0 ? (
          chats?.map((el) => {
            const isSender = el.data.lastMsgSenderUid === user?.uid;
            const isSenderUid =
              el.data.lastMsgSenderUid === user?.uid
                ? el.data.lastMsgReceiverUid
                : el.data.lastMsgSenderUid;
            const displayName =
              el.data.lastMsgReceiverUid === user?.uid
                ? el.data.lastMsgSenderName
                : el.data.lastMsgReceiverName;

            const displayAvatar =
              el.data.lastMsgReceiverUid === user?.uid
                ? el.data.lastMsgSenderAvatar || noAva
                : el.data.lastMsgReceiverAvatar || noAva;

            const msgTime = el.data.lastMsgTime?.seconds
              ? new Date(el.data.lastMsgTime.seconds * 1000).toLocaleTimeString(
                  [],
                  {
                    hour: '2-digit',
                    minute: '2-digit',
                  }
                )
              : '';

            return (
              <NavLink
                to={`/app/chat/${el.chatId}?user=${isSenderUid}`}
                key={el.chatId}
                className='p-2 cursor-pointer border-b border-gray-100 flex items-center gap-2'
              >
                <div className='w-10 h-10 min-w-[40px] rounded-full overflow-hidden border'>
                  <img
                    src={displayAvatar}
                    onError={(e) => {
                      e.currentTarget.src = noAva;
                    }}
                    className='w-full h-full object-cover'
                    alt='avatar'
                  />
                </div>
                <div className='flex-1'>
                  <div className='flex justify-between items-center'>
                    <h3 className='font-semibold text-gray-800 line-clamp-1 break-all'>
                      {displayName}
                    </h3>
                    <span className='text-[10px] text-gray-400 text-nowrap'>
                      {msgTime}
                    </span>
                  </div>
                  <div className='flex justify-between items-center gap-1 text-sm text-gray-500 line-clamp-1 break-all'>
                    <span className='line-clamp-1 break-all'>
                      {el.data.lastMsgText}
                    </span>
                    {isSender ? (
                      el.data.lastMsgRead ? (
                        <DoubleCheck read={true} />
                      ) : (
                        <SingleCheck />
                      )
                    ) : (
                      el?.unreadMessagesCount > 0 && (
                        <span className='bg-green-600 text-xs px-1 py-[1px] font-medium text-nowrap rounded-full text-white'>
                          {el?.unreadMessagesCount > 99
                            ? '99+'
                            : el?.unreadMessagesCount}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </NavLink>
            );
          })
        ) : (
          <div className='flex flex-col items-center justify-center py-10 text-gray-500 align-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-12 h-12 mb-3 text-gray-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={1.5}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l1.8-3.6A7.44 7.44 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
              />
            </svg>
            <p className='text-center'>Пока нет чатов</p>
            <p className='text-sm text-gray-400'>
              Начните переписку с клиентом
            </p>
          </div>
        )}
      </div>
      <NavLink
        to='users'
        className='absolute bottom-3 right-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 font-medium text-sm rounded-2xl shadow-lg flex items-center justify-center'
      >
        Новый чат +
      </NavLink>
    </>
  );
};

export default SidebarContacts;
