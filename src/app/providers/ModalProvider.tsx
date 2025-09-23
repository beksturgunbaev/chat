import { createContext, useState, useContext, type ReactNode } from 'react';

interface ModalContextType {
  handleOpen: (modalId: string) => void;
  handleClose: () => void;
  activeModal: string | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleOpen = (modalId: string) => setActiveModal(modalId);
  const handleClose = () => setActiveModal(null);

  return (
    <ModalContext.Provider value={{ activeModal, handleOpen, handleClose }}>
      {children}
    </ModalContext.Provider>
  );
};
