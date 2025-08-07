import React, { useEffect, useState } from "react";
import axios from "axios";
import PopUpMenu from "./PopUpMenu";
import {
  Card,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

export default function MenuMakanan() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const BASE_URL = "http://localhost:3000"; // Base URL backend

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/menus`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredData = data.filter((item) =>
    item.menu_name.toLowerCase().includes(search.toLowerCase())
  );

  const formatRupiah = (angka) => {
    if (!angka) return "-";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const handleEdit = () => {
    setPopupOpen(true);
  };

  const handleSaveEdit = async (editedMenu) => {
    try {
      if (editedMenu.menu_id) {
        // MODE EDIT
        await axios.put(`${BASE_URL}/api/menus/${editedMenu.menu_id}`, editedMenu);
        const updatedData = data.map((item) =>
          item.menu_id === editedMenu.menu_id ? editedMenu : item
        );
        setData(updatedData);
        setSelectedMenu(editedMenu);
      } else {
        // MODE TAMBAH
        const response = await axios.post(`${BASE_URL}/api/menus`, editedMenu);
        const newMenu = response.data;
        setData([...data, newMenu]);
      }
      setPopupOpen(false); // Tutup popup setelah simpan
    } catch (error) {
      console.error("Gagal menyimpan menu:", error);
      alert("Gagal menyimpan menu.");
    }
  };


  const handleDelete = async () => {
  const confirm = window.confirm("Apakah benar ingin dihapus?");
  if (!confirm || !selectedMenu) return;

  try {
    await axios.delete(`${BASE_URL}/api/menus/${selectedMenu.menu_id}`);
    setData(data.filter((item) => item.menu_id !== selectedMenu.menu_id));
    setSelectedMenu(null);
  } catch (error) {
    console.error("Gagal menghapus menu:", error);
    alert("Gagal menghapus menu.");
  }
};


  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6 items-stretch">
        {/* Bagian Kiri - Tabel */}
        <div className="w-1/2 flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <Typography variant="h5" className="font-bold text-gray-900">
            🍽️ DAFTAR MENU
          </Typography>
          <Button color="blue" size="sm" onClick={() => {
            setSelectedMenu(null); // Reset form jika sebelumnya sedang edit
            setPopupOpen(true);
          }}>
            + Tambah Menu
          </Button>
        </div>
          <Card className="p-6 shadow-md rounded-xl bg-white">
            {/* Input Pencarian */}
            <div className="w-full mb-4">
              <Input
                label="Cari Nama Menu"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                crossOrigin=""
                className="w-full"
                containerProps={{ className: "min-w-[120px]" }}
              />
            </div>

            {/* Tabel */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 max-h-[320px] overflow-y-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-100 text-gray-900 uppercase text-xs">
                    {["No", "Nama Menu", "Kategori", "Harga", "HPP"].map((head) => (
                      <th
                        key={head}
                        className="px-5 py-3 font-bold tracking-wider border-b border-gray-300"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, idx) => (
                      <tr
                        key={item.menu_id}
                        className={`cursor-pointer transition-colors ${
                          selectedMenu?.menu_id === item.menu_id
                            ? "bg-gray-300"
                            : "bg-white hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedMenu(item)}
                      >
                        <td className="px-5 py-3 text-sm font-medium text-gray-900 border-b border-gray-200">
                          {idx + 1}
                        </td>
                        <td className="px-5 py-3 text-sm font-medium text-gray-900 border-b border-gray-200">
                          {item.menu_name}
                        </td>
                        <td className="px-5 py-3 text-sm text-gray-900 border-b border-gray-200">
                          {item.menu_category}
                        </td>
                        <td className="px-5 py-3 text-sm font-medium text-gray-900 border-b border-gray-200">
                          {formatRupiah(item.menu_price)}
                        </td>
                        <td className="px-5 py-3 text-sm font-medium text-gray-900 border-b border-gray-200">
                          {formatRupiah(item.menu_hpp)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-500 border-b border-gray-200"
                      >
                        {search ? "Data tidak ditemukan" : "Belum ada data"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Bagian Kanan - Detail Menu */}
        <div className="w-1/2 flex flex-col">
          <Card className="p-6 shadow-md h-full bg-white rounded-xl flex flex-col justify-between">
            {selectedMenu ? (
              <>
                <Typography variant="h6" className="mb-4 font-semibold text-gray-900">
                  {selectedMenu.menu_name}
                </Typography>
                <img
                  src={
                    selectedMenu.menu_url?.startsWith("http")
                      ? selectedMenu.menu_url
                      : `${BASE_URL}${selectedMenu.menu_url}`
                  }
                  alt={selectedMenu.menu_name}
                  className="h-52 w-full object-cover rounded mb-4"
                />

                <Typography className="mb-2 text-sm text-gray-800">
                  <strong>Kategori:</strong> {selectedMenu.menu_category}
                </Typography>
                <Typography className="mb-2 text-sm text-gray-800">
                  <strong>Harga:</strong> {formatRupiah(selectedMenu.menu_price)}
                </Typography>
                <Typography className="mb-2 text-sm text-gray-800">
                  <strong>HPP:</strong> {formatRupiah(selectedMenu.menu_hpp)}
                </Typography>
                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    size="sm" 
                    color="red"
                    onClick={handleDelete}
                  >
                    Hapus
                  </Button>
                  <Button 
                    size="sm" 
                    color="green"
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500">
                Klik salah satu menu untuk melihat detail
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* PopUp Edit Menu */}
      <PopUpMenu
        open={popupOpen}
        handleClose={() => setPopupOpen(false)}
        data={selectedMenu}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
