const { readResourceFile, writeResourceFile } = require('../utils/fileReader');
const path = './src/database/classrooms.json';

const creatClassRoom = async (req, res) => {

    try {
        const { capacity } = req.body;
        const classrooms = await readResourceFile(path);

        let number = 1;
        if(classrooms.length > 0){
            number = classrooms[classrooms.length - 1].number + 1;
        }

        classrooms.push({number, capacity, isAvailable: true, students:[]});
        await writeResourceFile(classrooms, path);
        res.status(201).json({message: "Sala de aula cadastrada com sucesso"});
        
    } catch (error) {
        res.send(`erro: ${error.message}`);
        }
}

const updateClassroomData = async (req, res) => {

    try {
        const { number } = req.params;
        const { capacity } = req.body;
        const classrooms = await readResourceFile(path);
        const classroom = classrooms.find((classroom) => classroom.number == number);
        const index = classrooms.indexOf(classroom);
    
        if(classroom){
            classroom.capacity = capacity ?? classroom.capacity;
        }

        classrooms.splice(index, 1, classroom);
        await writeResourceFile(classrooms, path);
        
        return res.status(204).send();
        
    } catch (error) {
        res.send(`erro: ${error.message}`);
    }
}

const deleteClassroom = async (req, res) => {

    try {
        const { number } = req.params;
        const classrooms = await readResourceFile(path);
        const classroom = classrooms.find((classroom) => classroom.number == number);
        const index = classrooms.indexOf(classroom);

        if(classroom){
            classrooms.splice(index, 1);
        }

        await writeResourceFile(classrooms, path);
        res.status(200).json({message: "Sala deletada"});
        
    } catch (error) {
        res.send(`erro: ${error.message}`);
    }
}

module.exports = {
    creatClassRoom,
    updateClassroomData,
    deleteClassroom
};