import { useState, useMemo } from "react";
import data from "../components/dataset";
import {
  Card,
  Typography,
  IconButton,
  Tooltip,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";

// Format Rupiah
const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
};

// Ambil nama hari dari tanggal
const getDayName = (tanggalStr) => {
  const [day, month, year] = tanggalStr.split("/");
  const date = new Date(`${year}-${month}-${day}`);
  return date.toLocaleDateString("id-ID", { weekday: "long" });
};

// Kelompokkan data berdasarkan hari
const groupByDay = (data) => {
  const grouped = {};
  data.forEach((item) => {
    const day = getDayName(item.Tanggal);
    if (!grouped[day]) grouped[day] = [];
    grouped[day].push(item);
  });

  const orderedDays = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
  ];

  const sortedGrouped = {};
  orderedDays.forEach((day) => {
    if (grouped[day]) sortedGrouped[day] = grouped[day];
  });

  return sortedGrouped;
};

const TableList = () => {
  const dataHead = ["Produk", "Jumlah", "Harga", "Tanggal", ""];
  const [search, setSearch] = useState("");
  const [selectedDay, setSelectedDay] = useState("Semua");

  // Filter data berdasarkan pencarian dan hari
  const filteredData = useMemo(() => {
    let filtered = data;

    if (search) {
      filtered = filtered.filter((item) =>
        item.Produk.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedDay !== "Semua") {
      filtered = filtered.filter(
        (item) => getDayName(item.Tanggal) === selectedDay
      );
    }

    return filtered;
  }, [search, selectedDay]);

  const groupedData = groupByDay(filteredData);

  return (
    <Card className="p-6 w-full overflow-x-auto">
      {/* Filter & Search */}
      <div className="w-full max-w-screen-lg mx-auto mb-8 px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
            crossOrigin=""
          />
          <Select
            label="Filter Hari"
            value={selectedDay}
            onChange={(val) => setSelectedDay(val)}
            className="w-full"
          >
            <Option value="Semua">Semua</Option>
            {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map(
              (day) => (
                <Option key={day} value={day}>
                  {day}
                </Option>
              )
            )}
          </Select>
        </div>
      </div>

      {/* Grouped Table Per Hari */}
      <div className="w-full max-w-screen-lg mx-auto px-2 space-y-10">
        {Object.entries(groupedData).map(([dayName, items]) => (
          <div key={dayName}>
            {/* Header Hari */}
            <Typography
              variant="h6"
              className="text-lg font-bold text-blue-gray-800 mb-2 border-b border-blue-gray-100 pb-1"
            >
              {dayName}
            </Typography>

            {/* Tabel */}
            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
              <table className="table-fixed w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    {dataHead.map((head) => (
                      <th
                        key={head}
                        className="w-1/5 px-4 py-2 text-sm font-medium text-gray-600"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map(({ Produk, Jumlah, Harga, Tanggal }, index) => (
                    <tr
                      key={`${Produk}-${Tanggal}-${index}`}
                      className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <td className="px-4 py-2 text-sm">{Produk}</td>
                      <td className="px-4 py-2 text-sm">{Jumlah}</td>
                      <td className="px-4 py-2 text-sm">{formatRupiah(Harga)}</td>
                      <td className="px-4 py-2 text-sm">{Tanggal}</td>
                      <td className="px-4 py-2 text-sm">
                        <Tooltip content="Edit">
                          <IconButton variant="text" size="sm">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TableList;
