import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { StatCard } from './components/StatCard';
import { CollegeTable } from './components/CollegeTable';
import { api } from './api/mockData';

function App() {
  const [colleges, setColleges] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data when component mounts
    const fetchData = async () => {
      try {
        const [collegesData, statsData] = await Promise.all([
          api.fetchColleges(),
          api.fetchStats()
        ]);
        
        setColleges(collegesData);
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Overview</h2>
          <div className="text-blue-600">Welcome, Admin</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Applications" value={stats.total} type="total" />
          <StatCard title="Pending Applications" value={stats.pending} type="pending" />
          <StatCard title="Approved Applications" value={stats.approved} type="approved" />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">College Tracking</h3>
          <CollegeTable colleges={colleges} loading={loading} />
        </div>
      </main>
    </div>
  );
}

export default App;