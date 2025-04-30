//rutas
const router = require('express').Router();
const interestController = require('../../controllers/interest.controller');

//endpoints
router.get('/',  interestController.getInterestsByUser);
router.post('/', interestController.createInterest);
router.delete('/:interestId', interestController.deleteInterest);

module.exports = router;
