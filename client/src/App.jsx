import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { ProgramManagement } from './pages/ProgramManagement';

export default function App() {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50">
        {/* Mobile menu button */}
        <button
          className="md:hidden fixed top-6 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
          onClick={() => setShowMobileSidebar(!showMobileSidebar)}
        >
          {showMobileSidebar ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Mobile sidebar overlay */}
        {showMobileSidebar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setShowMobileSidebar(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed md:static inset-y-0 left-0 transform ${
            showMobileSidebar ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition-transform duration-200 ease-in-out z-50 md:z-0`}
        >
          <Sidebar onClose={() => setShowMobileSidebar(false)} />
        </div>

        {/* Main content */}
        <main className="flex-1">
          <div className="md:ml-4"> {/* Changed from md:ml-64 to md:ml-4 */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/program-management" element={<ProgramManagement />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}