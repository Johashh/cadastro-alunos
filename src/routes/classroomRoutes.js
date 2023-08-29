const express = require("express");
const router = express.Router();

const {
  checkClassRoomData,
  checkClassroomNumber,
  checkTeacherRegistration,
} = require("../config/middlewares");
const classroomController = require("../controllers/classroomController");

router
  .route("/")
  .post(
    checkClassRoomData,
    checkTeacherRegistration,
    classroomController.createClassroom
  )
  .patch(checkClassRoomData, classroomController.updateClassroomData);
router
  .route("/:number")
  .delete(checkClassroomNumber, classroomController.deleteClassroom)
  .get(checkClassroomNumber, classroomController.getClassroom);

module.exports = router;
