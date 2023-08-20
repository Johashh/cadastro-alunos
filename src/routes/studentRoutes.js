const express = require('express');
const router = express.Router();

const {checkData, checkStudentRegistration} = require('../config/middlewares');
const studentController = require('../controllers/studentController');

router.route('/add').post(checkData, studentController.addStudent);
router.route('/updateField/:registration').patch(checkStudentRegistration, studentController.updateStudentProfile); 
router.route('/:registration').delete(checkStudentRegistration, studentController.deleteStudent).get(checkStudentRegistration, studentController.getStudent); 

module.exports = router;