import React from "react";
import {
  LayoutDashboard,
  BookOpen,
  Building2,
  UserCog,
  Bell,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Sidebar({ onClose }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="p-4 border-b">
        <img src="/image.png"></img>
      </div>
      <nav className="font-montserrat p-4">
        <SidebarLink
          href="/"
          icon={<LayoutDashboard size={20} />}
          active={isActive("/")}
          onClick={onClose}
        >
          Dashboard
        </SidebarLink>
        <SidebarLink
          href="/program-management-dashboard"
          icon={<BookOpen size={20} />}
          active={isActive("/program-management-dashboard")}
          onClick={onClose}
        >
          Program Management
        </SidebarLink>
        <SidebarLink
          href="/college-management"
          icon={<Building2 size={20} />}
          active={isActive("/college-management")}
          onClick={onClose}
        >
          College Management
        </SidebarLink>
        <SidebarLink href="/admin" 
        icon={<UserCog size={20} />} 
        active={isActive("/admin")}
        onClick={onClose}
        >
          Admin
        </SidebarLink>
        <SidebarLink href="/notifications" 
        icon={<Bell size={20} />} 
        active={isActive("/notifications")}
        onClick={onClose}
        >          
          Notifications
        </SidebarLink>
      </nav>
    </>
  );
}

function SidebarLink({ href, icon, children, active, onClick }) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={`flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
        active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
