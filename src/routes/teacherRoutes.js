const express = require("express");
const router = express.Router();

const {
  checkData,
  checkTeacher,
  checkTeacherRegistration,
} = require("../config/middlewares");
const teacherController = require("../controllers/teacherController");

router.route("/").post(checkData, checkTeacher, teacherController.addTeacher);
router
  .route("/:registration")
  .delete(checkTeacherRegistration, teacherController.deleteTeacher)
  .get(checkTeacherRegistration, teacherController.getTeacher)
  .patch(
    checkTeacherRegistration,
    checkTeacher,
    teacherController.updateTeacherProfile
  );

module.exports = router;
