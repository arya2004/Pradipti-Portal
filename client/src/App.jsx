import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { ProgramManagement } from './pages/ProgramManagement';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/program-management" element={<ProgramManagement />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;