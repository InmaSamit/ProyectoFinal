const pool = require('../../utils/conexion_db');


const RoutineModel = {
  create: async (user_id, name) => {
    const query = 'INSERT INTO routines (user_id, name) VALUES (?, ?)';
    const [result] = await pool.query(query, [user_id, name]);
    return result.insertId;
  },

  getAllByUser: async (userId) => {
    const query = 'SELECT * FROM routines WHERE user_id = ?';
    const [rows] = await pool.query(query, [userId]);
    return rows;
  },

  getById: async (id) => {
    const query = 'SELECT * FROM routines WHERE id = ?';
    const [rows] = await pool.query(query, [id]);
    return rows[0];
  },

  update: async (id, { name }) => {
    const query = 'UPDATE routines SET name = ? WHERE id = ?';
    const [result] = await pool.query(query, [name, id]);
    return result.affectedRows > 0;
  },

  remove: async (id) => {
    const query = 'DELETE FROM routines WHERE id = ?';
    const [result] = await pool.query(query, [id]);
    return result.affectedRows > 0;
  }
};

module.exports = RoutineModel;
