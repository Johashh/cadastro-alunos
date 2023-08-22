const express = require('express');
const router = express.Router();

const { checkClassRoomData } = require('../config/middlewares');
const classroomController = require('../controllers/classroomController');

router.route('/add').post(checkClassRoomData, classroomController.creatClassRoom);

module.exports = router;