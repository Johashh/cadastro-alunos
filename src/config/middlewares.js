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

const checkClassroomNumber = async (req, res, next) => {
    const classrooms = await readResourceFile('./src/database/classrooms.json');
    const { number } = req.params;
    
    if(!number){
        return res.status(400).json({message: "É necessário informar a matrícula."});
    } else {
        const regex = /[^0-9]+/;
        const validResgistration = classrooms.some((classroom) => classroom.number == number);
        
        if(regex.test(number)){
            return res.status(400).json({message: "O número informado é inválido"});            
        }
        
        if(!validResgistration){
            return res.status(400).json({message: "Não encontramos nenhuma sala com número informado."});            
        }
    }
    next();
}

const checkClassRoomData = (req, res, next) =>{
    const { capacity } = req.body;
    const regex = /[^0-9]+/;

    if(regex.test(capacity)){
            return res.status(400).json({message: "A capacidade informada é inválida"});            
        } else if(Number(capacity) > 30){
        return res.status(400).json({message: "A capacidade máxima de uma sala é 30"});            
    }
    next();
}

const checkTeacherAndStudentRegistration = async (req, res, next) => {
        const { teacherRegistration, studentRegistration } = req.body;
        const teachers = await readResourceFile('./src/database/teachers.json');
        const students = await readResourceFile('./src/database/students.json');
        const regex = /[^0-9]+/;

        const validTeacherResgistration = teachers.some((teacher) => teacher.registration == teacherRegistration);
        const validStudentResgistration = students.some((student) => student.registration == studentRegistration);

        if(!teacherRegistration){
            return res.status(400).json({message: "A matrícula do professor deve ser informada"});  
        }
        if(!studentRegistration){
            return res.status(400).json({message: "A matrícula do aluno deve ser informada"});  
        }

        if(regex.test(teacherRegistration)){
            return res.status(400).json({message: "A matrícula do professor informada é inválida"});            
        }
        if(regex.test(studentRegistration)){
            return res.status(400).json({message: "A matrícula do aluno informada é inválida"});            
        }

        if(!validTeacherResgistration){
            return res.status(400).json({message: "Não encontramos nenhuma sala registrada com matrícula do professor informado."});            
        }
        if(!validStudentResgistration){
            return res.status(400).json({message: "Não encontramos nenhum aluno com a matrícula informada."});            
        }

        next();
}

module.exports = {
    checkData,
    checkClassRoomData,
    checkStudentRegistration,
    checkTeacherRegistration,
    checkClassroomNumber,
    checkTeacherAndStudentRegistration
}