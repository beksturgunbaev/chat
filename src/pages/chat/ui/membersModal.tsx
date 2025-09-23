import deleteIcon from '@/shared/assets/delete.svg';

type Member = {
  uid: string;
  fullName: string;
};

type ChannelMembersModalProps = {
  userId: string;
  members: Member[];
  ownerId: string;
  deleteFunc: (value: Member) => void;
};

const ChannelMembersModal = ({
  userId,
  members,
  ownerId,
  deleteFunc,
}: ChannelMembersModalProps) => {
  const getMemberText = (count: number) => {
    if (count === 0) return 'участников';
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'участников';
    if (lastDigit === 1) return 'участник';
    if (lastDigit >= 2 && lastDigit <= 4) return 'участника';
    return 'участников';
  };

  return (
    <>
      <h2 className='text-2xl font-semibold text-center'>Участники канала</h2>
      <p className='text-center text-sm opacity-50'>
        <strong>{members?.length}</strong> {getMemberText(members?.length || 0)}{' '}
        в канале
      </p>
      <ul className='space-y-2 max-h-96 overflow-y-auto mt-3'>
        {members?.map((member) => (
          <li key={member.uid} className='flex justify-between items-center'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold text-lg mr-2'>
                {member.fullName.charAt(0).toUpperCase()}
              </div>
              <span className='text-gray-800 font-medium'>
                {member.fullName}
              </span>
            </div>
            {ownerId === userId && (
              <img
                src={deleteIcon}
                alt='*'
                className='cursor-pointer w-5'
                onClick={() => deleteFunc(member)}
              />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChannelMembersModal;
