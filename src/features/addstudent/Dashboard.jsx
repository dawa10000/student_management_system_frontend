import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import { useGetDashboardStatsQuery } from "../../app/dashboardApi.js";

export default function Dashboard() {

  const courseColors = {
    "Data Science": "#4F46E5",
    "Data Analysis": "#22C55E",
    "Power BI": "#F59E0B",
    "Mern Stack": "#EF4444",
    "Full Stack With JS": "#06B6D4",
    "Python With Django": "#A855F7",
    "Flutter": "#14B8A6",
    "WordPress": "#F43F5E",
    "UI/UX": "#8B5CF6",
    "Graphic Design": "#F97316",
    "Cyber Security": "#10B981",
    "Digital Marketing": "#EAB308",
  };

  const { data, isLoading, error } = useGetDashboardStatsQuery();

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4">Something went wrong</p>;

  return (
    <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

      {/* Total Students */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold">Total Students</h2>
        <p className="text-2xl font-bold">{data.totalStudents}</p>
      </div>

      {/* Students Per Course */}
      <div className="bg-white shadow rounded-xl p-4 md:col-span-2">
        <h2 className="text-lg font-semibold mb-3">Students per Course</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.studentsPerCourse} margin={{ bottom: 20 }}>

            <XAxis dataKey="_id" tick={false} />
            <YAxis />
            <Tooltip />

            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {data.studentsPerCourse.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={courseColors[entry._id] || "#9CA3AF"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-4">
          {Object.entries(courseColors).map(([course, color]) => (
            <div key={course} className="flex items-center gap-2 text-sm">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              ></span>
              {course}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Students */}
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