import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StatCard } from "../components/StatCard";
import { CollegeTable } from "../components/CollegeTable";
import { api } from "../api/mockData";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import LatestNotification from "../components/LatestNotfication";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

export function Dashboard() {
  const [colleges, setColleges] = useState([]);
  const [stats, setStats] = useState([]);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [collegesData, statsData, userData, notificationsData] =
          await Promise.all([
            api.fetchColleges(),
            api.fetchStats(),
            api.fetchCurrentUser(),
            api.fetchNotifications(),
          ]);

        setColleges(collegesData);
        setStats(statsData);
        setUser(userData);
        setNotifications(notificationsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  const pieData = {
    labels: ["Approved", "Pending"],
    datasets: [
      {
        data: [stats.approved || 0, stats.pending || 0],
        backgroundColor: ["#E42600", "#3FCA5B"],
        borderWidth: 0,
      },
      {
        data: [stats.approved || 0, stats.pending || 0],
        backgroundColor: ["rgba(228, 38, 0, 0.1)", "rgba(63, 202, 91, 0.1)"],
        borderWidth: 0,
        weight: 5,
      },
      {
        data: [stats.approved || 0, stats.pending || 0],
        backgroundColor: ["rgba(70, 95, 241, 1)"],
        borderWidth: 0,
        weight: 0.5,
      },
    ],
  };
  const pieOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    cutout: "20%",
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    animation: false,
  };
  const lineData = {
    labels: ["Dec 21", "Dec 22", "Dec 23", "Dec 24", "Dec 25"],
    datasets: [
      {
        label: "Approved",
        data: [40, 60, 45, 70, 67],
        borderColor: "#21A8A8",
        backgroundColor: "#C1DED5",
        borderWidth: 2,
        fill: "origin",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#3FCA5B",
        // pointBorderColor: "#fff",
        pointBorderWidth: 2,
        order: 2,
      },
      {
        label: "Pending",
        data: [30, 45, 35, 50, 56],
        borderColor: "#e42600",
        backgroundColor: "#FDEAE6",
        borderWidth: 2,
        fill: "origin",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#E42600",
        // pointBorderColor: "#fff",
        pointBorderWidth: 2,
        order: 1,
      },
    ],
  };

  const lineOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 10,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "white",
        titleColor: "#333",
        bodyColor: "#666",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 12,
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          labelPointStyle: function (context) {
            return {
              pointStyle: "circle",
              rotation: 0,
            };
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    maintainAspectRatio: false,
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        hitRadius: 8,
        hoverRadius: 6,
      },
    },
  };

  if (error) {
    return (
      <div className="p-6 md:p-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex-grow p-6 md:p-8 pt-16 md:pt-8 bg-gray-50">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-montserrat text-2xl text-gray-800 font-semibold">
            Overview
          </h2>
          <div className="font-montserrat text-blue-600">
            {loading ? (
              <div className="font-montserrat animate-pulse bg-gray-200 h-6 w-32 rounded"></div>
            ) : (
              `Welcome, ${user?.name || "Admin"}`
            )}
          </div>
        </div>

        <div className="font-montserrat grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Applications"
            value={stats.total}
            type="total"
          />
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-montserrat text-lg font-semibold text-gray-800">
                Application Status
              </h3>
              <select className="font-montserrat border rounded-md px-2 py-1 text-sm text-gray-600 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>December 2024</option>
              </select>
            </div>
            <div className="ms-16 relative h-[300px]">
              <Pie
                data={pieData}
                options={pieOptions}
                className="w-full h-full"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center ">
                <div className="font-montserrat text-4xl font-bold text-blue-600">
                  {stats.total}
                </div>
              </div>
            </div>
          </div>

          {/* Line Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-montserrat text-lg font-semibold text-gray-800">
                Decision Trends
              </h3>
              <select className="font-montserrat border rounded-md px-2 py-1 text-sm text-gray-600 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Decision Trends</option>
              </select>
            </div>
            <div className="h-[300px]">
              <Line
                data={lineData}
                options={lineOptions}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-montserrat text-lg font-semibold mb-4">
            College Tracking
          </h3>
          <CollegeTable colleges={colleges} loading={loading} />
        </div>
      </div>
      <LatestNotification />
    </div>
  );
}
