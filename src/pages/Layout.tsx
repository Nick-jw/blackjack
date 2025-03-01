import { Outlet } from 'react-router';

function Layout() {
  return (
    <div className="h-screen w-full">
      <Outlet />
    </div>
  );
}

export default Layout;
