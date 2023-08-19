const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');

router.route('/add').post(studentController.addStudent);
// checar o nome dessa rota posteriormente
router.route('/updateField/:matricula').patch(studentController.updateStudentProfileRegisterField); 

module.exports = router;