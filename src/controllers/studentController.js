const fs = require('fs/promises');
const {readStudentFile, writeStudentFile} = require('../utils/fileReader');

const addStudent = async (req, res) => {

    try {
        const path = './src/database/students.json';
        const {nome, email, dataNascimento} = req.body;
        const studentsString = await readStudentFile(path);
    
        const matricula = studentsString.length + 1;
        studentsString.push({matricula, nome, email, dataNascimento});

        await writeStudentFile(studentsString, path);
    
        return res.status(201).json({message: "Aluno cadastrado"});
    } catch (error) {
        res.send(`erro: ${error.message}`);
    }
}

const updateStudentProfileRegisterField = async (req, res) => {
    try {
        const path = './src/database/students.json';
        const {matricula} = req.params;
        const {nome, email, dataNascimento} = req.body;
        const studentsString = await readStudentFile(path);
        
        const student = studentsString.find((student) => student.matricula == matricula);
        const index = studentsString.indexOf(student);       

        student.nome = nome ?? student.nome;   
        student.email = email ?? student.email;
        student.dataNascimento = dataNascimento ?? student.dataNascimento;
        
        console.log(student)
        studentsString.splice(index, 1, student);
        
        await writeStudentFile(studentsString, path);
        return res.status(204).send();
    } catch (error) {
        return res.send(`erro: ${error.message}`);
    } 
}

module.exports = {
    addStudent,
    updateStudentProfileRegisterField
}