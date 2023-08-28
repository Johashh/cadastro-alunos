const express = require('express');
const router = express.Router();

const {checkData, checkStudent, checkStudentRegistration} = require('../config/middlewares');
const studentController = require('../controllers/studentController');

router.route('/add').post(checkData, checkStudent, studentController.addStudent);
router.route('/updateField/:registration').patch(checkStudentRegistration, checkStudent, studentController.updateStudentProfile); 
router.route('/:registration').delete(checkStudentRegistration, studentController.deleteStudent).get(checkStudentRegistration, studentController.getStudent); 

module.exports = router;