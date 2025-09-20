import { lazy } from 'react';

export const AuthPage = lazy(() => import('./auth'))
export const HomePage = lazy(() => import('./home'))
export const ChatPage = lazy(() => import('./chat'))
export const RegisterPage = lazy(() => import('./register'))
export const ChatMessage = lazy(() => import('./chat/ui/chatMessage'))
export const ChannelMessage = lazy(() => import('./chat/ui/channelMessage'))
export const SidebarContacts = lazy(() => import('./chat/ui/sidebarContacts'))
export const SidebarChannels = lazy(() => import('./chat/ui/sidebarChannels'))