const express = require('express');
const router = express.Router();

const {checkStudentData, checkRegistration} = require('./middlewares');
const studentController = require('../controllers/studentController');

router.route('/add').post(checkStudentData, studentController.addStudent);
router.route('/updateField/:registration').patch(studentController.updateStudentProfile); 
router.route('/:registration').delete(checkRegistration, studentController.deleteStudent).get(checkRegistration, studentController.getStudent); 

module.exports = router;