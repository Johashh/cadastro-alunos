const express = require("express");
const router = express.Router();

const {
  checkData,
  checkStudent,
  checkStudentRegistration,
} = require("../config/middlewares");
const studentController = require("../controllers/studentController");

router.route("/").post(checkData, checkStudent, studentController.addStudent);
router
  .route("/:registration")
  .delete(checkStudentRegistration, studentController.deleteStudent)
  .get(checkStudentRegistration, studentController.getStudent)
  .patch(
    checkStudentRegistration,
    checkStudent,
    studentController.updateStudentProfile
  );

module.exports = router;
