const express = require('express');
const router = express.Router();

const { checkClassRoomData } = require('../config/middlewares');
const classroomController = require('../controllers/classroomController');

router.route('/add').post(checkClassRoomData, classroomController.creatClassRoom);
router.route('/updateField/:number').patch(checkClassRoomData, classroomController.updateClassroomData);

module.exports = router;