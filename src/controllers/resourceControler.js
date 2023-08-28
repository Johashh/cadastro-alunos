const { readResourceFile, writeResourceFile } = require('../utils/fileReader');
const studentPath = './src/database/students.json';
const teacherPath = './src/database/teachers.json';
const classroomsPath = './src/database/classrooms.json';

const addStudentToClassroom = async (req, res) => {

    try {
        const { teacherRegistration, studentRegistration } = req.body;
        const students = await readResourceFile(studentPath);
        const classrooms = await readResourceFile(classroomsPath);
 
        const student = students.find((student) => student.registration === Number(studentRegistration));
        const classroom = classrooms.find((classroom) => Number(classroom.teacher.registration) === teacherRegistration);
        let isThereStudent;

        if(classroom){
            isThereStudent = classroom.students.some((student) => student.registration === Number(studentRegistration));

            if(isThereStudent){
                res.status(400).json({message: "Já existe um estudante cadastrado com essa matrícula."});
            } else {
                classroom.students.push(student);
                await writeResourceFile(classrooms, classroomsPath);
                return res.status(201).json({message: "Aluno adicionado."});
            }
        }      
      
    } catch (error) {
        return res.send(`erro: ${error.message}`);
    }

}

const deleteStudenFromClassroom = async (req, res) => {

    try {
        const { teacherRegistration, studentRegistration } = req.body;
        const students = await readResourceFile(studentPath);
        const classrooms = await readResourceFile(classroomsPath);
 
        const student = students.find((student) => student.registration === Number(studentRegistration));
        const classroom = classrooms.find((classroom) => Number(classroom.teacher.registration) === teacherRegistration);

        if(classroom){
            const index = students.indexOf(student);
            classroom.students.splice(index, 1);

            await writeResourceFile(classrooms, classroomsPath);
            return res.status(200).json({message: "Aluno removido."});
        }
    } catch (error) {
        return res.send(`erro: ${error.message}`);
    }

}

const getStudentsFromClasroom = async (req, res) => {

    try {
        const { teacherRegistration } = req.body;
        const classrooms = await readResourceFile(classroomsPath);
        const classroom = classrooms.find((classroom) => Number(classroom.teacher.registration) === teacherRegistration);

        if(classroom){
            const students = classroom.students;
            return res.status(200).json(students);
        }

    } catch (error) {
        return res.send(`erro: ${error.message}`);
    }
}

const getClassroomsForstudent = async (res, send) => {

}

module.exports = { 
    addStudentToClassroom,
    deleteStudenFromClassroom,
    getStudentsFromClasroom,
    getClassroomsForstudent
}