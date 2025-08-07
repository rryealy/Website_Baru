import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";

const FormPopup = ({ open, handleClose, onSuccess, editData = null }) => {
  const [formData, setFormData] = useState({
    storage_name: "",
    storage_category: "",
    storage_quantity: "",
    storage_date: "",
    storage_cost: "" // Added price field
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setFormData(
        editData || {
          storage_name: "",
          storage_category: "",
          storage_quantity: "",
          storage_date: "",
          storage_cost: "" // Initialize price field
        }
      );
      setErrors({});
    }
  }, [open, editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      storage_category: value,
    }));

    if (errors["storage_category"]) {
      setErrors((prev) => ({
        ...prev,
        storage_category: null,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.storage_name.trim()) newErrors.storage_name = "Nama barang wajib diisi";
    if (!formData.storage_category) newErrors.storage_category = "Kategori wajib dipilih";
    if (!formData.storage_quantity) newErrors.storage_quantity = "Jumlah wajib diisi";
    if (!formData.storage_date) newErrors.storage_date = "Tanggal wajib diisi";
    if (!formData.storage_cost) newErrors.storage_cost = "Harga wajib diisi"; // Added validation for price
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const dataToSend = {
        ...formData,
        storage_cost: Number(formData.storage_cost) // Ensure price is sent as number
      };

      if (editData) {
        await axios.put(`http://localhost:3000/api/clients/${editData.storage_id}`, dataToSend);
      } else {
        await axios.post("http://localhost:3000/api/clients", dataToSend);
      }
      if (onSuccess) onSuccess();
      handleClose();
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
    }
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <Dialog
      open={open}
      handler={handleClose}
      dismiss={{
        enabled: true,
        escapeKey: true,
        referencePress: false,
        outsidePress: true,
      }}
    >
      <DialogHeader>{editData ? "Edit Barang" : "Tambah Barang"}</DialogHeader>

      <DialogBody className="flex flex-col gap-4">
        <div>
          <Input
            label="Nama Barang"
            name="storage_name"
            value={formData.storage_name}
            onChange={handleChange}
            error={!!errors.storage_name}
          />
          {errors.storage_name && (
            <Typography color="red" className="text-xs mt-1">
              {errors.storage_name}
            </Typography>
          )}
        </div>

        <div>
          <Select
            label="Kategori"
            value={formData.storage_category}
            onChange={handleSelectChange}
            error={!!errors.storage_category}
          >
            <Option value="BHP">BHP</Option>
            <Option value="Non-BHP">Non-BHP</Option>
            <Option value="Bahan Makanan">Bahan Makanan</Option>
          </Select>
          {errors.storage_category && (
            <Typography color="red" className="text-xs mt-1">
              {errors.storage_category}
            </Typography>
          )}
        </div>

        <div>
          <Input
            label="Jumlah"
            type="number"
            name="storage_quantity"
            value={formData.storage_quantity}
            onChange={handleChange}
            error={!!errors.storage_quantity}
          />
          {errors.storage_quantity && (
            <Typography color="red" className="text-xs mt-1">
              {errors.storage_quantity}
            </Typography>
          )}
        </div>

        <div>
          <Input
            label="Harga (Rp)"
            type="number"
            name="storage_cost"
            value={formData.storage_cost}
            onChange={handleChange}
            error={!!errors.storage_cost}
          />
          {errors.storage_cost && (
            <Typography color="red" className="text-xs mt-1">
              {errors.storage_cost}
            </Typography>
          )}
        </div>

        <div>
          <Input
            label="Tanggal"
            type="date"
            name="storage_date"
            value={formData.storage_date}
            onChange={handleChange}
            error={!!errors.storage_date}
          />
          {errors.storage_date && (
            <Typography color="red" className="text-xs mt-1">
              {errors.storage_date}
            </Typography>
          )}
        </div>
      </DialogBody>

      <DialogFooter>
        <Button variant="text" color="red" onClick={handleCancel} className="mr-2">
          Batal
        </Button>
        <Button variant="gradient" color="green" onClick={handleSubmit}>
          Simpan
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default FormPopup;