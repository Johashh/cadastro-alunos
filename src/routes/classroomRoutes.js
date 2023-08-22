const express = require('express');
const router = express.Router();

const { checkClassRoomData, checkClassroomNumber } = require('../config/middlewares');
const classroomController = require('../controllers/classroomController');

router.route('/add').post(checkClassRoomData, classroomController.creatClassRoom);
router.route('/updateField/:number').patch(checkClassRoomData, classroomController.updateClassroomData);
router.route('/:number').delete(checkClassroomNumber, classroomController.deleteClassroom);

module.exports = router;