import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Layout from '../layout';
import PrivateRoute from './private';
import { AuthPage, ChatPage, HomePage, RegisterPage } from '@/pages';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path='sign-in' element={<AuthPage />} />
      <Route path='sign-up' element={<RegisterPage />} />
      <Route element={<PrivateRoute />}>
        <Route path='chat' element={<ChatPage />} />
      </Route>
    </Route>
  )
);
