import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StatCard } from "../components/StatCard";
import { CollegeTable } from "../components/CollegeTable";
import { api } from "../api/mockData";

export function Dashboard() {
  const [colleges, setColleges] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [collegesData, statsData, userData] = await Promise.all([
          api.fetchColleges(),
          api.fetchStats(),
          api.fetchCurrentUser(),
        ]);

        setColleges(collegesData);
        setStats(statsData);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (error) {
    return (
      <div className="p-6 md:p-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      </div>
    );
  } /* Overview */
  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl text-tp font-SemiBold">Overview</h2>
        <div className="text-blue-600">
          {loading ? (
            <div className="animate-pulse bg-gray-200 h-6 w-32 rounded"></div>
          ) : (
            `Welcome, ${user?.name || "User"}`
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Applications" value={stats.total} type="total" />
        <StatCard
          title="Pending Applications"
          value={stats.pending}
          type="pending"
        />
        <StatCard
          title="Approved Applications"
          value={stats.approved}
          type="approved"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">College Tracking</h3>
        <CollegeTable colleges={colleges} loading={loading} />
      </div>
    </div>
  );
}
