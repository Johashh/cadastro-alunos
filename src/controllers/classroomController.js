const { readResourceFile, writeResourceFile } = require("../utils/fileReader");
const pathClassroom = "./src/database/classrooms.json";
const pathTeacher = "./src/database/teachers.json";

const createClassroom = async (req, res) => {
  try {
    const { capacity, teacherRegistration } = req.body;
    const classrooms = await readResourceFile(pathClassroom);
    const teachers = await readResourceFile(pathTeacher);
    const teacher = teachers.find(
      (teacher) => (teacher.registration = teacherRegistration)
    );

    let number = 1;
    if (classrooms.length > 0) {
      number = classrooms[classrooms.length - 1].number + 1;
    }

    classrooms.push({
      number,
      capacity,
      isAvailable: true,
      teacher,
      students: [],
    });
    await writeResourceFile(classrooms, pathClassroom);
    res.status(201).json({ message: "Sala de aula cadastrada com sucesso" });
  } catch (error) {
    res.send(`erro: ${error.message}`);
  }
};

const updateClassroomData = async (req, res) => {
  try {
    const { capacity, number } = req.body;
    const classrooms = await readResourceFile(pathClassroom);
    const classroom = classrooms.find(
      (classroom) => classroom.number == number
    );
    const index = classrooms.indexOf(classroom);

    if (classroom) {
      classroom.capacity = capacity ?? classroom.capacity;
    }

    classrooms.splice(index, 1, classroom);
    await writeResourceFile(classrooms, pathClassroom);

    return res.status(204).send();
  } catch (error) {
    res.send(`erro: ${error.message}`);
  }
};

const deleteClassroom = async (req, res) => {
  try {
    const { number } = req.params;
    const classrooms = await readResourceFile(pathClassroom);
    const classroom = classrooms.find(
      (classroom) => classroom.number == number
    );
    const index = classrooms.indexOf(classroom);

    if (classroom) {
      classrooms.splice(index, 1);
    }

    await writeResourceFile(classrooms, pathClassroom);
    res.status(200).json({ message: "Sala deletada" });
  } catch (error) {
    res.send(`erro: ${error.message}`);
  }
};

const getClassroom = async (req, res) => {
  const { number } = req.params;
  const classrooms = await readResourceFile(pathClassroom);
  const classroom = classrooms.find((classroom) => classroom.number == number);
  const index = classrooms.indexOf(classroom);

  if (classroom) {
    res.status(200).json(classroom);
  }
};

module.exports = {
  createClassroom,
  updateClassroomData,
  deleteClassroom,
  getClassroom,
};
