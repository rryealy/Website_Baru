// src/controllers/menuController.js
import {
  getMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu
} from '../services/menuServices.js';

// GET all menus
export const getAllMenusHandler = async (req, res) => {
  try {
    const menus = await getMenus();
    res.json(menus);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data menu' });
  }
};

// GET menu by ID
export const getMenuByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await getMenuById(id);
    if (!menu) return res.status(404).json({ error: 'Menu tidak ditemukan' });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil menu' });
  }
};

// POST create new menu
export const createMenuHandler = async (req, res) => {
  try {
    const { menu_name, menu_price, menu_category, menu_url, menu_hpp } = req.body;
    const newMenu = await createMenu({ menu_name, menu_price, menu_category, menu_url, menu_hpp });
    res.status(201).json(newMenu);
  } catch (err) {
    res.status(500).json({ error: 'Gagal membuat menu' });
  }
};

// PUT update menu by ID
export const updateMenuHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { menu_name, menu_price, menu_category, menu_url, menu_hpp } = req.body;
    const updatedMenu = await updateMenu(id, { menu_name, menu_price, menu_category, menu_url, menu_hpp });
    if (!updatedMenu) return res.status(404).json({ error: 'Menu tidak ditemukan' });
    res.json(updatedMenu);
  } catch (err) {
    res.status(500).json({ error: 'Gagal memperbarui menu' });
  }
};

// DELETE menu by ID
export const deleteMenuHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMenu = await deleteMenu(id);
    if (!deletedMenu) return res.status(404).json({ error: 'Menu tidak ditemukan' });
    res.json({ message: 'Menu berhasil dihapus', deletedMenu });
  } catch (err) {
    res.status(500).json({ error: 'Gagal menghapus menu' });
  }
};
