const { readResourceFile, writeResourceFile } = require('../utils/fileReader');
const studentPath = './src/database/students.json';
const teacherPath = './src/database/teachers.json';
const classroomsPath = './src/database/classrooms.json';

const addStudentToClassroom = async (req, res) => {

    try {
        const { teacherRegistration, studentRegistration } = req.body;
        const teachers = await readResourceFile(teacherPath);
        const students = await readResourceFile(studentPath);
        const classrooms = await readResourceFile(classroomsPath);

        const validTeacherResgistration = teachers.some((teacher) => teacher.registration == teacherRegistration);
        const validStudentResgistration = students.some((student) => student.registration == studentRegistration);
        const student = students.find((student) => student.registration === Number(studentRegistration));
        const classroom = classrooms.find((classroom) =>  classroom.teacher.registration === teacherRegistration);

        let isThereStudent;
        if(classroom){
            isThereStudent = classroom.students.some((student) => student.registration === Number(studentRegistration));
        }      
        
        if(!validTeacherResgistration){
            return res.status(400).json({message: "Não encontramos nenhuma sala registrada com matrícula do professor informado."});            
        }
        if(!validStudentResgistration){
            return res.status(400).json({message: "Não encontramos nenhum aluno com a matrícula informada."});            
        }

        if(classrooms.some((classroom) => classroom.teacher.registration == teacherRegistration)){
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

}

module.exports = { 
    addStudentToClassroom,
    deleteStudenFromClassroom
}