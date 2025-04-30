const pool = require('../../utils/conexion_db');

module.exports = {
  create: async (taskData) => {
    const query = `
      INSERT INTO tasks (goal_id, title, description, duration_minutes)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [
      taskData.goal_id,
      taskData.title,
      taskData.description || null,
      taskData.duration_minutes || null
    ]);
    return result.insertId;
  },

  getAllByGoal: async (goalId) => {
    const query = 'SELECT * FROM tasks WHERE goal_id = ?';
    const [rows] = await pool.query(query, [goalId]);
    return rows;
  },

  update: async (id, data) => {
    const query = `
      UPDATE tasks SET title = ?, description = ?, duration_minutes = ?
      WHERE id = ?
    `;
    const [result] = await pool.query(query, [
      data.title,
      data.description || null,
      data.duration_minutes || null,
      id
    ]);
    return result.affectedRows > 0;
  },

  remove: async (id) => {
    const query = 'DELETE FROM tasks WHERE id = ?';
    const [result] = await pool.query(query, [id]);
    return result.affectedRows > 0;
  }
};
