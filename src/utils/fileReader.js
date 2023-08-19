const fs = require('fs/promises');

async function readStudentFile(path){
    
    const studentsBsuffer = await fs.readFile(path);
    const studentsString = JSON.parse(studentsBsuffer);

    return studentsString;
}

async function writeStudentFile(arrayJson, path){
    const studentStringfy = JSON.stringify(arrayJson);
    await fs.writeFile(path, studentStringfy);
}

module.exports = {
    readStudentFile,
    writeStudentFile
}