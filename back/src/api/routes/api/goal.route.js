const express = require('express');
const router = express.Router();

const {
  createGoal,
  getGoalsByInterest,
  deleteGoal
} = require('../../controllers/goal.controller');

router.post('/', createGoal);
router.get('/interest/:interestId', getGoalsByInterest);
router.delete('/:id', deleteGoal);

module.exports = router;
