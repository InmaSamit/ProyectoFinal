const { body, validationResult } = require('express-validator');
const InterestModel = require('../models/interest.models');

// Función para crear un interes
const createInterest = async (req, res) => {

  // Validamos los datos
  console.log("createInterest " + req.user.id);
  await body('title').notEmpty().withMessage('El título es obligatorio').run(req);

  // Comprobamos errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    //Intentamos crear
    const id = await InterestModel.create(req.body, req.user.id);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear interés', error });
  }
};
// Función para obtener todos los intereses del usuario logado
const getInterestsByUser = async (req, res) => {
  console.log("getInterestsByUser " + req.user.id);
  try {

    // Buscamos, segun el usuario logado
    const list = await InterestModel.getAllByUser(req.user.id);
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener intereses', error });
  }
};

//Función para obtener un interes por id
const getById = async (req, res) => {
  console.log("getById " + req.user.id);

  // Validamos los datos
  await body('interestId').notEmpty();

  // Comprobamos errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const interest = await InterestModel.getById(req.params.interestId);
    res.json(interest[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener intereses', error });
  }
};

// Función para eliminar un interes
const deleteInterest = async (req, res) => {
  console.log("deleteInterest ");

  // Validamos los datos
  await body('interestId').notEmpty();

  // Comprobamos errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    console.log("deleteInterest " + req.params.interestId);
    const success = await InterestModel.delete(req.params.interestId);
    if (success) {
      res.json({ message: 'Interés eliminado' });
    } else {
      res.status(404).json({ message: 'Interés no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar interés', error });
  }
};


module.exports = {
  createInterest,
  getById,
  getInterestsByUser,
  deleteInterest
};
