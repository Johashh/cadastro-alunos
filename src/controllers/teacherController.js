const { writeResourceFile, readResourceFile } = require('../utils/fileReader');
const path = './src/database/teachers.json';


const addTeacher = async (req, res) => {

    try {
        const {name, email, birthday} = req.body;
        const teachers = await readResourceFile(path);
        let registration = 1;

        if(teachers.length > 0){
            registration = teachers[teachers.length - 1].registration + 1;
        }
        teachers.push({registration, name, email, birthday});
        
        await writeResourceFile(teachers, path);
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
        const teachers = await readResourceFile(path);
        
        const teacher = teachers.find((teacher) => teacher.registration == registration);
        const index = teachers.indexOf(teacher);       
        
        teacher.name = name ?? teacher.name;   
        teacher.email = email ?? teacher.email;
        teacher.birthday = birthday ?? teacher.birthday;
        
        console.log(teacher)
        teachers.splice(index, 1, teacher);
        
        await writeResourceFile(teachers, path);
        return res.status(204).send();
    } catch (error) {
        return res.send(`erro: ${error.message}`);
    } 
}

const deleteTeacher = async (req, res) => {
    const {registration} = req.params;
    const teachers = await readResourceFile(path);

    const teacher = teachers.find((teacher) => teacher.registration == registration);
    const index = teachers.indexOf(teacher);
    teachers.splice(index, 1);

    await writeResourceFile(teachers, path);
    res.status(204).send();
}

const getTeacher = async (req, res) => {
    const teachers = await readResourceFile(path);

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