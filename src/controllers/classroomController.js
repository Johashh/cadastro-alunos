const { readResourceFile, writeResourceFile } = require('../utils/fileReader');
const path = './src/database/classrooms.json';

const creatClassRoom = async (req, res) => {

    try {
        const { capacity } = req.body;
        const classrooms = await readResourceFile(path);

        console.log(typeof(classrooms))
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

}

module.exports = {
    creatClassRoom,
    updateClassroomData
};