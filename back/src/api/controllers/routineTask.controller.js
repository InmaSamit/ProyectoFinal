const { body, param, validationResult } = require('express-validator');
const RoutineTaskModel = require('../models/routineTask.models');

const createRoutineTask = async (req, res) => {
  await body('routine_id').isInt().run(req);
  await body('task_id').isInt().run(req);
  await body('day_of_week').isIn(['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']).run(req);
  await body('start_time').matches(/^\d{2}:\d{2}(:\d{2})?$/).run(req);
  await body('end_time').matches(/^\d{2}:\d{2}(:\d{2})?$/).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const id = await RoutineTaskModel.create(req.body);
    res.status(201).json({ id });
  } catch (error) {
    console.error('Error al crear routine_task:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getByRoutine = async (req, res) => {
  await param('routineId').isInt().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const tasks = await RoutineTaskModel.getByRoutine(req.params.routineId);
    res.json(tasks);
  } catch (error) {
    console.error('Error al obtener routine_tasks:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const updateRoutineTask = async (req, res) => {
  await param('id').isInt().run(req);
  await body('day_of_week').optional().isIn(['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']).run(req);
  await body('start_time').optional().matches(/^\d{2}:\d{2}(:\d{2})?$/).run(req);
  await body('end_time').optional().matches(/^\d{2}:\d{2}(:\d{2})?$/).run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const updated = await RoutineTaskModel.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Routine task no encontrada' });
    res.json({ message: 'Actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteRoutineTask = async (req, res) => {
  await param('id').isInt().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const deleted = await RoutineTaskModel.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  createRoutineTask,
  getByRoutine,
  updateRoutineTask,
  deleteRoutineTask
};
