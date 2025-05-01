const pool = require('../../utils/conexion_db');

module.exports = {
  create: async (interest, user) => {
    const query = 'INSERT INTO interests (title, description, user_id) VALUES (?, ?, ?)';
    const [result] = await pool.query(query, [interest.title, interest.description, user]);
    return result.insertId;
  },

  getAllByUser: async (userId) => {
    const [rows] = await pool.query('SELECT * FROM interests WHERE user_id = ?', [userId]);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM interests WHERE id = ?', [id]);
    return rows;
  },


  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM interests WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};
