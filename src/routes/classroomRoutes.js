const express = require('express');
const router = express.Router();

const { checkClassRoomData, checkClassroomNumber, checkTeacherRegistration } = require('../config/middlewares');
const classroomController = require('../controllers/classroomController');

router.route('/add/:registration').post(checkClassRoomData, checkTeacherRegistration, classroomController.creatClassRoom);
router.route('/updateField/:number').patch(checkClassRoomData, classroomController.updateClassroomData);
router.route('/:number').delete(checkClassroomNumber, classroomController.deleteClassroom).get(checkClassroomNumber, classroomController.getClassroom);

module.exports = router;