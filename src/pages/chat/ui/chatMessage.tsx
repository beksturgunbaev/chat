import emptyChat from '@/shared/assets/empty-chat.png';
import useChatMessages from '../model/useChatMessages';
import { Loader } from '@/widgets';

const ChatMessage = () => {
  const {
    user,
    text,
    loading,
    setText,
    receiver,
    messages,
    sendMessage,
    messagesEndRef,
  } = useChatMessages();

  return (
    <div className='flex-1 flex flex-col max-h-[calc(100vh-144px)] h-full overflow-hidden'>
      <div className='flex items-center gap-2 py-2 px-3 border-b border-gray-300 bg-white'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold text-lg'>
          {receiver?.fullName.charAt(0)}
        </div>
        <p className='text-gray-800 font-medium'>{receiver?.fullName}</p>
      </div>
      {loading ? (
        <Loader height='100%' />
      ) : (
        <div className='flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50'>
          {messages?.length > 0 ? (
            messages?.map((el) => (
              <div
                key={el?.id}
                className={`${
                  el?.senderUid === user?.uid
                    ? 'bg-blue-600 text-white ml-auto'
                    : 'bg-white text-gray-800'
                } max-w-[80%] md:w-max px-4 py-2 rounded-2xl shadow `}
              >
                {el?.text}
              </div>
            ))
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

export default ChatMessage;
