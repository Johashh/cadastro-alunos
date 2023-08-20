const { writeStudentFile, readStudentFile } = require('../utils/fileReader');
const path = './src/database/teachers.json';


const addTeacher = async (req, res) => {

    try {
        const {name, email, birthday} = req.body;
        const teachers = await readStudentFile(path);
        console.log("aaaaaa")
        
        const registration = teachers.length + 1;
        teachers.push({registration, name, email, birthday});
        
        await writeStudentFile(teachers, path);
        console.log(teachers)
        
        return res.status(201).json({message: "Professor cadastrado"});
    } catch (error) {
        res.send(`erro: ${error.message}`);
    }
}

const updateTeacherProfile = async (req, res) => {
    try {
        const { registration } = req.params;
        const {name, email, birthday} = req.body;
        const teachers = await readStudentFile(path);
        
        const teacher = teachers.find((teacher) => teacher.registration == registration);
        const index = teachers.indexOf(teacher);       
        
        teacher.name = name ?? teacher.name;   
        teacher.email = email ?? teacher.email;
        teacher.birthday = birthday ?? teacher.birthday;
        
        console.log(teacher)
        teachers.splice(index, 1, teacher);
        
        await writeStudentFile(teachers, path);
        return res.status(204).send();
    } catch (error) {
        return res.send(`erro: ${error.message}`);
    } 
}

const deleteTeacher = async (req, res) => {
    const {registration} = req.params;
    const teachers = await readStudentFile(path);

    const teacher = teachers.find((teacher) => teacher.registration == registration);
    const index = teachers.indexOf(teacher);
    teachers.splice(index, 1);

    await writeStudentFile(teachers, path);
    res.status(204).send();
}

const getTeacher = async (req, res) => {
    const teachers = await readStudentFile(path);

    try {
        const { registration } = req.params;
        const teacher = teachers.find((teacher) => teacher.registration == registration);
        return res.status(200).json(teacher);        
    } catch (error) {
        
    }
}

module.exports = {
    addTeacher,
    updateTeacherProfile,
    deleteTeacher,
    getTeacher
}