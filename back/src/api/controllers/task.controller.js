const { body, param, validationResult } = require('express-validator');
const TaskModel = require('../models/task.models');

// Función para crear una tarea
const createTask = async (req, res) => {
  console.log("createTask");
  // Validación de los datos 
  await body('goal_id').isInt().withMessage('El objetivo es obligatorio').run(req);
  await body('title').notEmpty().withMessage('El título es obligatorio').run(req);
  await body('description').optional().isString().run(req);
  await body('duration_minutes').optional().isInt({ min: 1 }).run(req);

  // Comprobamos si hay errores em la validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    // Intentamos insertar la tarea
    const id = await TaskModel.create(req.body);
    res.status(201).json({ id });
  } catch (err) {
    console.error('Error al crear tarea:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para obtener todas las tareas de un objetivo
const getTasksByGoal = async (req, res) => {
  console.log("getTasksByGoal");
  // Validación de los datos 
  await param('goalId').isInt().withMessage('ID inválido').run(req);

  // Comprobamos si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    // Buscamos tareas
    const tasks = await TaskModel.getAllByGoal(req.params.goalId);
    res.json(tasks);
  } catch (err) {
    console.error('Error al obtener tareas:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
// Función para eliminar una tarea
const deleteTask = async (req, res) => {
  console.log("deleteTask");
  // Validación de datos
  await param('id').isInt().run(req);

  // Comprobaión de errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    // Intentamos borrar
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
  deleteTask
};
