import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function RatingsChart({ ratings }) {
  if (!ratings || ratings.length === 0) {
    return <p>No ratings available.</p>;
  }

  const data = ratings.map((r) => {
    let value = r.Value;

    if (value.includes("%")) {
      value = parseInt(value);
    } else if (value.includes("/10")) {
      value = parseFloat(value) * 10;
    } else if (value.includes("/")) {
      const [num, denom] = value.split("/").map((x) => parseFloat(x.trim()));
      value = denom && !isNaN(num) ? (num / denom) * 100 : 0;

      if (value > 100) value = value / 10;
    } else {
      value = parseInt(value) || 0;
    }

    return { source: r.Source, value: Number(value) };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="source" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Bar dataKey="value" fill="#2563eb" />
      </BarChart>
    </ResponsiveContainer>
  );

}
