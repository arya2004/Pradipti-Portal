import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { ProgramManagement } from "./pages/ProgramManagement";
import { ProgramManagementDashboard } from "./pages/ProgramManagementDashboard";
import { CollegeManagement } from "./pages/CollegeManagement";
import { Notifications } from "./pages/Notification";
import { Admin } from "./pages/Admin"
import Footer from "./components/Footer"; // Import Footer component
import Footer from "./components/Footer";
import { CollegeDetails } from "./pages/CollegeDetails";

export default function App() {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <BrowserRouter>
      <div className="font-montserrat flex flex-col min-h-screen">
        {/* Main container: Sidebar + Content */}
        <div className="flex flex-grow">
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
            className={`fixed md:static inset-y-0 left-0 bg-white shadow-lg transform ${
              showMobileSidebar ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 transition-transform duration-200 ease-in-out z-50 md:z-0 w-64`}
          >
            <Sidebar onClose={() => setShowMobileSidebar(false)} />
          </div>

          {/* Main content */}
          <main className="flex-grow bg-gray-50">
            <div className="p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route
                  path="/program-management-dashboard"
                  element={<ProgramManagementDashboard />}
                />
                <Route
                  path="/program/:programId"
                  element={<ProgramManagement />}
                />
                <Route
                  path="/college-management"
                  element={<CollegeManagement />}
                />
                <Route
                  path="/admin"
                  element={<Admin />}
                />
                <Route
                  path="/notifications"
                  element={<Notifications />}
                />
                <Route path="/college-details" element={<CollegeDetails />} />
                <Route path="*" element={<div>404: Page Not Found</div>} />
              </Routes>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
