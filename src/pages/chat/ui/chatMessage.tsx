import noAva from '@/shared/assets/no-ava.jpeg';
import emptyChat from '@/shared/assets/empty-chat.png';
import useChatMessages from '../model/useChatMessages';
import { Loader } from '@/widgets';

const ChatMessage = () => {
  const { user, messages, loading } = useChatMessages();

  return (
    <div className='flex-1 flex flex-col max-h-[calc(100vh-144px)] h-full overflow-hidden'>
      <div className='flex items-center gap-2 py-2 px-3 border-b border-gray-300 bg-white'>
        <div className='w-12 h-12 min-w-[48px] rounded-full overflow-hidden border'>
          <img
            src={noAva}
            alt='avatar'
            className='w-full h-full object-cover'
          />
        </div>
        <p className='text-gray-800 font-medium'>Асан Айдаралиев</p>
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
        </div>
      )}
      <div className='p-3 border-t border-gray-300 bg-white flex items-center gap-3'>
        <input
          type='text'
          placeholder='Введите сообщение...'
          className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-400 outline-none'
        />
        <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'>
          Отправить
        </button>
      </div>
    </div>
  );
};

export default ChatMessage;
