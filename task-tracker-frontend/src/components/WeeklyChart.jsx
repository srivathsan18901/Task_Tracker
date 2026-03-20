import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function WeeklyChart() {

  const data = [
    { day: "Mon", hours: 5 },
    { day: "Tue", hours: 6 },
    { day: "Wed", hours: 4 },
    { day: "Thu", hours: 7 },
    { day: "Fri", hours: 3 },
    { day: "Sat", hours: 2 },
    { day: "Sun", hours: 1 }
  ];

  return (
    <div style={{ height: "250px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="day" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Bar dataKey="hours" fill="#00ff9c" radius={[6,6,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}