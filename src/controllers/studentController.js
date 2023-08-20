const fs = require('fs/promises');
const {readStudentFile, writeStudentFile} = require('../utils/fileReader');

const addStudent = async (req, res) => {

    try {
        const path = './src/database/students.json';
        const {name, email, birthday} = req.body;
        const students = await readStudentFile(path);
    
        const registration = students.length + 1;
        students.push({registration, name, email, birthday});

        await writeStudentFile(students, path);
    
        return res.status(201).json({message: "Aluno cadastrado"});
    } catch (error) {
        res.send(`erro: ${error.message}`);
    }
}

const updateStudentProfile = async (req, res) => {
    try {
        const path = './src/database/students.json';
        const { registration } = req.params;
        const {name, email, birthday} = req.body;
        const students = await readStudentFile(path);
        
        const student = students.find((student) => student.registration == registration);
        const index = students.indexOf(student);       
        
        student.name = name ?? student.name;   
        student.email = email ?? student.email;
        student.birthday = birthday ?? student.birthday;
        
        console.log(student)
        students.splice(index, 1, student);
        
        await writeStudentFile(students, path);
        return res.status(204).send();
    } catch (error) {
        return res.send(`erro: ${error.message}`);
    } 
}

const deleteStudent = async (req, res) => {
    const path = './src/database/students.json';
    const {registration} = req.params;
    const students = await readStudentFile(path);

    const student = students.find((student) => student.registration == registration);
    const index = students.indexOf(student);
    students.splice(index, 1);

    await writeStudentFile(students, path);
    res.status(204).send();
}

module.exports = {
    addStudent,
    updateStudentProfile,
    deleteStudent
}