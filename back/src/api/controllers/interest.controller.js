const { body, validationResult } = require('express-validator');
const InterestModel = require('../models/interest.models');

exports.createInterest = async (req, res) => {
  console.log("createInterest " + req.user.id);
  await body('title').notEmpty().withMessage('El título es obligatorio').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const id = await InterestModel.create(req.body, req.user.id);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear interés', error });
  }
};

exports.getInterestsByUser = async (req, res) => {
  console.log("getInterestsByUser " + req.user.id);
  try {
    const list = await InterestModel.getAllByUser(req.user.id);
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener intereses', error });
  }
};

exports.getAllById = async (req, res) => {
  console.log("getAllById " + req.params.interestId);
  try {
    const interest = await InterestModel.getAllById(req.params.interestId);
    res.json(interest[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener intereses', error });
  }
};


exports.deleteInterest = async (req, res) => {
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
