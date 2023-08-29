const express = require("express");
const router = express.Router();

const { checkTeacherAndStudentRegistration } = require("../config/middlewares");
const resourceController = require("../controllers/resourceControler");

router
  .route("/add")
  .post(
    checkTeacherAndStudentRegistration,
    resourceController.addStudentToClassroom
  );
router
  .route("/delete")
  .delete(
    checkTeacherAndStudentRegistration,
    resourceController.deleteStudenFromClassroom
  );
router.route("/get").get(resourceController.getStudentsFromClasroom);
router
  .route("/getClassroomOfStudent")
  .get(resourceController.getClassroomsOfStudent);

module.exports = router;
