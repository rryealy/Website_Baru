// src/services/clientService.js
import { query } from '../db.js';

// Helper untuk format tanggal ke 'YYYY-MM-DD'
const formatDate = (rows) =>
  rows.map(row => ({
    ...row,
    storage_date: row.storage_date.toISOString().split('T')[0],
  }));

export const getClients = async () => {
  const { rows } = await query('SELECT * FROM storage_tb');
  return formatDate(rows);
};

export const createClients = async (clientData) => {
  const { 
    storage_name, 
    storage_quantity, 
    storage_date, 
    storage_category,
    storage_cost 
  } = clientData;
  
  const { rows } = await query(
    `INSERT INTO storage_tb 
      (storage_name, storage_quantity, storage_date, storage_category, storage_cost) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING *`,
    [storage_name, storage_quantity, storage_date, storage_category, storage_cost]
  );
  
  return {
    ...rows[0],
    storage_date: rows[0].storage_date.toISOString().split('T')[0],
  };
};

export const updateClients = async (clientData, clientId) => {
  const { 
    storage_name, 
    storage_quantity, 
    storage_date, 
    storage_category,
    storage_cost 
  } = clientData;
  
  const { rows } = await query(
    `UPDATE storage_tb 
     SET 
       storage_name = $1, 
       storage_quantity = $2, 
       storage_date = $3, 
       storage_category = $4,
       storage_cost = $5 
     WHERE storage_id = $6 
     RETURNING *`,
    [storage_name, storage_quantity, storage_date, storage_category, storage_cost, clientId]
  );
  
  return {
    ...rows[0],
    storage_date: rows[0].storage_date.toISOString().split('T')[0],
  };
};

export const deleteClients = async (clientId) => {
  const { rowCount } = await query(
    'DELETE FROM storage_tb WHERE storage_id = $1 RETURNING *', 
    [clientId]
  );
  return rowCount > 0;
};