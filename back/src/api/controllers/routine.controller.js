const { body, param, validationResult } = require('express-validator');
const RoutineModel = require('../models/routine.models');

const createRoutine = async (req, res) => {
  console.log("createRoutine " + req.user.id);
  await body('name').notEmpty().withMessage('El nombre es obligatorio').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const id = await RoutineModel.create(req.user.id, req.body.name);
    res.status(201).json({ id });
  } catch (error) {
    console.error('Error al crear la rutina:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const getRoutinesByUser = async (req, res) => {
  console.log("getRoutinesByUser " + req.user.id);
  try {
    const routines = await RoutineModel.getAllByUser(req.user.id);
    res.json(routines);
  } catch (error) {
    console.error('Error al obtener las rutinas:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const deleteRoutine = async (req, res) => {
  await param('id').isInt().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const deleted = await RoutineModel.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Rutina no encontrada' });
    res.json({ message: 'Rutina eliminada' });
  } catch (error) {
    console.error('Error al eliminar la rutina:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = {
  createRoutine,
  getRoutinesByUser,
  deleteRoutine
};
