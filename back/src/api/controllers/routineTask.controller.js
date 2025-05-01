const { body, param, validationResult } = require('express-validator');
const RoutineTaskModel = require('../models/routineTask.models');

//Función para añadir una tarea a una rutina
const createRoutineTask = async (req, res) => {
  console.log("createRoutineTask");

  // Validación de datos
  await body('routine_id').isInt().run(req);
  await body('task_id').isInt().run(req);
  await body('day_of_week').isIn([1,2,3,4,5,6,7]).run(req);
  await body('start_time').matches(/^\d{2}:\d{2}(:\d{2})?$/).run(req);
  await body('end_time').matches(/^\d{2}:\d{2}(:\d{2})?$/).run(req);

  // Comprobamos errores...
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    //Intentamos insertar
    const id = await RoutineTaskModel.create(req.body);
    res.status(201).json({ id });
  } catch (error) {
    console.error('Error al crear routine_task:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para obtener todas las tareas asignadas a una rutina
const getByRoutine = async (req, res) => {
  console.log("getByRoutine " + req.user.id);
  // Validamos datos
  await param('routineId').isInt().run(req);

  // Comprobamos errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    // Buscamos
    const tasks = await RoutineTaskModel.getByRoutine(req.params.routineId);
    console.log("getByRoutine result " + tasks.length);
    res.json(tasks);
  } catch (error) {
    console.error('Error al obtener routine_tasks:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para eliminar una tarea de una rutina
const deleteRoutineTask = async (req, res) => {

  // Validamos datos
  await param('id').isInt().run(req);

  // Comprobamos errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    // Borramos
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
  deleteRoutineTask
};
