const pool = require('../../utils/conexion_db');

const RoutineTaskModel = {
  create: async (data) => {
    const query = `
      INSERT INTO routine_tasks (routine_id, task_id, day_of_week, start_time, end_time)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [
      data.routine_id,
      data.task_id,
      data.day_of_week,
      data.start_time,
      data.end_time
    ]);
    return result.insertId;
  },

  getByRoutine: async (routineId) => {
    console.log("getByRoutine " + routineId);
    const query = `SELECT rt.id as id, rt.routine_id, rt.task_id as task_id, rt.day_of_week as day_of_week, rt.start_time as start_time, rt.end_time as end_time,t.title, t.description FROM routine_tasks rt JOIN tasks t ON rt.task_id = t.id WHERE routine_id = ?`;
    const [rows] = await pool.query(query, [routineId]);
    return rows;
  },

  update: async (id, data) => {
    const query = `
      UPDATE routine_tasks
      SET day_of_week = ?, start_time = ?, end_time = ?
      WHERE id = ?
    `;
    const [result] = await pool.query(query, [
      data.day_of_week,
      data.start_time,
      data.end_time,
      id
    ]);
    return result.affectedRows > 0;
  },

  remove: async (id) => {
    const query = `DELETE FROM routine_tasks WHERE id = ?`;
    const [result] = await pool.query(query, [id]);
    return result.affectedRows > 0;
  }
};

module.exports = RoutineTaskModel;
