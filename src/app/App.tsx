import { router } from './router';
import { ModalProvider } from './providers';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  );
}

export default App;
