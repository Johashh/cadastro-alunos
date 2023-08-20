const express = require('express');
const router = express.Router();

const {checkStudentData, checkRegistration} = require('./middlewares');
const studentController = require('../controllers/studentController');

router.route('/add').post(checkStudentData, studentController.addStudent);
// checar o nome dessa rota posteriormente
router.route('/updateField/:registration').patch(studentController.updateStudentProfile); 
router.route('/:registration').delete(checkRegistration, studentController.deleteStudent); 

module.exports = router;