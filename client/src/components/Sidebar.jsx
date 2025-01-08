import React from 'react';
import { LayoutDashboard, BookOpen, Building2, UserCog, Bell } from 'lucide-react';
import { Link } from './Link';

export function Sidebar() {
  return (
    <div className="bg-white w-64 min-h-screen shadow-lg hidden md:block">
      <div className="p-4 border-b">
        {/* <h1 className="text-2xl font-bold">प्रदीप्ति</h1> */}
        <img src="/assets/image.png"></img>
      </div>
      <nav className="p-4">
        <Link href="#" icon={<LayoutDashboard size={20} />} active>
          Dashboard
        </Link>
        <Link href="#" icon={<BookOpen size={20} />}>
          Program Management
        </Link>
        <Link href="#" icon={<Building2 size={20} />}>
          College Management
        </Link>
        <Link href="#" icon={<UserCog size={20} />}>
          Admin
        </Link>
        <Link href="#" icon={<Bell size={20} />}>
          Notifications
        </Link>
      </nav>
    </div>
  );
}