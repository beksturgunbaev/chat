import { Loader } from '@/widgets';
import emptyChat from '@/shared/assets/empty-chat.png';
import useChannelMessages from '../model/useChannelMessages';

const ChannelMessage = () => {
  const {
    user,
    text,
    loading,
    setText,
    messages,
    channelName,
    sendMessage,
    messagesEndRef,
  } = useChannelMessages();

  return (
    <div className='flex-1 flex flex-col max-h-[calc(100vh-144px)] h-full overflow-hidden'>
      <div className='flex items-center gap-2 py-2 px-3 border-b border-gray-300 bg-white'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold text-lg'>
          {channelName?.charAt(0)}
        </div>
        <p className='text-gray-800 font-medium'>
          {channelName ?? 'Не указано название'}
        </p>
      </div>
      {loading ? (
        <Loader height='100%' />
      ) : (
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
              <img
                src={emptyChat}
                alt='Пустой чат'
                className='w-24 h-24 mb-4'
              />
              <p>Здесь пока нет сообщений</p>
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>
      )}
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
    </div>
  );
};

export default ChannelMessage;
