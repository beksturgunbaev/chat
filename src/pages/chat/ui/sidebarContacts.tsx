import { NavLink } from 'react-router-dom';
import noAva from '@/shared/assets/no-ava.jpeg';
import useSidebarContacts from '../model/useSidebarContacts';
import { DoubleCheck, SingleCheck } from '@/shared/assets/svg';

const SidebarContacts = () => {
  const { user, chats } = useSidebarContacts();

  return (
    <div className='flex-1 overflow-y-auto p-3'>
      {chats?.map((el) => {
        const isSender = el.data.lastMsgSenderUid === user?.uid;
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
              { hour: '2-digit', minute: '2-digit' }
            )
          : '';

        return (
          <NavLink
            to={`/app/chat/${el.chatId}`}
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
      })}
    </div>
  );
};

export default SidebarContacts;
