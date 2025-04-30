const { body, param, validationResult } = require('express-validator');
const TaskModel = require('../models/task.models');

const createTask = async (req, res) => {
  await body('goal_id').isInt().withMessage('El objetivo es obligatorio').run(req);
  await body('title').notEmpty().withMessage('El título es obligatorio').run(req);
  await body('description').optional().isString().run(req);
  await body('duration_minutes').optional().isInt({ min: 1 }).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const id = await TaskModel.create(req.body);
    res.status(201).json({ id });
  } catch (err) {
    console.error('Error al crear tarea:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getTasksByGoal = async (req, res) => {
  await param('goalId').isInt().withMessage('ID inválido').run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const tasks = await TaskModel.getAllByGoal(req.params.goalId);
    res.json(tasks);
  } catch (err) {
    console.error('Error al obtener tareas:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const updateTask = async (req, res) => {
  await param('id').isInt().run(req);
  await body('title').optional().notEmpty().run(req);
  await body('description').optional().isString().run(req);
  await body('duration_minutes').optional().isInt({ min: 1 }).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const updated = await TaskModel.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json({ message: 'Tarea actualizada' });
  } catch (err) {
    console.error('Error al actualizar tarea:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteTask = async (req, res) => {
  await param('id').isInt().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const deleted = await TaskModel.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json({ message: 'Tarea eliminada' });
  } catch (err) {
    console.error('Error al eliminar tarea:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  createTask,
  getTasksByGoal,
  updateTask,
  deleteTask
};
