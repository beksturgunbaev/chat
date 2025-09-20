import { useLocation } from 'react-router-dom';

const useMain = () => {
    const location = useLocation();
    const isEmptyRight =
        location.pathname === '/app/chat' ||
        location.pathname === '/app/channels' ||
        location.pathname === '/app';

    return { isEmptyRight }
}

export default useMain
