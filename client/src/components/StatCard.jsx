import React from "react";

export function StatCard({ title, value, type }) {
  const colorsTitles = {
    "Total Applications": "text-myBlue", // Use correct title and desired color
    "Pending Applications": "text-myRed",
    "Approved Applications": "text-green-600",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className={`text-sm ${colorsTitles[title]} font-semibold`}>
        {title}
      </h3>
      <p className={`text-2xl font-bold`}>{value}</p>
    </div>
  );
}
