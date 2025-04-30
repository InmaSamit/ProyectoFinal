const pool = require('../../utils/conexion_db');

module.exports = {
  create: async (goal) => {
    const query = 'INSERT INTO goals (title, interest_id) VALUES (?, ?)';
    const [result] = await pool.query(query, [goal.title, goal.interest_id]);
    return result.insertId;
  },

  getByInterest: async (interestId) => {
    const [rows] = await pool.query('SELECT * FROM goals WHERE interest_id = ?', [interestId]);
    return rows;
  }
};
