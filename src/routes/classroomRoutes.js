const express = require('express');
const router = express.Router();

const classroomController = require('../controllers/classroomController');

router.route.apply('/add').post(classroomController.creatClassRoom);

module.exports = router;