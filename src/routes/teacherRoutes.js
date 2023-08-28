const express = require('express');
const router = express.Router();

const {checkData, checkTeacher, checkTeacherRegistration} = require('../config/middlewares');
const teacherController = require('../controllers/teacherController');

router.route('/add').post(checkData, checkTeacher, teacherController.addTeacher);
router.route('/updateField/:registration').patch(checkTeacherRegistration, checkTeacher, teacherController.updateTeacherProfile); 
router.route('/:registration').delete(checkTeacherRegistration, teacherController.deleteTeacher).get(checkTeacherRegistration, teacherController.getTeacher);     

module.exports = router;