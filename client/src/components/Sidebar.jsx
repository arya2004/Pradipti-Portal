import React from 'react';
import { LayoutDashboard, BookOpen, Building2, UserCog, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Sidebar() {
  return (
    <div className="bg-white w-64 min-h-screen shadow-lg hidden md:block">
      <div className="p-4 border-b">
        <img src = "../../assets/image.png" alt ="Pradipti Logo"></img>
      </div>
      <nav className="p-4">
        <SidebarLink href="/" icon={<LayoutDashboard size={20} />}>
          Dashboard
        </SidebarLink>
        <SidebarLink href="/program-management" icon={<BookOpen size={20} />}>
          Program Management
        </SidebarLink>
        <SidebarLink href="#" icon={<Building2 size={20} />}>
          College Management
        </SidebarLink>
        <SidebarLink href="#" icon={<UserCog size={20} />}>
          Admin
        </SidebarLink>
        <SidebarLink href="#" icon={<Bell size={20} />}>
          Notifications
        </SidebarLink>
      </nav>
    </div>
  );
}

function SidebarLink({ href, icon, children }) {
  return (
    <Link
      to={href}
      className={`flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors text-gray-600 hover:bg-gray-50`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}