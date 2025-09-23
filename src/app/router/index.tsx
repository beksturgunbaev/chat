import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Layout from '../layout';
import PrivateRoute from './private';
import {
  AuthPage,
  ChatPage,
  HomePage,
  ChatMessage,
  RegisterPage,
  SidebarNewChat,
  ChannelMessage,
  SidebarContacts,
  SidebarChannels,
} from '@/pages';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path='sign-in' element={<AuthPage />} />
      <Route path='sign-up' element={<RegisterPage />} />

      <Route element={<PrivateRoute />}>
        <Route path='app' element={<ChatPage />}>
          {/* Sidebar */}
          <Route index element={<SidebarContacts />} />
          <Route path='chat' element={<SidebarContacts />} />
          <Route path='users' element={<SidebarNewChat />} />
          <Route path='channels' element={<SidebarChannels />} />

          {/* Messages */}
          <Route path='chat/:chatId' element={<ChatMessage />} />
          <Route path='channels/:channelId' element={<ChannelMessage />} />
        </Route>
      </Route>
    </Route>
  )
);
