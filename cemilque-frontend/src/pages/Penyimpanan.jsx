import React, { useState } from "react";
import TabelBHP from "../components/penyimpanan/TabelBHP";
import TabelBahanMakanan from "../components/penyimpanan/TabelBahanMakanan";
import FormPopup from "../components/penyimpanan/FormPopup";
import Menu from "../components/penyimpanan/MenuMakanan";
import { Button } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";

const Penyimpanan = () => {
  const [openPopup, setOpenPopup] = useState(false);

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleSuccess = () => {
    console.log("Data berhasil disimpan!");
    window.location.reload()
    // Tambahkan logic refresh tabel jika perlu
  };

  return (
    <div className="h-screen overflow-auto p-6 space-y-10">
      {/* Header dan tombol tambah */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">PENYIMPANAN BARANG DAN BAHAN</h1>

        <Button
          color="green"
          onClick={() => setOpenPopup(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <PlusIcon className="h-4 w-4" />
          <span className="font-semibold text-sm">Tambah Barang</span>
        </Button>
      </div>

      {/* Menu Makanan */}
      <Menu />
 
      {/* Tabel BHP */}
      <TabelBHP />

      {/* Tabel Bahan Makanan */}
      <TabelBahanMakanan />

      {/* Popup form */}
      <FormPopup
        
        open={openPopup}
        handleClose={handleClosePopup}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default Penyimpanan;
