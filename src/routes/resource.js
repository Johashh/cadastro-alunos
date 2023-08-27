const express = require('express');
const router = express.Router();

const { checkTeacherAndStudentRegistration } = require('../config/middlewares');
const resourceController = require('../controllers/resourceControler');

router.route('/add').post(checkTeacherAndStudentRegistration ,resourceController.addStudentToClassroom);

module.exports = router;