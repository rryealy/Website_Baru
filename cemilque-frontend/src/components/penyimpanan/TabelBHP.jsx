import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Typography,
  IconButton,
  Tooltip,
  Input,
  Select,
  Option,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import FormPopup from "./FormPopup";

// Format Rupiah function
const formatRupiah = (angka) => {
  if (angka === null || angka === undefined || isNaN(angka)) return '-';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(angka);
};

const TabelBHP = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedIdToDelete, setSelectedIdToDelete] = useState(null);
  const [successNotification, setSuccessNotification] = useState({
    open: false,
    message: "",
    type: ""
  });

  const itemsPerPage = 10;

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/clients");
      setData(res.data);
    } catch (err) {
      setError("Gagal memuat data");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const confirmDelete = (id) => {
    setSelectedIdToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const performDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/clients/${selectedIdToDelete}`);
      fetchData();
      setSuccessNotification({
        open: true,
        message: "Berhasil dihapus",
        type: "delete"
      });
    } catch (err) {
      console.error("Gagal menghapus data:", err);
    } finally {
      setDeleteConfirmOpen(false);
      setSelectedIdToDelete(null);
    }
  };

  const handleEdit = (item) => {
    setEditData(item);
    setPopupOpen(true);
  };

  const closeNotification = () => {
    setSuccessNotification({
      open: false,
      message: "",
      type: ""
    });
  };

  const filtered = data.filter((item) => {
    const nama = item.storage_name || "";
    const kategori = item.storage_category || "";

    const cocokNama = nama.toLowerCase().includes(search.toLowerCase());
    const cocokKategori =
      (kategori === "BHP" || kategori === "Non-BHP") &&
      (kategoriFilter === "Semua" || kategori === kategoriFilter);

      return cocokNama && cocokKategori;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <Card className="p-6 w-full shadow-md rounded-xl bg-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <Typography variant="h5" className="font-bold text-gray-900">
            🏥 DATA BHP & NON-BHP
          </Typography>

          <div className="flex flex-col md:flex-row gap-2 w-full md:w-2/3">
            <Select
              label="Filter Kategori"
              value={kategoriFilter}
              onChange={(val) => {
                setKategoriFilter(val);
                setCurrentPage(1);
              }}
              className="min-w-[150px]"
            >
              <Option value="Semua">Semua Kategori</Option>
              <Option value="BHP">BHP</Option>
              <Option value="Non-BHP">Non-BHP</Option>
            </Select>
            
            <Input
              type="text"
              label="Cari Nama"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="flex-grow"
            />
          </div>
        </div>

        {error ? (
          <Typography className="text-red-500 text-center py-4">{error}</Typography>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-900">
                  {["No", "Nama", "Kategori", "Jumlah", "Harga", "Tanggal", "Aksi"].map((head) => (
                    <th 
                      key={head} 
                      className="px-5 py-3 text-xs font-bold uppercase tracking-wider border-b border-gray-300"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, i) => (
                    <tr 
                      key={item.storage_id || i} 
                      className="bg-white hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-5 py-3 text-sm font-medium text-gray-900 border-b border-gray-200">
                        {(currentPage - 1) * itemsPerPage + i + 1}
                      </td>
                      <td className="px-5 py-3 text-sm font-medium text-gray-900 border-b border-gray-200">
                        {item.storage_name ?? "-"}
                      </td>
                      <td className="px-5 py-3 text-sm border-b border-gray-200">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          item.storage_category === "BHP" 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {item.storage_category ?? "-"}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-900 border-b border-gray-200">
                        <span className="px-2 py-1 bg-gray-100 text-gray-900 rounded-full text-xs">
                          {item.storage_quantity ?? "-"}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-sm font-medium text-gray-900 border-b border-gray-200">
                        {formatRupiah(item.storage_cost)}
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-900 border-b border-gray-200">
                        {item.storage_date ?? "-"}
                      </td>
                      <td className="px-5 py-3 text-sm border-b border-gray-200">
                        <div className="flex gap-1">
                          <Tooltip content="Edit" placement="top">
                            <IconButton
                              size="sm"
                              color="blue"
                              variant="text"
                              onClick={() => handleEdit(item)}
                              className="rounded-md hover:bg-blue-50"
                            >
                              <PencilIcon className="h-4 w-4 text-gray-700" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Hapus" placement="top">
                            <IconButton
                              size="sm"
                              color="red"
                              variant="text"
                              onClick={() => confirmDelete(item.storage_id)}
                              className="rounded-md hover:bg-red-50"
                            >
                              <TrashIcon className="h-4 w-4 text-gray-700" />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-gray-500 border-b border-gray-200">
                      {search || kategoriFilter !== "Semua" ? "Data tidak ditemukan" : "Belum ada data"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-5">
            <Typography variant="small" color="gray" className="font-normal">
              Halaman {currentPage} dari {totalPages}
            </Typography>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="outlined"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                &lt;
              </Button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    size="sm"
                    variant={currentPage === pageNum ? "filled" : "outlined"}
                    color={currentPage === pageNum ? "blue" : "gray"}
                    onClick={() => handlePageChange(pageNum)}
                    className={`rounded-full ${
                      currentPage === pageNum 
                        ? 'bg-blue-500' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              <Button
                size="sm"
                variant="outlined"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                &gt;
              </Button>
            </div>
          </div>
        )}
      </Card>

      <FormPopup
        open={popupOpen}
        handleClose={() => {
          setPopupOpen(false);
          setEditData(null);
        }}
        onSuccess={() => {
          fetchData();
          setPopupOpen(false);
          setEditData(null);
          setSuccessNotification({
            open: true,
            message: "Berhasil diedit",
            type: "edit"
          });
        }}
        editData={editData}
      />

      <Dialog 
        open={deleteConfirmOpen} 
        handler={() => setDeleteConfirmOpen(false)}
        size="xs"
      >
        <DialogHeader className="border-b border-gray-200 pb-3">
          <Typography variant="h6" className="text-gray-900">Konfirmasi Penghapusan</Typography>
        </DialogHeader>
        <DialogBody className="py-5">
          <Typography className="text-sm text-gray-700">
            Apakah Anda yakin ingin menghapus:
          </Typography>
          <Typography className="font-bold text-base mt-2 text-gray-900">
            {data.find((item) => item.storage_id === selectedIdToDelete)?.storage_name || "Item ini"}?
          </Typography>
          <Typography className="text-xs text-gray-600 mt-2">
            Data yang dihapus tidak dapat dikembalikan
          </Typography>
        </DialogBody>
        <DialogFooter className="border-t border-gray-200 pt-4">
          <Button
            variant="text"
            color="gray"
            onClick={() => setDeleteConfirmOpen(false)}
            className="mr-2 hover:bg-gray-100 text-gray-700"
          >
            Batal
          </Button>
          <Button 
            color="red" 
            onClick={performDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Hapus
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog
        open={successNotification.open}
        handler={closeNotification}
        size="xs"
        className="bg-white border border-gray-200"
      >
        <DialogBody className="flex flex-col items-center justify-center p-6">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mb-4" />
          <Typography variant="h5" className="text-center text-gray-900">
            {successNotification.message}
          </Typography>
          <Typography variant="small" className="text-center text-gray-600 mt-2">
            {successNotification.type === "edit"
              ? "Perubahan data telah disimpan"
              : "Data telah berhasil dihapus"}
          </Typography>
        </DialogBody>
        <DialogFooter className="flex justify-center pb-6">
          <Button
            color="green"
            onClick={closeNotification}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Tutup
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default TabelBHP;