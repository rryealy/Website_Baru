import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";
import data from "./dataset";

const BarChartProduk = () => {
  const barData = data.map(item => ({
    name: item.Produk,
    jumlah: item.Jumlah,
  }));

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Grafik Penjualan Produk</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barData} barCategoryGap="20%">
          <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ backgroundColor: "#f9f9f9", borderRadius: 8 }} />
          <Legend />
          <Bar dataKey="jumlah" fill="#5CE65C" radius={[10, 10, 0, 0]}></Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartProduk;
