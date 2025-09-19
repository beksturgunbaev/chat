import { lazy } from 'react';

export const AuthPage = lazy(() => import('./auth'))
export const HomePage = lazy(() => import('./home'))
export const ChatPage = lazy(() => import('./chat'))
export const RegisterPage = lazy(() => import('./register'))