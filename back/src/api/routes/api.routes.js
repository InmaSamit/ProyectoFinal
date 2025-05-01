const router = require('express').Router();
const {checkToken} = require('../middleware/auth');

router.use('/users', require('./api/users.route'));
router.use('/interest', checkToken, require('./api/interests.route'));
router.use('/goal', checkToken, require('./api/goal.route'));
router.use('/task', checkToken, require('./api/task.route'));
router.use('/routine', checkToken, require('./api/routine.route'));
router.use('/routine-task', checkToken, require('./api/routineTask.route'));

module.exports = router;
