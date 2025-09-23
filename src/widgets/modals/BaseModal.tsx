import { useEffect, useState } from 'react';
import { useModal } from '../../app/providers';

type BaseModalProps = {
  children: React.ReactNode;
  sx?: string;
};

const BaseModal = ({ children, sx }: BaseModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const { activeModal, handleClose } = useModal();

  useEffect(() => {
    if (activeModal) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 100);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [activeModal]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-[9999] flex justify-center items-center transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-[#FCFBFF] p-4 md:p-6 rounded-lg shadow-lg w-[95%] lgScreen:w-full overflow-y-scroll max-h-[90vh] scrollable transition-transform duration-300 ${
          isAnimating ? 'scale-100' : 'scale-95'
        } ${sx}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className='absolute top-3 right-3 w-6 h-6 text-2xl cursor-pointer text-[#bec5d2] flex justify-center items-center'
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default BaseModal;
