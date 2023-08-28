const { readResourceFile, writeResourceFile } = require("../utils/fileReader");
const studentPath = "./src/database/students.json";
const teacherPath = "./src/database/teachers.json";
const classroomsPath = "./src/database/classrooms.json";

const addStudentToClassroom = async (req, res) => {
  try {
    const { teacherRegistration, studentRegistration, classroomNumber } =
      req.body;
    const students = await readResourceFile(studentPath);
    const classrooms = await readResourceFile(classroomsPath);

    const student = students.find(
      (student) => student.registration === studentRegistration
    );
    const classroom = classrooms.find(
      (classroom) => classroom.number === classroomNumber
    );
    const validTeacher =
      Number(classroom.teacher.registration) === teacherRegistration;
    console.log(
      typeof teacherRegistration,
      typeof classroom.teacher.registration
    );
    let isThereStudent;

    if (classroom) {
      if (!validTeacher) {
        return res.status(400).json({
          message: "Apenas o professor da turma pode adicionar alunos a ela.",
        });
      }
      isThereStudent = classroom.students.some(
        (student) => student.registration === studentRegistration
      );

      if (isThereStudent) {
        return res.status(400).json({
          message: "Já existe um estudante cadastrado com essa matrícula.",
        });
      } else {
        classroom.students.push(student);
        await writeResourceFile(classrooms, classroomsPath);
        return res.status(201).json({ message: "Aluno adicionado." });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Não há salas no registro com o número informado." });
    }
  } catch (error) {
    return res.send(`erro: ${error.message}`);
  }
};

const deleteStudenFromClassroom = async (req, res) => {
  try {
    const { studentRegistration, classroomNumber } = req.body;
    const classrooms = await readResourceFile(classroomsPath);

    const classroom = classrooms.find(
      (classroom) => classroom.number === classroomNumber
    );

    const student = classroom.students.find((student) => {
      console.log(student.registration, studentRegistration);
      return student.registration === studentRegistration;
    });

    if (classroom) {
      if (!student) {
        return res.status(400).json({
          message: `Não existe alunos, na sala de numero ${classroomNumber}, com a matrícula informada.`,
        });
      }
      const index = classroom.students.indexOf(student);
      classroom.students.splice(index, 1);

      await writeResourceFile(classrooms, classroomsPath);
      return res.status(200).json({ message: "Aluno removido." });
    } else {
      return res
        .status(400)
        .json({ message: "Não há salas no registro com o número informado." });
    }
  } catch (error) {
    return res.send(`erro: ${error.message}`);
  }
};

const getStudentsFromClasroom = async (req, res) => {
  try {
    const { classroomNumber } = req.body;
    const classrooms = await readResourceFile(classroomsPath);
    const classroom = classrooms.find(
      (classroom) => classroom.number === classroomNumber
    );

    if (!classroomNumber) {
      return res
        .status(400)
        .json({ message: "O número da sala deve ser informado." });
    }

    if (classroom) {
      const students = classroom.students;
      return res.status(200).json(students);
    } else {
      return res
        .status(400)
        .json({ message: "Não há salas no resgistro com o número informado." });
    }
  } catch (error) {
    return res.send(`erro: ${error.message}`);
  }
};

const getClassroomsForstudent = async (res, send) => {};

module.exports = {
  addStudentToClassroom,
  deleteStudenFromClassroom,
  getStudentsFromClasroom,
  getClassroomsForstudent,
};
