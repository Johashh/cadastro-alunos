const { readResourceFile } = require('../utils/fileReader');

const checkData = (req, res, next) => {
    
    const {name, email, birthday} = req.body;
    
    if(name){
        const regex = /[^a-zA-Z]+/;
        if(regex.test(name)){
            return res.status(400).json({message: "O name não deve conter número ou caracteres especiais"});
        } 
        // formatar a string aqui?
        
    } else {
        return res.status(400).json({message: "É necessário informar o nome."});
    }
    
    if(!email){
        return res.status(400).json({message: "É necessário informar o email."});
    }
    if(!birthday){
        return res.status(400).json({message: "É necessário informar a data de nascimento."});
    }
    
    next(); 
}

const checkStudentRegistration = async (req, res, next) => {
    const students = await readResourceFile('./src/database/students.json');
    console.log(students)
    const {registration} = req.params;
    
    if(!registration){
        return res.status(400).json({message: "É necessário informar a matrícula."});
    } else {
        const regex = /[^0-9]+/;
        const validResgistration = students.some((student) => student.registration == registration);
        
        if(regex.test(registration)){
            return res.status(400).json({message: "A matrícula informada é inválida"});            
        }
        
        if(!validResgistration){
            return res.status(400).json({message: "Não encontramos nenhum aluno com a matrícula informada."});            
        }
    }
    next();
}
const checkTeacherRegistration = async (req, res, next) => {
    const teachers = await readResourceFile('./src/database/teachers.json');
    const {registration} = req.params;
    
    if(!registration){
        return res.status(400).json({message: "É necessário informar a matrícula."});
    } else {
        const regex = /[^0-9]+/;
        const validResgistration = teachers.some((teacher) => teacher.registration == registration);
        
        if(regex.test(registration)){
            return res.status(400).json({message: "A matrícula informada é inválida"});            
        }
        
        if(!validResgistration){
            return res.status(400).json({message: "Não encontramos nenhum professor com a matrícula informada."});            
        }
    }
    next();
}

module.exports = {
    checkData,
    checkStudentRegistration,
    checkTeacherRegistration
}