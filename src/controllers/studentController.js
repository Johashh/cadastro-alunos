const fs = require('fs/promises');
const {readResourceFile, writeResourceFile} = require('../utils/fileReader');
const path = './src/database/students.json'

const addStudent = async (req, res) => {

    try {
        const {name, email, birthday} = req.body;
        const students = await readResourceFile(path);
        
        let registration = 1;
        if(students.length > 0){
            registration = students[students.length - 1].registration + 1;
        }
        
        students.push({registration, name, email, birthday});

        await writeResourceFile(students, path);
    
        return res.status(201).json({message: "Aluno cadastrado"});
    } catch (error) {
        res.send(`erro: ${error.message}`);
    }
}

const updateStudentProfile = async (req, res) => {
    try {
        const { registration } = req.params;
        const {name, email, birthday} = req.body;
        const students = await readResourceFile(path);
        console.log(students)
        
        const student = students.find((student) => student.registration == registration);
        const index = students.indexOf(student);       
        
        student.name = name ?? student.name;   
        student.email = email ?? student.email;
        student.birthday = birthday ?? student.birthday;
        
        console.log(student)
        students.splice(index, 1, student);
        
        await writeResourceFile(students, path);
        return res.status(204).send();
    } catch (error) {
        return res.send(`erro: ${error.message}`);
    } 
}

const deleteStudent = async (req, res) => {
    const {registration} = req.params;
    const students = await readResourceFile(path);

    const student = students.find((student) => student.registration == registration);
    const index = students.indexOf(student);
    students.splice(index, 1);

    await writeResourceFile(students, path);
    res.status(204).send();
}

const getStudent = async (req, res) => {
    const students = await readResourceFile(path);

    try {
        const { registration } = req.params;
        const student = students.find((student) => student.registration == registration);
        return res.status(200).json(student);        
    } catch (error) {
        
    }
}

module.exports = {
    addStudent,
    updateStudentProfile,
    deleteStudent,
    getStudent
}