import { BaseModal, Loader } from '@/widgets';
import ChannelMembersModal from './membersModal';
import members from '@/shared/assets/members.svg';
import emptyChat from '@/shared/assets/empty-chat.png';
import useChannelMessages from '../model/useChannelMessages';

const ChannelMessage = () => {
  const {
    user,
    text,
    loading,
    setText,
    channel,
    messages,
    handleOpen,
    activeModal,
    channelName,
    sendMessage,
    messagesEndRef,
    deleteFromChannel,
    subscribeToChannel,
    unsubscribeFromChannel,
  } = useChannelMessages();

  if (loading) {
    return <Loader height='100%' />;
  }

  if (!channel?.members?.some((member) => member?.uid === user?.uid)) {
    return (
      <div className='flex flex-col items-center justify-center py-12 px-6 text-center space-y-3'>
        <h1 className='text-2xl font-semibold'>{channelName}</h1>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-12 w-12 text-gray-400'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 4v16m8-8H4'
          />
        </svg>
        <p className='text-gray-600 font-medium'>
          Вы не подписаны на этот канал
        </p>
        <p className='text-gray-400 text-sm'>
          Подпишитесь, чтобы писать и читать сообщения
        </p>
        <button
          onClick={subscribeToChannel}
          className='mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
        >
          Подписаться
        </button>
      </div>
    );
  }

  return (
    <div className='flex-1 flex flex-col max-h-[calc(100vh-144px)] h-full overflow-hidden'>
      <div className='flex justify-between items-center px-3 py-2  border-b border-gray-300'>
        <div className='flex items-center gap-2'>
          <div className='w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold text-lg'>
            {channelName?.charAt(0)}
          </div>
          <div>
            <p className='text-gray-800 font-medium text-lg leading-[120%]'>
              {channelName ?? 'Не указано название'}
            </p>
            <p className='text-sm italic opacity-50'>
              Админ: {channel?.owner === user?.uid ? 'Вы' : channel?.ownerName}
            </p>
          </div>
        </div>
        <div className='flex gap-3 justify-end items-center'>
          <button
            onClick={() => handleOpen('members')}
            className='flex justify-center items-center flex-col opacity-70 bg-transparent outline-none border-none hover:opacity-100 transition'
          >
            <img src={members} alt='*' className='w-5' />
            <span className='text-xs leading-[80%] font-medium'>Участники</span>
          </button>
          <button
            onClick={() =>
              unsubscribeFromChannel('Вы успешно отписались от канала')
            }
            className='mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition'
          >
            Отписаться
          </button>
        </div>
      </div>
      <div className='flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50'>
        {messages?.length > 0 ? (
          messages?.map((el) => {
            const isMe = el?.senderId === user?.uid;
            return (
              <div
                key={el?.id}
                className={`flex w-full mb-4 ${
                  isMe ? 'justify-end' : 'justify-start'
                }`}
              >
                {!isMe && (
                  <div className='flex-shrink-0 mr-2'>
                    <div className='w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold'>
                      {el?.senderName?.charAt(0)}
                    </div>
                  </div>
                )}

                <div
                  className={`flex flex-col ${
                    isMe ? 'items-end' : 'items-start'
                  }`}
                >
                  {!isMe && (
                    <p className='text-xs text-gray-500 font-medium mb-1'>
                      {el?.senderName}
                    </p>
                  )}
                  <div
                    className={`px-4 py-2 rounded-2xl shadow text-sm break-words ${
                      isMe
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-900 rounded-bl-none'
                    }`}
                  >
                    <p>{el?.message}</p>
                  </div>
                  <span className='text-[10px] text-gray-400 mt-1'>
                    {el?.createdAt
                      ? new Date(
                          el?.createdAt.seconds * 1000
                        ).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : ''}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className='flex flex-col items-center justify-center h-[80%] text-gray-400 mt-10'>
            <img src={emptyChat} alt='Пустой чат' className='w-24 h-24 mb-4' />
            <p>Здесь пока нет сообщений</p>
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className='p-3 border-t border-gray-300 bg-white flex items-center gap-3'
      >
        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Введите сообщение...'
          className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-400 outline-none'
        />
        <button
          type='submit'
          className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
        >
          Отправить
        </button>
      </form>
      {activeModal === 'members' && (
        <BaseModal sx='max-w-lg'>
          <ChannelMembersModal
            userId={user?.uid}
            ownerId={channel?.owner}
            members={channel?.members}
            deleteFunc={deleteFromChannel}
          />
        </BaseModal>
      )}
    </div>
  );
};

export default ChannelMessage;
