// components/beranda/monitorBanyakPenjualan.js
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function MonitorBP() {
  const barData = [40, 60, 80, 60, 40, 70, 50];
  const dayLabels = ['S', 'S', 'R', 'K', 'J', 'S', 'M'];

  const chartData = dayLabels.map((label, index) => ({
    name: label,
    sales: barData[index],
  }));

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-gray-50 overflow-hidden">
      <div className="w-full h-full max-h-full max-w-md space-y-4 bg-white rounded-xl shadow-sm p-6 overflow-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">Penjualan Hari Ini</h1>
          <p className="text-gray-500 text-sm mt-1">Ayo Semangat Penjualan Kamu Baru Segini!</p>
        </div>

        {/* Sales Count */}
        <div className="flex flex-col items-center justify-center py-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 mb-6">
          <div className="text-4xl font-bold text-indigo-600">0</div>
          <p className="text-gray-600 text-sm mt-1">Makanan Terjual</p>
        </div>

        {/* Sales BarChart */}
        <div className="rounded-xl">
          <div className="w-full h-48 px-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Bar dataKey="sales" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t pt-4 px-2 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Penjualan Mingguan</p>
            <p className="text-xs text-gray-400 mt-1">Minggu ini</p>
          </div>
          <p className="text-2xl font-bold text-gray-800">0</p>
        </div>
      </div>
    </div>
  );
}
