import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";

export default function TaskPieChart() {

  const data = [
    { name: "Work", value: 60 },
    { name: "Meetings", value: 25 },
    { name: "Breaks", value: 15 }
  ];

  const COLORS = ["#00ff9c", "#ffaa00", "#ff4d4d"];

  return (
    <div style={{ height: "250px" }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={80}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}