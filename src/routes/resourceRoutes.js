const express = require("express");
const router = express.Router();

const { checkTeacherAndStudentRegistration } = require("../config/middlewares");
const resourceController = require("../controllers/resourceControler");

router
  .route("/")
  .post(
    checkTeacherAndStudentRegistration,
    resourceController.addStudentToClassroom
  )
  .get(resourceController.getStudentsFromClasroom)
  .delete(
    checkTeacherAndStudentRegistration,
    resourceController.deleteStudenFromClassroom
  );

router
  .route("/:studentRegistration")
  .get(resourceController.getClassroomsOfStudent);

module.exports = router;
