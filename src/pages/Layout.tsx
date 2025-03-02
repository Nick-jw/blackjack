import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';

function Layout() {
  const location = useLocation();

  useEffect(() => {
    const titleMap = {
      '/': 'Loading...',
      '/game': 'Blackjack',
    };
    const pathName = location.pathname || '/';
    document.title = titleMap[pathName as keyof typeof titleMap];
    return () => {
      document.title = 'Loading...';
    };
  }, [location.pathname]);
  return (
    <div className="h-screen w-full">
      <Outlet />
    </div>
  );
}

export default Layout;
