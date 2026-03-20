import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Cell } from "recharts";
import { useGetDashboardStatsQuery } from "../../app/dashboardApi.js";


export default function Dashboard() {
  const colors = [
    "#4F46E5", // indigo
    "#22C55E", // green
    "#F59E0B", // amber
    "#EF4444", // red
    "#06B6D4", // cyan
    "#A855F7", // purple
    "#14B8A6", // teal
    "#F43F5E", // pink
  ];
  const { data, isLoading, error } = useGetDashboardStatsQuery();

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4">Something went wrong</p>;

  return (
    <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

      {/*  Total Students */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold">Total Students</h2>
        <p className="text-2xl font-bold">{data.totalStudents}</p>
      </div>

      {/*  Students Per Course (Chart) */}
      <div className="bg-white shadow rounded-xl p-4 md:col-span-2">
        <h2 className="text-lg font-semibold mb-3">Students per Course</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.studentsPerCourse}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="count" radius={[6, 6, 0, 0]} cursor="pointer">
              {data.studentsPerCourse.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}

            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/*  Recent Students */}
      <div className="bg-white shadow rounded-xl p-4 md:col-span-2 lg:col-span-1">
        <h2 className="text-lg font-semibold mb-3">Recent Students</h2>

        <div className="space-y-2">
          {data.recentStudents.map((student) => (
            <div
              key={student._id}
              className="flex justify-between text-sm border-b pb-1"
            >
              <span>{student.name}</span>
              <span>{student.courseEnrolled}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}