const router = require('express').Router();
const controller = require('../controllers/employes');


router.get('/employes', controller.getAllEmployes);
router.get('/employes/:id', controller.getEmployeById);
router.post('/employes', controller.createEmploye);
router.put('/employes/:id', controller.updateEmploye);
router.delete('/employes/:id', controller.deleteEmploye);

router.get('/employes/date/:date', controller.getEmployesByDate);

router.patch('/employes/checkin/:id&:comment', controller.checkIn);
router.patch('/employes/checkout/:id&:comment', controller.checkOut);

module.exports = router;