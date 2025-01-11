import React from 'react';
import { LayoutDashboard, BookOpen, Building2, UserCog, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Sidebar({ onClose }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-white w-64 min-h-screen shadow-lg">
      <div className="p-4 border-b">
        <img src = "../../assets/image.png"></img>
      </div>
      <nav className="p-4">
        <SidebarLink 
          href="/" 
          icon={<LayoutDashboard size={20} />} 
          active={isActive('/')}
          onClick={onClose}
        >
          Dashboard
        </SidebarLink>
        <SidebarLink 
          href="/program-management" 
          icon={<BookOpen size={20} />}
          active={isActive('/program-management')}
          onClick={onClose}
        >
          Program Management
        </SidebarLink>
        <SidebarLink 
          href="#" 
          icon={<Building2 size={20} />}
          onClick={onClose}
        >
          College Management
        </SidebarLink>
        <SidebarLink 
          href="#" 
          icon={<UserCog size={20} />}
          onClick={onClose}
        >
          Admin
        </SidebarLink>
        <SidebarLink 
          href="#" 
          icon={<Bell size={20} />}
          onClick={onClose}
        >
          Notifications
        </SidebarLink>
      </nav>
    </div>
  );
}

function SidebarLink({ href, icon, children, active, onClick }) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={`flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
        active
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}