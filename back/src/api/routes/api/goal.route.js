const express = require('express');
const router = express.Router();
const goalController  = require('../../controllers/goal.controller');

//eendpoints
router.post('/', goalController.createGoal);
router.get('/interest/:interestId', goalController.getGoalsByInterest);
router.delete('/:id',goalController. deleteGoal);

module.exports = router;
