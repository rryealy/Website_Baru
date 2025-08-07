// src/components/LineChartHari.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import data from "./dataset";

const LineChartHari = () => {
  const jumlahPerHari = {};

  data.forEach(item => {
    const hari = format(parseISO(item.Tanggal), "EEEE", { locale: id });
    jumlahPerHari[hari] = (jumlahPerHari[hari] || 0) + item.Jumlah;
  });

  const urutanHari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  const lineData = urutanHari.map(hari => ({
    name: hari,
    total: jumlahPerHari[hari] || 0,
  }));

  return (
    <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Total Penjualan per Hari</h2>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
          <XAxis dataKey="name" tick={{ fill: "#4B5563", fontSize: 12 }} />
          <YAxis tick={{ fill: "#4B5563", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#f9fafb",
              borderColor: "#d1d5db",
              borderRadius: 8,
            }}
            labelStyle={{
              color: "#6b7280",
              fontWeight: "500",
            }}
            itemStyle={{
              color: "#5CE65C", // selaraskan dengan stroke
            }}
            cursor={{ stroke: "#d1fadf", strokeWidth: 2 }}
          />
          <Legend
            wrapperStyle={{
              fontSize: "13px",
              color: "#6B7280",
            }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#5CE65C"
            strokeWidth={3}
            dot={{ r: 4, stroke: "#5CE65C", strokeWidth: 2, fill: "#ffffff" }}
            activeDot={{ r: 6 }}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartHari;
