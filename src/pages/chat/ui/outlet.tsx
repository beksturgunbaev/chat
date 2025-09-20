import { useLocation } from 'react-router-dom';
import SidebarContacts from './sidebarContacts';
import SidebarChannels from './sidebarChannels';

export const SidebarOutlet = () => {
  const location = useLocation();

  if (
    location.pathname.startsWith('/app/chat/') ||
    location.pathname === '/app/chat'
  ) {
    return <SidebarContacts />;
  }
  if (
    location.pathname.startsWith('/app/channels/') ||
    location.pathname === '/app/channels'
  ) {
    return <SidebarChannels />;
  }
  return null;
};
