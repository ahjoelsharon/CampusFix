import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, FileText, PlusCircle, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

export default function Layout({ allowedRoles = [] }) {
  const { user, profile, loading, signOut } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user || !profile) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(profile.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  const isStudent = profile.role === 'STUDENT';
  const isAdmin = profile.role === 'ADMIN';

  const studentNav = [
    { name: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
    { name: 'My Complaints', href: '/student/complaints', icon: FileText },
    { name: 'Report Issue', href: '/student/complaints/new', icon: PlusCircle },
    { name: 'Profile', href: '/student/profile', icon: User },
  ];

  const adminNav = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'All Complaints', href: '/admin/complaints', icon: FileText },
    { name: 'Profile', href: '/admin/profile', icon: User },
  ];

  const navigation = isStudent ? studentNav : adminNav;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={clsx(
        "fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transition duration-200 ease-in-out transform lg:translate-x-0 lg:static lg:inset-auto",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-center h-16 bg-slate-950 px-4">
          <span className="text-2xl font-bold tracking-tight text-blue-500">CampusFix</span>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  "flex items-center px-4 py-3 rounded-lg transition-colors",
                  isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-800 hover:text-white"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-0 w-full p-4">
          <button 
            onClick={signOut}
            className="flex w-full items-center px-4 py-3 text-gray-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 lg:justify-end">
          <button 
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-2">
              Welcome, {profile.full_name}
            </span>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
              {profile.full_name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
