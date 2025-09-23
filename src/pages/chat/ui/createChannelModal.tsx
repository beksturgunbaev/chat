import { useCreateChannel } from '../model/useCreateChannel';

const CreateChannelModal = () => {
  const { name, setName, loading, handleSubmit } = useCreateChannel();

  return (
    <div className='modal'>
      <h1 className='text-center text-2xl mb-6 font-semibold'>
        Создайте свой канал
      </h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <p className='mb-1 opacity-80'>Название канала</p>
          <input
            type='text'
            placeholder='Введите название канала'
            value={name}
            className='border border-gray-300 bg-transparent outline-none focus:border-gray-400 px-4 py-2 rounded-lg w-full'
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button
          type='submit'
          disabled={loading}
          className='w-full bg-blue-600 text-white rounded-lg h-[42px]'
        >
          {loading ? 'Загрузка...' : 'Создать'}
        </button>
      </form>
    </div>
  );
};

export default CreateChannelModal;
