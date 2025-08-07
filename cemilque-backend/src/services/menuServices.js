// src/services/menuServices.js
import { query } from '../db.js';

// CREATE
export const createMenu = async ({ menu_name, menu_price, menu_category, menu_url, menu_hpp }) => {
  const result = await query(
    `INSERT INTO menu_tb (menu_name, menu_price, menu_category, menu_url, menu_hpp)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [menu_name, menu_price, menu_category, menu_url, menu_hpp]
  );
  return result.rows[0];
};

// READ ALL
export const getMenus = async () => {
  const result = await query('SELECT * FROM menu_tb');
  return result.rows;
};

// READ BY ID
export const getMenuById = async (id) => {
  const result = await query('SELECT * FROM menu_tb WHERE menu_id = $1', [id]);
  return result.rows[0];
};

// UPDATE
export const updateMenu = async (id, { menu_name, menu_price, menu_category, menu_url, menu_hpp }) => {
  const result = await query(
    `UPDATE menu_tb
     SET menu_name = $1,
         menu_price = $2,
         menu_category = $3,
         menu_url = $4,
         menu_hpp = $5
     WHERE menu_id = $6
     RETURNING *`,
    [menu_name, menu_price, menu_category, menu_url, menu_hpp, id]
  );
  return result.rows[0];
};

// DELETE
export const deleteMenu = async (id) => {
  const result = await query('DELETE FROM menu_tb WHERE menu_id = $1 RETURNING *', [id]);
  return result.rows[0];
};
